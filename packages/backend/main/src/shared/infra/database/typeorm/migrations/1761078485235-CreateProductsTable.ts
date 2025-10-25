import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class CreateProductsTable1761078485235 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'int',
            generationStrategy: 'increment',
            isGenerated: true,
            isPrimary: true,
            isNullable: false,
            primaryKeyConstraintName: 'PK_Products_Id',
          }),
          new TableColumn({
            name: 'description',
            type: 'varchar',
            isNullable: false,
            length: '100',
          }),
          new TableColumn({
            name: 'category',
            type: 'varchar',
            isNullable: false,
            length: '25',
          }),
          new TableColumn({
            name: 'price',
            type: 'int',
            isNullable: false,
            default: 0,
          }),
          new TableColumn({
            name: 'quantity',
            type: 'int',
            isNullable: false,
            default: 0,
          }),
          new TableColumn({
            name: 'created_at',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'NOW()',
          }),
          new TableColumn({
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
