import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';

interface IAbstractFactory {
  createOrderRepository(): IOrderRepository;
  createUserRepository(): IUserRepository;
}

export default IAbstractFactory;
