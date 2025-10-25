import 'reflect-metadata';
import http from 'node:http';
import app from './http';
import { env } from '@config/general';
import databaseAdapter from '../adapters/database';

const server = http.createServer(app);

async function init(): Promise<void> {
  await databaseAdapter.connect();
  server.listen(env.PORT, async () => {
    console.log(`Back-end iniciado na porta ${env.PORT}`);
  });
}

init();
