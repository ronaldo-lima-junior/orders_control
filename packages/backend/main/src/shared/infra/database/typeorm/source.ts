import databaseConfig from '@config/database';
import { DataSource } from 'typeorm';
import UserMapper from '../../../../modules/users/infra/typeorm/mappers/UserMapper';
import ProductMapper from '@modules/products/infra/typeorm/mappers/ProductMapper';
import OrderMapper from '@modules/orders/infra/typeorm/mappers/OrderMapper';
import OrderItemMapper from '@modules/orders/infra/typeorm/mappers/OrderItemMapper';

const dataSource = new DataSource({
  type: 'postgres',
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
  entities: [UserMapper, ProductMapper, OrderMapper, OrderItemMapper],
});

export default dataSource;
