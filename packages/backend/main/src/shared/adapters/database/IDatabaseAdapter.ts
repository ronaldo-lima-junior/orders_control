import { QueryRunner } from 'typeorm';

interface IDatabaseAdapter {
  commitTransaction(): Promise<void>;
  connect(): Promise<void>;
  getQueryRunner(): QueryRunner;
  rollbackTransaction(): Promise<void>;
  startTransaction(): Promise<void>;
}

export default IDatabaseAdapter;
