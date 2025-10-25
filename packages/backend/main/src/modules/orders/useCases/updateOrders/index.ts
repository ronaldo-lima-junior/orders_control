import UseCase from '@shared/core/UseCase';
import InputData from './InputData';
import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import IAbstractFactory from './IAbstractFactory';
import CustomError from '@shared/errors/Errors';
import DatabaseFactory from './DatabaseFactory';
import EErrorType from '@shared/core/ErrorsType';
import IAsaasProvider from '@shared/providers/AsaasProvider/IAsaasProvider';
import { EOrderStatus } from '@shared/entities/orders/Orders';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import FindOrderByIdOutputData from '@modules/orders/repositories/dtos/findById/OutputData';

class UpdateOrder implements UseCase<InputData, void> {
  private readonly orderRepository: IOrderRepository;

  private readonly billingRepository: IAsaasProvider;

  private readonly userRepository: IUserRepository;

  constructor(repository: IAbstractFactory) {
    this.orderRepository = repository.createOrderRepository();
    this.billingRepository = repository.createBillingRepository();
    this.userRepository = repository.createUserRepository();
  }

  public async execute(inputData: InputData): Promise<void> {
    const order = await this.verifyOrder(inputData.id);
    await this.updateOrder(inputData);
    if (
      inputData.status !== EOrderStatus.send ||
      order.status === EOrderStatus.send
    ) {
      return;
    }

    const totalAmount = order.items.reduce(
      (accumulator, item) =>
        accumulator + item.product.price * item.product.quantity,
      0,
    );

    if (totalAmount) {
      await this.generateBilling(inputData, totalAmount);
    }
  }

  private async generateBilling(
    inputData: InputData,
    totalAmount: number,
  ): Promise<void> {
    const user = await this.userRepository.findById(inputData.userId);
    if (!user) {
      throw new CustomError({
        message: `Usuário #${inputData.userId} não localizado`,
        errorType: EErrorType.Conflict,
      });
    }

    if (!user.asaasId) {
      const asaasId = await this.billingRepository.registerCustomer({
        cpfCnpj: user.document,
        name: user.name,
      });

      await this.userRepository.updateAsaasId({
        id: inputData.userId,
        asaasId,
      });

      user.asaasId = asaasId;
    }

    const generatedBilling = await this.billingRepository.generate({
      customer: user.asaasId,
      value: totalAmount / 100,
    });

    await this.orderRepository.updateAsaasId({
      id: inputData.id,
      asaasId: generatedBilling.asaasId,
      asaasUrl: generatedBilling.invoiceUrl,
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

    return order;
  }

  private async updateOrder(inputData: InputData): Promise<void> {
    await this.orderRepository.update({
      description: inputData.description.toUpperCase(),
      id: inputData.id,
      status: inputData.status,
    });
  }
}

export { InputData, DatabaseFactory };
export default UpdateOrder;
