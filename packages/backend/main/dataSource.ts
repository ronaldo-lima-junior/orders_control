import { DataSource } from 'typeorm';
import { env } from './src/config/general';

const dataSource = new DataSource({
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  entities: [],
  migrations: ['./src/shared/infra/database/typeorm/migrations/*.ts'],
  migrationsTableName: 'migrations',
});

export default dataSource;
