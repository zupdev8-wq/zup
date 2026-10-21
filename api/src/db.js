import pg from 'pg';
import {postgresConfig} from './dbConfig.js';
export {postgresConfig} from './dbConfig.js';
export function makePool(environment=process.env){
  const config=postgresConfig(environment);
  return config?new pg.Pool(config):null;
}
