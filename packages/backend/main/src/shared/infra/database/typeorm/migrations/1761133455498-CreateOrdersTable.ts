import { EOrderStatus } from '@shared/entities/orders/Orders';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateOrdersTable1761133455498 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'int',
            generationStrategy: 'increment',
            isGenerated: true,
            isPrimary: true,
            isNullable: false,
            primaryKeyConstraintName: 'PK_Orders_Id',
          }),
          new TableColumn({
            name: 'description',
            type: 'varchar',
            isNullable: false,
            length: '100',
          }),
          new TableColumn({
            name: 'user_id',
            type: 'int',
            isNullable: false,
          }),
          new TableColumn({
            name: 'status',
            type: 'enum',
            isNullable: false,
            enum: [
              EOrderStatus.canceled,
              EOrderStatus.open,
              EOrderStatus.paid,
              EOrderStatus.send,
            ],
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
    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        name: 'FK_Orders_UserId',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        name: 'FK_Orders_UserId',
      }),
    );

    await queryRunner.dropTable('orders');
  }
}
