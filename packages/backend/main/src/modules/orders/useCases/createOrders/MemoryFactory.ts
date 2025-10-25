import Order from '@shared/entities/orders/Orders';
import IAbstractFactory from './IAbstractFactory';
import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import OrderMemoryRespository from '@modules/orders/repositories/fakes/OrderMemoryRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserMemoryRepository from '@modules/users/repositories/fakes/UserMemoryRepository';
import User from '@shared/entities/users/Users';

class MemoryFactory implements IAbstractFactory {
  private readonly orders: Order[];

  private readonly users: User[];

  constructor({ orders, users }: { orders: Order[]; users: User[] }) {
    this.orders = orders;
    this.users = users;
  }

  public createOrderRepository(): IOrderRepository {
    return new OrderMemoryRespository({ orders: this.orders });
  }

  public createUserRepository(): IUserRepository {
    return new UserMemoryRepository({ users: this.users });
  }
}

export default MemoryFactory;
