import UseCase from '@shared/core/UseCase';
import DatabaseFactory from './DatabaseAbstract';
import InputData from './InputData';
import FindOrderByPaymentIdOutputData from '@modules/orders/repositories/dtos/findByPaymentId/OutputData';
import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import IAbstractFactory from './IAbstractFactory';
import CustomError from '@shared/errors/Errors';
import EErrorType from '@shared/core/ErrorsType';
import { EAsaasEvents, EOrderStatus } from '@shared/entities/orders/Orders';

class WebHookAsaas implements UseCase<InputData, void> {
  private readonly orderRepository: IOrderRepository;

  constructor(repository: IAbstractFactory) {
    this.orderRepository = repository.createOrderRepository();
  }

  public async execute(inputData: InputData): Promise<void> {
    await this.updateStatus(inputData);
  }

  private async updateStatus(inputData: InputData): Promise<void> {
    const order = await this.verifyOrderByPaymentId(inputData.paymentId);
    let status: EOrderStatus;
    switch (inputData.event) {
      case EAsaasEvents.deleted:
        status = EOrderStatus.canceled;
        break;
      case EAsaasEvents.authorized:
      case EAsaasEvents.received:
        status = EOrderStatus.received;
        break;
      case EAsaasEvents.refunded:
        status = EOrderStatus.refunded;
        break;
      default:
        status = EOrderStatus.paid;
        break;
    }
    await this.orderRepository.update({
      id: order.id,
      description: order.description,
      status,
    });
  }

  private async verifyOrderByPaymentId(
    paymentId: string,
  ): Promise<FindOrderByPaymentIdOutputData> {
    const order = await this.orderRepository.findByPaymentId(paymentId);
    if (!order) {
      throw new CustomError({
        message: `PaymentId #${paymentId} não localizado na base de dados`,
        errorType: EErrorType.Conflict,
      });
    }

    return order;
  }
}

export { InputData, DatabaseFactory };
export default WebHookAsaas;
