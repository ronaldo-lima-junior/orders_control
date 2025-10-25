import UseCase from '@shared/core/UseCase';
import InputData from './InputData';
import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import IAbstractFactory from './IAbstractFactory';
import FindOrderByIdOutputData from '@modules/orders/repositories/dtos/findById/OutputData';
import CustomError from '@shared/errors/Errors';
import DatabaseFactory from './DatabaseFactory';
import EErrorType from '@shared/core/ErrorsType';
import OutputData from './OutputData';

class GetOrderDetails implements UseCase<InputData, OutputData> {
  private readonly orderRepository: IOrderRepository;

  constructor(repository: IAbstractFactory) {
    this.orderRepository = repository.createOrderRepository();
  }

  public async execute(inputData: InputData): Promise<OutputData> {
    const order = await this.getOrder(inputData.id);
    const response = new OutputData({
      id: order.id,
      description: order.description,
      status: order.status,
      registeredAt: order.registeredAt,
      user: order.user,
      items: order.items,
    });

    return response;
  }

  private async getOrder(id: number): Promise<FindOrderByIdOutputData> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new CustomError({
        message: `Pedido #${id} não localizado`,
        errorType: EErrorType.Conflict,
      });
    }

    return order;
  }
}

export { InputData, DatabaseFactory };
export default GetOrderDetails;
