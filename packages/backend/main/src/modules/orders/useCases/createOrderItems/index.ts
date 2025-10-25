import UseCase from '@shared/core/UseCase';
import InputData from './InputData';
import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import IAbstractFactory from './IAbstractFactory';
import IProductRepository from '@modules/products/repositories/IProductRepository';
import CustomError from '@shared/errors/Errors';
import DatabaseFactory from './DatabaseFactory';
import EErrorType from '@shared/core/ErrorsType';
import { EOrderStatus } from '@shared/entities/orders/Orders';

class CreateOrderItem implements UseCase<InputData, void> {
  private readonly orderRepository: IOrderRepository;

  private readonly productRepository: IProductRepository;

  constructor(repository: IAbstractFactory) {
    this.orderRepository = repository.createOrderRepository();
    this.productRepository = repository.createProductRepository();
  }

  public async execute(inputData: InputData): Promise<void> {
    await this.verifyOrder(inputData.orderId);
    await this.verifyProduct(inputData);
    await this.createOrderItem(inputData);
  }

  private async createOrderItem(inputData: InputData): Promise<void> {
    await this.orderRepository.createOrderItem({
      orderId: inputData.orderId,
      product: inputData.product,
    });
  }

  private async verifyOrder(orderId: number): Promise<void> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new CustomError({
        message: `Pedido #${orderId} não localizado`,
        errorType: EErrorType.Conflict,
      });
    }

    if (order.status !== EOrderStatus.open) {
      throw new CustomError({
        message: `Pedido #${orderId} já processado, o que impede a sua modificação`,
        errorType: EErrorType.Conflict,
      });
    }
  }

  private async verifyProduct(inputData: InputData): Promise<void> {
    const product = await this.productRepository.findById(inputData.product.id);
    if (!product) {
      throw new CustomError({
        message: `Produto #${inputData.product.id} não localizado`,
        errorType: EErrorType.Conflict,
      });
    }

    if (product.quantity < inputData.product.quantity) {
      throw new CustomError({
        message: `Produto #${inputData.product.id} com estoque insuficiente`,
        errorType: EErrorType.Conflict,
      });
    }
  }
}

export { InputData, DatabaseFactory };
export default CreateOrderItem;
