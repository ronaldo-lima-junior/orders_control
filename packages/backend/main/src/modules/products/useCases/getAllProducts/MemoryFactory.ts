import IProductRepository from '@modules/products/repositories/IProductRepository';
import IAbstractFactory from './IAbstractFactory';
import Product from '@shared/entities/products/Products';
import ProductMemoryRepository from '@modules/products/repositories/fakes/ProductMemoryRepository';

class MemoryFactory implements IAbstractFactory {
  private readonly products: Product[];

  constructor({ products }: { products: Product[] }) {
    this.products = products;
  }

  public createProductRepository(): IProductRepository {
    return new ProductMemoryRepository({ products: this.products });
  }
}

export default MemoryFactory;
