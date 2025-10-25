import IProductRepository from '@modules/products/repositories/IProductRepository';

interface IAbstractFactory {
  createProductRepository(): IProductRepository;
}

export default IAbstractFactory;
