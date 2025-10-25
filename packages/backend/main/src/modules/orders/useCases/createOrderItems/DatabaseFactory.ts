import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import IAbstractFactory from './IAbstractFactory';
import OrderDatabaseRepository from '@modules/orders/infra/typeorm/repositories/OrderDatabaseRepository';
import IProductRepository from '@modules/products/repositories/IProductRepository';
import ProductDatabaseRepository from '@modules/products/infra/typeorm/repositories/ProductDatabaseRepository';

class DatabaseFactory implements IAbstractFactory {
  public createOrderRepository(): IOrderRepository {
    return new OrderDatabaseRepository();
  }

  public createProductRepository(): IProductRepository {
    return new ProductDatabaseRepository();
  }
}

export default DatabaseFactory;
