import IOrderRepository from '@modules/orders/repositories/IOrderRepository';

interface IAbstractFactory {
  createOrderRepository(): IOrderRepository;
}

export default IAbstractFactory;
