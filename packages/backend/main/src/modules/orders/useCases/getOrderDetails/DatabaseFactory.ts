import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import IAbstractFactory from './IAbstractFactory';
import OrderDatabaseRepository from '@modules/orders/infra/typeorm/repositories/OrderDatabaseRepository';

class DatabaseFactory implements IAbstractFactory {
  public createOrderRepository(): IOrderRepository {
    return new OrderDatabaseRepository();
  }
}

export default DatabaseFactory;
