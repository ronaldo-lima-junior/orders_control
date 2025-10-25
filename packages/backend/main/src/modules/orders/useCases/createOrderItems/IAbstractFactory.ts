import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import IProductRepository from '@modules/products/repositories/IProductRepository';

interface IAbstractFactory {
  createOrderRepository(): IOrderRepository;
  createProductRepository(): IProductRepository;
}

export default IAbstractFactory;
