import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import OrderMapper from './OrderMapper';
import ProductMapper from '@modules/products/infra/typeorm/mappers/ProductMapper';

@Entity('orders_items')
class OrderItemMapper {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
    primaryKeyConstraintName: 'PK_Orders_Items_Id',
    type: 'int',
  })
  id: number;

  @Column('int', {
    name: 'order_id',
    nullable: false,
  })
  orderId: number;

  @Column('int', {
    name: 'product_id',
    nullable: false,
  })
  productId: number;

  @Column('int', {
    name: 'product_price',
    nullable: false,
  })
  productPrice: number;

  @Column('int', {
    name: 'product_quantity',
    nullable: false,
  })
  productQuantity: number;

  @Column('date', {
    name: 'registered_at',
    nullable: false,
    default: 'NOW()',
  })
  registeredAt: string;

  @CreateDateColumn({
    default: 'NOW()',
    name: 'created_at',
    nullable: false,
  })
  createdAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt: Date;

  @ManyToOne(() => OrderMapper, (orderMapper) => orderMapper.orderItems)
  @JoinColumn({ name: 'order_id' })
  order: OrderMapper;

  @ManyToOne(() => ProductMapper, (productMapper) => productMapper.orderItems)
  @JoinColumn({ name: 'product_id' })
  product: ProductMapper;
}

export default OrderItemMapper;
