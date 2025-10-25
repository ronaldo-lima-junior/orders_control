import UseCase from '@shared/core/UseCase';
import InputData from './InputData';
import IProductRepository from '@modules/products/repositories/IProductRepository';
import IAbstractFactory from './IAbstractFactory';
import CustomError from '@shared/errors/Errors';
import DatabaseFactory from './DatabaseFactory';
import EErrorType from '@shared/core/ErrorsType';

class DeleteProduct implements UseCase<InputData, void> {
  private readonly productRepository: IProductRepository;

  constructor(repository: IAbstractFactory) {
    this.productRepository = repository.createProductRepository();
  }

  public async execute(inputData: InputData): Promise<void> {
    await this.verifyProduct(inputData.id);
    await this.deleteProduct(inputData.id);
  }

  private async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
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
export default DeleteProduct;
