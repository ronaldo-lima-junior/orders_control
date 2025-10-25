import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterOrdersTable1761223727087 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('orders', [
      new TableColumn({
        name: 'asaas_id',
        type: 'varchar',
        isNullable: true,
        length: '100',
      }),
      new TableColumn({
        name: 'asaas_url',
        type: 'varchar',
        isNullable: true,
        length: '100',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('orders', [
      new TableColumn({
        name: 'asaas_id',
        type: 'varchar',
        isNullable: false,
        length: '100',
      }),
      new TableColumn({
        name: 'asaas_url',
        type: 'varchar',
        isNullable: true,
        length: '100',
      }),
    ]);
  }
}
