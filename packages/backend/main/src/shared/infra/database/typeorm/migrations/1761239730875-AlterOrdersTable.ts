import { EOrderStatus } from '@shared/entities/orders/Orders';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterOrdersTable1761239730875 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'orders',
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
        name: 'status',
        type: 'enum',
        isNullable: false,
        enum: [
          EOrderStatus.canceled,
          EOrderStatus.open,
          EOrderStatus.paid,
          EOrderStatus.send,
          EOrderStatus.received,
          EOrderStatus.refunded,
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'orders',
      new TableColumn({
        name: 'status',
        type: 'enum',
        isNullable: false,
        enum: [
          EOrderStatus.canceled,
          EOrderStatus.open,
          EOrderStatus.paid,
          EOrderStatus.send,
          EOrderStatus.received,
          EOrderStatus.refunded,
        ],
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
    );
  }
}
