import UseCase from '@shared/core/UseCase';
import InputData from './InputData';
import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import IAbstractFactory from './IAbstractFactory';
import GetAllOrdersOutputData from '@modules/orders/repositories/dtos/getAll/OutputData';
import DatabaseFactory from './DatabaseFactory';
import OutputData from '@modules/orders/useCases/getAllOrders/OutputData';

class GetAllOrders implements UseCase<InputData, OutputData> {
  private readonly orderRepository: IOrderRepository;

  constructor(repository: IAbstractFactory) {
    this.orderRepository = repository.createOrderRepository();
  }

  public async execute(inputData: InputData): Promise<OutputData> {
    const orders = await this.getOrders(inputData);
    const count = await this.getOrdersCount(inputData);
    const total = Math.ceil(count / inputData.pagination.rowsPerPage);
    const response = new OutputData({
      list: orders.list,
      pagination: {
        current: inputData.pagination.page,
        total,
        totalRows: count,
      },
    });

    return response;
  }

  private async getOrders(
    inputData: InputData,
  ): Promise<GetAllOrdersOutputData> {
    return await this.orderRepository.getAll({
      description: inputData.filter.description,
      userId: inputData.filter.userId,
      status: inputData.filter.status,
      page: inputData.pagination.page,
      rowsPerPage: inputData.pagination.rowsPerPage,
    });
  }

  private async getOrdersCount(inputData: InputData): Promise<number> {
    return await this.orderRepository.count({
      description: inputData.filter.description,
      status: inputData.filter.status,
      userId: inputData.filter.userId,
    });
  }
}

export { InputData, DatabaseFactory };
export default GetAllOrders;
