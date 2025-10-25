import OrderItemMapper from '@modules/orders/infra/typeorm/mappers/OrderItemMapper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
class ProductMapper {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
    primaryKeyConstraintName: 'PK_Products_Id',
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
    name: 'price',
    nullable: false,
  })
  price: number;

  @Column('varchar', {
    name: 'category',
    nullable: false,
    length: '25',
  })
  category: string;

  @Column('int', {
    name: 'quantity',
    nullable: false,
    default: 0,
  })
  quantity: number;

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

  @OneToMany(
    () => OrderItemMapper,
    (orderItemMapper) => orderItemMapper.product,
  )
  orderItems: OrderItemMapper[];
}

export default ProductMapper;
