import { env } from './general';

interface IDatabase {
  database: string;
  host: string;
  password: string;
  port: number;
  username: string;
}

const databaseConfig: IDatabase = {
  database: env.DATABASE_NAME,
  host: env.DATABASE_HOST,
  password: env.DATABASE_PASSWORD,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
};

export default databaseConfig;
