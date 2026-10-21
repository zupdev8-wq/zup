/** Pure PostgreSQL connection config; no secrets are ever logged. */
export function postgresConfig(environment=process.env){
  const raw=environment.DATABASE_URL;
  if(!raw)return null;
  let uri;
  try{uri=new URL(raw);}catch{throw new Error('DATABASE_URL precisa ser uma URL PostgreSQL valida.');}
  if(!['postgres:','postgresql:'].includes(uri.protocol)||!uri.hostname||!uri.username||!uri.password||!uri.pathname.slice(1)){
    throw new Error('DATABASE_URL invalida: protocolo, host, usuario, senha e database sao obrigatorios.');
  }
  if(uri.searchParams.has('sslmode')&&!['require','verify-full','verify-ca'].includes(uri.searchParams.get('sslmode')||'')){
    throw new Error('A conexao nao pode desabilitar a verificacao TLS. Use sslmode=require.');
  }
  const provider=environment.DB_PROVIDER||'postgres';
  if(provider==='neon'&&!/\.neon\.tech$/i.test(uri.hostname)){
    throw new Error('DB_PROVIDER=neon exige uma URL oficial *.neon.tech.');
  }
  const isLocal=['localhost','127.0.0.1','::1','[::1]'].includes(uri.hostname);
  const localNoTls=isLocal&&environment.ALLOW_LOCAL_DB_NO_TLS==='true'&&provider==='local';
  return {
    host:uri.hostname,port:Number(uri.port||5432),database:decodeURIComponent(uri.pathname.slice(1)),
    user:decodeURIComponent(uri.username),password:decodeURIComponent(uri.password),
    ssl:localNoTls?false:{rejectUnauthorized:true},
    max:Math.max(1,Math.min(5,Number(environment.DB_POOL_MAX||3))),
    min:0,idleTimeoutMillis:10_000,connectionTimeoutMillis:15_000,
    keepAlive:true,statement_timeout:30_000,
    enableChannelBinding:uri.searchParams.get('channel_binding')==='require',
    application_name:'zup-render-api'
  };
}
