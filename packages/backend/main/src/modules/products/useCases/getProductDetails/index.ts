import UseCase from '@shared/core/UseCase';
import InputData from './InputData';
import IProductRepository from '@modules/products/repositories/IProductRepository';
import IAbstractFactory from './IAbstractFactory';
import CustomError from '@shared/errors/Errors';
import EErrorType from '@shared/core/ErrorsType';
import FindProductByIdOutputData from '@modules/products/repositories/dtos/findById/OutputData';
import DatabaseFactory from './DatabaseFactory';
import OutputData from './OutputData';

class GetProductDetails implements UseCase<InputData, OutputData> {
  private readonly productRepository: IProductRepository;

  constructor(repository: IAbstractFactory) {
    this.productRepository = repository.createProductRepository();
  }

  public async execute(inputData: InputData): Promise<OutputData> {
    const product = await this.getProduct(inputData.id);
    const response = new OutputData({
      category: product.category,
      description: product.description,
      id: product.id,
      price: product.price,
      quantity: product.quantity,
    });

    return response;
  }

  private async getProduct(id: number): Promise<FindProductByIdOutputData> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new CustomError({
        message: `Produto #${id} não localizado`,
        errorType: EErrorType.Conflict,
      });
    }

    return product;
  }
}

export { InputData, DatabaseFactory };
export default GetProductDetails;
