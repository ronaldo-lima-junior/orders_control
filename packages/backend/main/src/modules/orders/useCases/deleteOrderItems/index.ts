import UseCase from '@shared/core/UseCase';
import InputData from './InputData';
import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import IAbstractFactory from './IAbstractFactory';
import CustomError from '@shared/errors/Errors';
import EErrorType from '@shared/core/ErrorsType';
import { EOrderStatus } from '@shared/entities/orders/Orders';
import DatabaseFactory from './DatabaseFactory';
import FindOrderByIdOutputData from '@modules/orders/repositories/dtos/findById/OutputData';

class DeleteOrderItem implements UseCase<InputData, void> {
  private readonly orderRepository: IOrderRepository;

  constructor(repository: IAbstractFactory) {
    this.orderRepository = repository.createOrderRepository();
  }

  public async execute(inputData: InputData): Promise<void> {
    const order = await this.verifyOrder(inputData.orderId);
    const foundedItem = order.items.find(
      (item) => (item.id = inputData.itemId),
    );
    await this.orderRepository.deleteOrderItem({
      itemId: inputData.itemId,
      productId: foundedItem?.product.id ?? 0,
      quantity: foundedItem?.product.quantity ?? 0,
    });
  }

  private async verifyOrder(orderId: number): Promise<FindOrderByIdOutputData> {
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

    return order;
  }
}
export { InputData, DatabaseFactory };
export default DeleteOrderItem;
