import UseCase from '@shared/core/UseCase';
import InputData from './InputData';
import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import IAbstractFactory from './IAbstractFactory';
import CreateOrderInputData from '@modules/orders/repositories/dtos/create/InputData';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import CustomError from '@shared/errors/Errors';
import DatabaseFactory from './DatabaseFactory';
import EErrorType from '@shared/core/ErrorsType';

class CreateOrder implements UseCase<InputData, void> {
  private readonly orderRepository: IOrderRepository;

  private readonly userRepository: IUserRepository;

  constructor(repository: IAbstractFactory) {
    this.orderRepository = repository.createOrderRepository();
    this.userRepository = repository.createUserRepository();
  }

  public async execute(inputData: InputData): Promise<void> {
    await this.verifyUser(inputData.userId);
    await this.createOrder(inputData);
  }

  private async verifyUser(userId: number): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new CustomError({
        message: `Usuário #${userId} não localizado`,
        errorType: EErrorType.Conflict,
      });
    }
  }

  private async createOrder(inputData: InputData): Promise<void> {
    const order = new CreateOrderInputData({
      description: inputData.description.toUpperCase(),
      userId: inputData.userId,
    });

    await this.orderRepository.create(order);
  }
}

export { InputData, DatabaseFactory };
export default CreateOrder;
