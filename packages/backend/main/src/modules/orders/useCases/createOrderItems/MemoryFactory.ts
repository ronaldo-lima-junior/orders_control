import Order from '@shared/entities/orders/Orders';
import IAbstractFactory from './IAbstractFactory';
import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import OrderMemoryRespository from '@modules/orders/repositories/fakes/OrderMemoryRepository';
import IProductRepository from '@modules/products/repositories/IProductRepository';
import ProductMemoryRepository from '@modules/products/repositories/fakes/ProductMemoryRepository';
import Product from '@shared/entities/products/Products';

class MemoryFactory implements IAbstractFactory {
  private readonly orders: Order[];

  private readonly products: Product[];

  constructor({ orders, products }: { orders: Order[]; products: Product[] }) {
    this.orders = orders;
    this.products = products;
  }

  public createOrderRepository(): IOrderRepository {
    return new OrderMemoryRespository({ orders: this.orders });
  }

  public createProductRepository(): IProductRepository {
    return new ProductMemoryRepository({ products: this.products });
  }
}

export default MemoryFactory;
