import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUsersTable1761163274265 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'document',
        type: 'varchar',
        isNullable: false,
        length: '14',
      }),
      new TableColumn({
        name: 'asaas_id',
        type: 'varchar',
        isNullable: true,
        length: '50',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', [
      new TableColumn({
        name: 'document',
        type: 'varchar',
        isNullable: false,
        length: '14',
      }),
      new TableColumn({
        name: 'asaas_id',
        type: 'varchar',
        isNullable: true,
        length: '50',
      }),
    ]);
  }
}
