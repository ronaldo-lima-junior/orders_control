import CreateProductInputData from '@modules/products/repositories/dtos/create/InputData';
import FindProductByIdOutputData from '@modules/products/repositories/dtos/findById/OutputData';
import GetAllProductsInputData from '@modules/products/repositories/dtos/getAll/InputData';
import GetAllProductsOutputData from '@modules/products/repositories/dtos/getAll/OutputData';
import UpdateProductInputData from '@modules/products/repositories/dtos/update/InputData';
import IProductRepository from '@modules/products/repositories/IProductRepository';
import EErrorType from '@shared/core/ErrorsType';
import CustomError from '@shared/errors/Errors';
import { CaughtError } from '@shared/helpers/CaughtError';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import ProductMapper from '../mappers/ProductMapper';
import databaseAdapter from '@shared/adapters/database';
import CountProductsInputData from '@modules/products/repositories/dtos/count/InputData';

class ProductDatabaseRepository implements IProductRepository {
  private readonly productRepository: Repository<ProductMapper>;

  constructor() {
    const queryRunner = databaseAdapter.getQueryRunner();
    this.productRepository = queryRunner.manager.getRepository(ProductMapper);
  }

  public async count(inputData: CountProductsInputData): Promise<number> {
    try {
      const where: FindOptionsWhere<ProductMapper> = {};
      if (inputData.description) {
        where.description = ILike(`%${inputData.description}%`);
      }

      if (inputData.category) {
        where.category = ILike(`%${inputData.category}%`);
      }

      return await this.productRepository.count({
        where,
      });
    } catch (err) {
      const caughtError = CaughtError(err);
      throw new CustomError({
        message: caughtError,
        errorType: EErrorType.Database,
      });
    }
  }

  public async create(inputData: CreateProductInputData): Promise<void> {
    try {
      const product = this.productRepository.create({
        description: inputData.description,
        category: inputData.category,
        price: inputData.price,
        quantity: inputData.quantity,
      });

      await this.productRepository.save(product);
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.Database,
      });
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.productRepository.softDelete({ id });
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.Database,
      });
    }
  }

  public async findById(
    id: number,
  ): Promise<FindProductByIdOutputData | undefined> {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        return undefined;
      }

      const response = new FindProductByIdOutputData({
        description: product.description,
        category: product.category,
        id: product.id,
        price: product.price,
        quantity: product.quantity,
      });

      return response;
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.Database,
      });
    }
  }

  public async getAll(
    inputData: GetAllProductsInputData,
  ): Promise<GetAllProductsOutputData> {
    try {
      const skip =
        inputData.page && inputData.rowsPerPage
          ? (inputData.page - 1) * inputData.rowsPerPage
          : 0;
      const take = inputData.rowsPerPage || 0;
      const where: FindOptionsWhere<ProductMapper> = {};
      if (inputData.description) {
        where.description = ILike(`%${inputData.description}%`);
      }

      if (inputData.category) {
        where.category = ILike(`%${inputData.category}%`);
      }

      const products = await this.productRepository.find({
        where,
        skip: !skip ? undefined : skip,
        take: !take ? undefined : take,
        order: {
          description: 'asc',
        },
      });

      const response = new GetAllProductsOutputData({
        list: products.map((product) => ({
          description: product.description,
          category: product.category,
          id: product.id,
          price: product.price,
          quantity: product.quantity,
        })),
      });

      return response;
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.Database,
      });
    }
  }

  public async update(inputData: UpdateProductInputData): Promise<void> {
    try {
      await this.productRepository.update(
        { id: inputData.id },
        {
          category: inputData.category,
          description: inputData.description,
          price: inputData.price,
          quantity: inputData.quantity,
        },
      );
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.Database,
      });
    }
  }
}

export default ProductDatabaseRepository;
