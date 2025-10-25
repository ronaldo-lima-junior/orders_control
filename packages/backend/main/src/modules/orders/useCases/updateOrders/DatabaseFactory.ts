import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import IAbstractFactory from './IAbstractFactory';
import OrderDatabaseRepository from '@modules/orders/infra/typeorm/repositories/OrderDatabaseRepository';
import IAsaasProvider from '@shared/providers/AsaasProvider/IAsaasProvider';
import AsaasProvider from '@shared/providers/AsaasProvider/implementations';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserDatabaseRepository from '@modules/users/infra/typeorm/repositories/UserDatabaseRepository';

class DatabaseFactory implements IAbstractFactory {
  public createOrderRepository(): IOrderRepository {
    return new OrderDatabaseRepository();
  }

  public createBillingRepository(): IAsaasProvider {
    return new AsaasProvider();
  }

  public createUserRepository(): IUserRepository {
    return new UserDatabaseRepository();
  }
}

export default DatabaseFactory;
