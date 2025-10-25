import UseCase from '@shared/core/UseCase';
import InputData from './InputData';
import IProductRepository from '@modules/products/repositories/IProductRepository';
import IAbstractFactory from './IAbstractFactory';
import CustomError from '@shared/errors/Errors';
import DatabaseFactory from './DatabaseFactory';
import EErrorType from '@shared/core/ErrorsType';

class UpdateProduct implements UseCase<InputData, void> {
  private readonly productRepository: IProductRepository;

  constructor(repository: IAbstractFactory) {
    this.productRepository = repository.createProductRepository();
  }

  public async execute(inputData: InputData): Promise<void> {
    await this.verifyProduct(inputData.id);
    await this.updateProduct(inputData);
  }

  private async updateProduct(inputData: InputData): Promise<void> {
    await this.productRepository.update({
      category: inputData.category.toUpperCase(),
      description: inputData.description.toUpperCase(),
      id: inputData.id,
      price: inputData.price,
      quantity: inputData.quantity,
    });
  }
  private async verifyProduct(id: number): Promise<void> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new CustomError({
        message: `Produto #${id} não localizado`,
        errorType: EErrorType.Conflict,
      });
    }
  }
}

export { InputData, DatabaseFactory };
export default UpdateProduct;
