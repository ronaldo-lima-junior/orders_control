import CustomError from '@shared/errors/Errors';
import CountProductsInputData from '../dtos/count/InputData';
import CreateProductInputData from '../dtos/create/InputData';
import FindProductByIdOutputData from '../dtos/findById/OutputData';
import GetAllProductsInputData from '../dtos/getAll/InputData';
import GetAllProductsOutputData from '../dtos/getAll/OutputData';
import UpdateProductInputData from '../dtos/update/InputData';
import IProductRepository from '../IProductRepository';
import { CaughtError } from '@shared/helpers/CaughtError';
import EErrorType from '@shared/core/ErrorsType';
import Product from '@shared/entities/products/Products';

class ProductMemoryRepository implements IProductRepository {
  private readonly products: Product[];

  constructor({ products }: { products: Product[] }) {
    this.products = products;
  }

  public async count(inputData: CountProductsInputData): Promise<number> {
    try {
      let products = this.products;
      if (inputData.description) {
        products = products.filter(
          (product) =>
            product.getData().description.toUpperCase() ===
            inputData.description?.toUpperCase(),
        );
      }

      if (inputData.category) {
        products = products.filter(
          (product) =>
            product.getData().category.toUpperCase() ===
            inputData.category?.toUpperCase(),
        );
      }

      return products.length;
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.FakeError,
      });
    }
  }

  public async create(inputData: CreateProductInputData): Promise<void> {
    try {
      const product = Product.createRandom({
        category: inputData.category,
        description: inputData.description,
        price: inputData.price,
        quantity: inputData.quantity,
      });

      this.products.push(product);
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.FakeError,
      });
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      const product = this.products.find(
        (product) => product.getData().id === id,
      );
      if (product) {
        product.update({ deletedAt: new Date() });
      }
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.FakeError,
      });
    }
  }

  public async findById(
    id: number,
  ): Promise<FindProductByIdOutputData | undefined> {
    try {
      const product = this.products.find(
        (product) => product.getData().id === id,
      );
      if (!product) {
        return undefined;
      }

      const response = new FindProductByIdOutputData({
        category: product.getData().category,
        description: product.getData().description,
        id: product.getData().id,
        price: product.getData().price,
        quantity: product.getData().quantity,
      });

      return response;
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.FakeError,
      });
    }
  }

  public async getAll(
    inputData: GetAllProductsInputData,
  ): Promise<GetAllProductsOutputData> {
    try {
      let products = this.products;
      if (inputData.description) {
        products = products.filter(
          (product) =>
            product.getData().description.toUpperCase() ===
            inputData.description?.toUpperCase(),
        );
      }

      if (inputData.category) {
        products = products.filter(
          (product) =>
            product.getData().category.toUpperCase() ===
            inputData.category?.toUpperCase(),
        );
      }

      const response = new GetAllProductsOutputData({
        list: products.map((product) => ({
          category: product.getData().category,
          description: product.getData().description,
          id: product.getData().id,
          price: product.getData().price,
          quantity: product.getData().quantity,
        })),
      });

      return response;
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.FakeError,
      });
    }
  }

  public async update(inputData: UpdateProductInputData): Promise<void> {
    try {
      const product = this.products.find(
        (product) => product.getData().id === inputData.id,
      );
      if (product) {
        product.update({
          category: inputData.category,
          description: inputData.description,
          price: inputData.price,
          quantity: inputData.quantity,
        });
      }
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.FakeError,
      });
    }
  }
}

export default ProductMemoryRepository;
