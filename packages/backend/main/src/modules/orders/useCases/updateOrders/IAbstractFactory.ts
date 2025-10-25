import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IAsaasProvider from '@shared/providers/AsaasProvider/IAsaasProvider';

interface IAbstractFactory {
  createOrderRepository(): IOrderRepository;
  createBillingRepository(): IAsaasProvider;
  createUserRepository(): IUserRepository;
}

export default IAbstractFactory;
