import crypto from 'node:crypto';
import {Router} from 'express';
import {CATEGORIES,validateContentBundle} from './contentSchema.js';

const digest=x=>crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex');
const authMatches=(presented,expected)=>{
  if(!expected||expected.length<32||typeof presented!=='string')return false;
  const match=presented.match(/^Bearer (\S+)$/);
  if(!match)return false;
  const a=crypto.createHash('sha256').update(match[1]).digest();
  const b=crypto.createHash('sha256').update(expected).digest();
  return crypto.timingSafeEqual(a,b);
};
export async function migrateContent(pool){
  await pool.query(`
    CREATE TABLE IF NOT EXISTS content_revisions (
      id BIGSERIAL PRIMARY KEY,
      category TEXT NOT NULL,
      payload JSONB NOT NULL,
      sha256 TEXT NOT NULL,
      published_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS idx_content_revisions_category ON content_revisions(category,id DESC);
    CREATE TABLE IF NOT EXISTS content_live (
      category TEXT PRIMARY KEY,
      revision_id BIGINT NOT NULL REFERENCES content_revisions(id),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
}
export function contentRouter({pool,adminToken=process.env.ZUP_CONTENT_ADMIN_TOKEN}={}){
  const router=Router();
  router.use((req,res,next)=>pool?next():res.status(503).json({error:'content_storage_not_configured'}));
  router.get('/manifest',async(req,res,next)=>{
    try{
      const {rows}=await pool.query(`SELECT l.category,r.id AS revision,r.sha256,r.payload,l.updated_at
        FROM content_live l JOIN content_revisions r ON r.id=l.revision_id ORDER BY l.category ASC`);
      res.set('Cache-Control','public, max-age=60, stale-while-revalidate=120');
      res.json({schemaVersion:1,categories:rows.map(r=>({category:r.category,revision:Number(r.revision),sha256:r.sha256,questionCount:r.payload.questions.length,lessonCount:r.payload.lessons.length,updatedAt:r.updated_at}))});
    }catch(e){next(e)}
  });
  router.get('/bundles/:category',async(req,res,next)=>{
    if(!CATEGORIES.has(req.params.category))return res.status(404).json({error:'unknown_category'});
    const requested=String(req.query.revision??'');
    if(requested&&!/^[1-9]\d{0,14}$/.test(requested))return res.status(400).json({error:'invalid_revision'});
    try{
      const {rows}=requested
        ?await pool.query(`SELECT id,sha256,payload FROM content_revisions WHERE category=$1 AND id=$2`,[req.params.category,requested])
        :await pool.query(`SELECT r.id,r.sha256,r.payload FROM content_live l JOIN content_revisions r ON r.id=l.revision_id WHERE l.category=$1`,[req.params.category]);
      if(!rows.length)return res.status(404).json({error:'content_not_found'});
      const record=rows[0],etag=`"${record.sha256}"`;
      res.set('ETag',etag);
      res.set('Cache-Control',requested?'public, max-age=31536000, immutable':'public, max-age=60');
      if(req.headers['if-none-match']===etag)return res.status(304).end();
      res.json({revision:Number(record.id),...record.payload});
    }catch(e){next(e)}
  });
  function admin(req,res,next){
    if(!adminToken||adminToken.length<32)return res.status(503).json({error:'publisher_not_configured'});
    if(!authMatches(req.headers.authorization,adminToken))return res.status(401).json({error:'unauthorized'});
    next();
  }
  router.post('/admin/publish',admin,async(req,res,next)=>{
    const expected=req.headers['x-zup-expected-revision'];
    if(!/^(0|[1-9]\d{0,14})$/.test(String(expected??'')))return res.status(428).json({error:'expected_revision_required'});
    const payload=req.body;
    const audit=validateContentBundle(payload);
    if(!audit.valid)return res.status(422).json({error:'invalid_content_seed',details:audit.errors.slice(0,30)});
    const client=await pool.connect();
    try{
      await client.query('BEGIN');
      // Serialize writers for the same category; old versions remain available for rollback.
      await client.query('SELECT pg_advisory_xact_lock(hashtext($1))',[`zup-content-${payload.category}`]);
      const sha256=digest(payload);
      const {rows:before}=await client.query(`SELECT r.id,r.sha256 FROM content_live l JOIN content_revisions r ON r.id=l.revision_id WHERE l.category=$1`,[payload.category]);
      if(Number(before[0]?.id??0)!==Number(expected)){await client.query('ROLLBACK');return res.status(409).json({error:'revision_changed_retry_from_current'});}
      if(before[0]?.sha256===sha256){await client.query('COMMIT');return res.json({category:payload.category,revision:Number(before[0].id),unchanged:true});}
      const {rows}=await client.query('INSERT INTO content_revisions(category,payload,sha256) VALUES($1,$2::jsonb,$3) RETURNING id',[payload.category,JSON.stringify(payload),sha256]);
      const revision=Number(rows[0].id);
      await client.query(`INSERT INTO content_live(category,revision_id) VALUES($1,$2)
        ON CONFLICT(category) DO UPDATE SET revision_id=excluded.revision_id,updated_at=now()`,[payload.category,revision]);
      // Keep the last few immutable snapshots per category on the free tier.
      // Always protect the active revision; rollback remains possible within
      // the retained window. Revisions older than the window are deleted.
      const configuredLimit=Number(process.env.ZUP_CONTENT_REVISION_LIMIT);
      const keep=Number.isSafeInteger(configuredLimit)&&configuredLimit>=2?Math.min(configuredLimit,50):3;
      await client.query(`DELETE FROM content_revisions WHERE category=$1 AND id NOT IN
        (SELECT id FROM content_revisions WHERE category=$1 ORDER BY id DESC LIMIT $2)
        AND id NOT IN (SELECT revision_id FROM content_live WHERE category=$1)`,[payload.category,keep]);
      await client.query('COMMIT');
      res.status(201).json({category:payload.category,revision,unchanged:false,questionCount:payload.questions.length,lessonCount:payload.lessons.length});
    }catch(e){await client.query('ROLLBACK').catch(()=>{});next(e)}finally{client.release()}
  });
  router.get('/admin/revisions/:category',admin,async(req,res,next)=>{
    if(!CATEGORIES.has(req.params.category))return res.status(404).json({error:'unknown_category'});
    try{
      const {rows}=await pool.query(`SELECT r.id,r.sha256,r.published_at,(l.revision_id=r.id) AS active
        FROM content_revisions r LEFT JOIN content_live l ON l.category=r.category WHERE r.category=$1 ORDER BY r.id DESC LIMIT 30`,[req.params.category]);
      res.json({category:req.params.category,revisions:rows.map(r=>({...r,id:Number(r.id)}))});
    }catch(e){next(e)}
  });
  router.post('/admin/rollback',admin,async(req,res,next)=>{
    const category=req.body?.category,revision=String(req.body?.revision??'');
    if(!CATEGORIES.has(category)||!/^[1-9]\d{0,14}$/.test(revision))return res.status(400).json({error:'invalid_rollback_request'});
    const client=await pool.connect();
    try{
      await client.query('BEGIN');
      await client.query('SELECT pg_advisory_xact_lock(hashtext($1))',[`zup-content-${category}`]);
      const {rows}=await client.query('SELECT id FROM content_revisions WHERE category=$1 AND id=$2',[category,revision]);
      if(!rows.length){await client.query('ROLLBACK');return res.status(404).json({error:'revision_not_found'});}
      await client.query('UPDATE content_live SET revision_id=$1,updated_at=now() WHERE category=$2',[revision,category]);
      await client.query('COMMIT');res.json({category,revision:Number(revision),rolledBack:true});
    }catch(e){await client.query('ROLLBACK').catch(()=>{});next(e)}finally{client.release()}
  });
  return router;
}
