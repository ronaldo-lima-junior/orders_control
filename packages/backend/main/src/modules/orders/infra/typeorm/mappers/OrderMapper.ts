import UserMapper from '@modules/users/infra/typeorm/mappers/UserMapper';
import { EOrderStatus } from '@shared/entities/orders/Orders';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import OrderItemMapper from './OrderItemMapper';

@Entity('orders')
class OrderMapper {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
    primaryKeyConstraintName: 'PK_Orders_Id',
    type: 'int',
  })
  id: number;

  @Column('varchar', {
    name: 'description',
    nullable: false,
    length: '100',
  })
  description: string;

  @Column('int', {
    name: 'user_id',
    nullable: false,
  })
  userId: number;

  @Column('enum', {
    name: 'status',
    nullable: false,
    enum: [
      EOrderStatus.canceled,
      EOrderStatus.open,
      EOrderStatus.paid,
      EOrderStatus.send,
      EOrderStatus.received,
      EOrderStatus.refunded,
    ],
  })
  status: EOrderStatus;

  @Column('date', {
    name: 'registered_at',
    nullable: false,
    default: 'NOW()',
  })
  registeredAt: string;

  @Column('varchar', {
    name: 'asaas_id',
    nullable: true,
    length: '100',
  })
  asaasId: string;

  @Column('varchar', {
    name: 'asaas_url',
    nullable: true,
    length: '100',
  })
  asaasUrl: string;

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

  @ManyToOne(() => UserMapper, (userMapper) => userMapper.orders)
  @JoinColumn({ name: 'user_id' })
  user: UserMapper;

  @OneToMany(() => OrderItemMapper, (orderItemMapper) => orderItemMapper.order)
  orderItems: OrderItemMapper[];
}

export default OrderMapper;
