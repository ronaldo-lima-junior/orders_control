import IProductRepository from '@modules/products/repositories/IProductRepository';
import IAbstractFactory from './IAbstractFactory';
import ProductDatabaseRepository from '@modules/products/infra/typeorm/repositories/ProductDatabaseRepository';

class DatabaseFactory implements IAbstractFactory {
  public createProductRepository(): IProductRepository {
    return new ProductDatabaseRepository();
  }
}

export default DatabaseFactory;
