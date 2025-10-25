import OrderMapper from '@modules/orders/infra/typeorm/mappers/OrderMapper';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
class UserMapper {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
    primaryKeyConstraintName: 'PK_Users_Id',
    type: 'int',
  })
  id: number;

  @Column('varchar', {
    name: 'name',
    nullable: false,
    length: '100',
  })
  name: string;

  @Column('varchar', {
    name: 'email',
    nullable: false,
    length: '100',
  })
  email: string;

  @Column('varchar', {
    name: 'password_hash',
    nullable: false,
    length: '100',
  })
  passwordHash: string;

  @Column('varchar', {
    name: 'document',
    nullable: false,
    length: '14',
  })
  document: string;

  @Column('varchar', {
    name: 'asaas_id',
    nullable: true,
    length: 50,
  })
  asaasId: string;

  @CreateDateColumn({
    default: 'NOW()',
    name: 'created_at',
    nullable: false,
  })
  createdAt: Date;

  @OneToMany(() => OrderMapper, (orderMapper) => orderMapper.user)
  orders: OrderMapper[];
}

export default UserMapper;
