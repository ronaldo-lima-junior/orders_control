import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateOrdersItemsTable1761133461793 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders_items',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'int',
            generationStrategy: 'increment',
            isGenerated: true,
            isPrimary: true,
            isNullable: false,
            primaryKeyConstraintName: 'PK_OrdersItems_Id',
          }),
          new TableColumn({
            name: 'order_id',
            type: 'int',
            isNullable: false,
          }),
          new TableColumn({
            name: 'product_id',
            type: 'int',
            isNullable: false,
          }),
          new TableColumn({
            name: 'product_price',
            type: 'int',
            isNullable: false,
          }),
          new TableColumn({
            name: 'product_quantity',
            type: 'int',
            isNullable: false,
          }),
          new TableColumn({
            name: 'registered_at',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'NOW()',
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

    await queryRunner.createForeignKeys('orders_items', [
      new TableForeignKey({
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        name: 'FK_OrdersItems_OrderId',
      }),
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        name: 'FK_OrdersItems_productId',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys('orders_items', [
      new TableForeignKey({
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        name: 'FK_OrdersItems_OrderId',
      }),
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        name: 'FK_OrdersItems_productId',
      }),
    ]);
    await queryRunner.dropTable('orders_items');
  }
}
