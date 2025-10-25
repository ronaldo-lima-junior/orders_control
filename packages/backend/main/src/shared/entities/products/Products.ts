import { faker } from '@faker-js/faker';
import Entity from '@shared/core/Entity';

interface IProduct {
  id: number;
  description: string;
  price: number;
  category: string;
  quantity: number;
  createdAt: Date;
  deletedAt: Date | null;
}
class Product implements Entity<IProduct> {
  private id: number;

  private description: string;

  private price: number;

  private category: string;

  private quantity: number;

  private createdAt: Date;

  private deletedAt: Date | null;

  constructor({
    id,
    description,
    price,
    category,
    quantity,
    createdAt,
    deletedAt,
  }: IProduct) {
    this.setData({
      id,
      description,
      price,
      category,
      quantity,
      createdAt,
      deletedAt,
    });
  }

  private setData(product: IProduct) {
    this.id = product.id;
    this.description = product.description;
    this.price = product.price;
    this.category = product.category;
    this.quantity = product.quantity;
    this.createdAt = product.createdAt;
    this.deletedAt = product.deletedAt;
  }

  public getData(): IProduct {
    return {
      id: this.id,
      description: this.description,
      price: this.price,
      category: this.category,
      quantity: this.quantity,
      createdAt: this.createdAt,
      deletedAt: this.deletedAt,
    };
  }

  public static createRandom(data?: Partial<IProduct>): Product {
    return new Product({
      id: data?.id ?? faker.number.int(),
      description: data?.description ?? faker.commerce.product(),
      price: data?.price ?? faker.number.int(),
      category: data?.category ?? faker.commerce.department(),
      quantity: data?.quantity ?? faker.number.int(),
      createdAt: data?.createdAt ?? faker.date.anytime(),
      deletedAt: data?.deletedAt ?? null,
    });
  }

  public update(data: Partial<Omit<IProduct, 'id'>>): void {
    this.description = data?.description || this.description;
    this.category = data?.category || this.category;
    this.price = data?.price || this.price;
    this.quantity = data?.price || this.quantity;
  }
}

export default Product;
