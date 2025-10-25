import Order from '@shared/entities/orders/Orders';
import IAbstractFactory from './IAbstractFactory';
import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import OrderMemoryRespository from '@modules/orders/repositories/fakes/OrderMemoryRepository';

class MemoryFactory implements IAbstractFactory {
  private readonly orders: Order[];

  constructor({ orders }: { orders: Order[] }) {
    this.orders = orders;
  }

  public createOrderRepository(): IOrderRepository {
    return new OrderMemoryRespository({ orders: this.orders });
  }
}

export default MemoryFactory;
