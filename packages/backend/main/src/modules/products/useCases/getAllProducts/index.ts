import UseCase from '@shared/core/UseCase';
import InputData from './InputData';
import IProductRepository from '@modules/products/repositories/IProductRepository';
import IAbstractFactory from './IAbstractFactory';
import GetAllProductsOutputData from '@modules/products/repositories/dtos/getAll/OutputData';
import DatabaseFactory from './DatabaseFactory';
import OutputData from './OutputData';

class GetAllProduct implements UseCase<InputData, OutputData> {
  private readonly productRepository: IProductRepository;

  constructor(repository: IAbstractFactory) {
    this.productRepository = repository.createProductRepository();
  }

  public async execute(inputData: InputData): Promise<OutputData> {
    const products = await this.getProducts(inputData);
    const count = await this.getProductsCount(inputData);
    const total = Math.ceil(count / inputData.pagination.rowsPerPage);
    const response = new OutputData({
      list: products.list,
      pagination: {
        current: inputData.pagination.page,
        total,
        totalRows: count,
      },
    });

    return response;
  }

  private async getProducts(
    inputData: InputData,
  ): Promise<GetAllProductsOutputData> {
    return await this.productRepository.getAll({
      category: inputData.filter.category,
      description: inputData.filter.description,
      page: inputData.pagination.page,
      rowsPerPage: inputData.pagination.rowsPerPage,
    });
  }

  private async getProductsCount(inputData: InputData): Promise<number> {
    return await this.productRepository.count({
      category: inputData.filter.category,
      description: inputData.filter.description,
    });
  }
}

export { InputData, DatabaseFactory };
export default GetAllProduct;
