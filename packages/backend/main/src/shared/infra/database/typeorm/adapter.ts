import { QueryRunner } from 'typeorm';
import { DataSource } from 'typeorm/browser';

class DatabaseAdapter {
  private queryRunner: QueryRunner;

  private readonly dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
    this.queryRunner = dataSource.createQueryRunner();
  }

  private createQueryRunner(): void {
    this.queryRunner = this.dataSource.createQueryRunner();
  }

  public async commitTransaction(): Promise<void> {
    if (!this.queryRunner.isTransactionActive) {
      return;
    }

    await this.queryRunner.commitTransaction();
    await this.queryRunner.release();
    this.createQueryRunner();
  }

  public async connect(): Promise<void> {
    await this.dataSource.initialize();
    console.log(`Conectado ao banco de dados - ${new Date().toString()}`);
  }

  public getQueryRunner(): QueryRunner {
    return this.queryRunner;
  }

  public async rollbackTransaction(): Promise<void> {
    if (!this.queryRunner.isTransactionActive) {
      return;
    }

    await this.queryRunner.rollbackTransaction();
    await this.queryRunner.release();
    this.createQueryRunner();
  }

  public async startTransaction(): Promise<void> {
    if (this.queryRunner.isTransactionActive) {
      return;
    }

    if (this.queryRunner.isReleased) {
      await this.queryRunner.connect();
    }

    await this.queryRunner.startTransaction();
  }
}

export default DatabaseAdapter;
