import UseCase from '@shared/core/UseCase';
import InputData from './InputData';
import IProductRepository from '@modules/products/repositories/IProductRepository';
import IAbstractFactory from './IAbstractFactory';
import DatabaseFactory from './DatabaseFactory';
import CreateProductInputData from '@modules/products/repositories/dtos/create/InputData';

class CreateProduct implements UseCase<InputData, void> {
  private readonly productRepository: IProductRepository;

  constructor(repository: IAbstractFactory) {
    this.productRepository = repository.createProductRepository();
  }

  public async execute(inputData: InputData): Promise<void> {
    await this.createProduct(inputData);
  }

  private async createProduct(inputData: InputData): Promise<void> {
    const product = new CreateProductInputData({
      category: inputData.category.toUpperCase(),
      description: inputData.description.toUpperCase(),
      price: inputData.price,
      quantity: inputData.quantity,
    });

    await this.productRepository.create(product);
  }
}

export { DatabaseFactory, InputData };
export default CreateProduct;
