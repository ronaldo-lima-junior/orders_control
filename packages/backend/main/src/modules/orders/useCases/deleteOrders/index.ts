import UseCase from '@shared/core/UseCase';
import InputData from './InputData';
import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import IAbstractFactory from './IAbstractFactory';
import CustomError from '@shared/errors/Errors';
import DatabaseFactory from './DatabaseFactory';
import EErrorType from '@shared/core/ErrorsType';

class DeleteOrder implements UseCase<InputData, void> {
  private readonly orderRepository: IOrderRepository;

  constructor(repository: IAbstractFactory) {
    this.orderRepository = repository.createOrderRepository();
  }

  public async execute(inputData: InputData): Promise<void> {
    await this.verifyOrder(inputData.id);
    await this.deleteOrder(inputData.id);
  }

  private async deleteOrder(orderId: number): Promise<void> {
    await this.orderRepository.delete(orderId);
  }

  private async verifyOrder(orderId: number): Promise<void> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new CustomError({
        message: `Pedido #${orderId} não localizado`,
        errorType: EErrorType.Conflict,
      });
    }

    if (order.items.length) {
      throw new CustomError({
        message: `Pedido #${orderId} possui item(ns) vinculados, o que impede sua exclusão`,
        errorType: EErrorType.Conflict,
      });
    }
  }
}

export { InputData, DatabaseFactory };
export default DeleteOrder;
