import IUserRepository from '@modules/users/repositories/IUserRepository';
import IAbstractFactory from './IAbstractFactory';
import UseCase from '@shared/core/UseCase';
import InputData from './InputData';
import CreateUserInputData from '@modules/users/repositories/dtos/create/InputData';
import { hash } from 'bcryptjs';
import CustomError from '@shared/errors/Errors';
import EErrorType from '@shared/core/ErrorsType';
import DatabaseFactory from './DatabaseFactory';

class CreateUser implements UseCase<InputData, void> {
  private readonly userRepository: IUserRepository;

  constructor(repository: IAbstractFactory) {
    this.userRepository = repository.createUserRepository();
  }

  public async execute(inputData: InputData): Promise<void> {
    await this.verifyUser(inputData);
    await this.createUser(inputData);
  }

  private async createUser(inputData: InputData): Promise<void> {
    const passwordHash = await hash(inputData.password, 6);
    const user = new CreateUserInputData({
      name: inputData.name,
      email: inputData.email,
      passwordHash,
      document: inputData.document,
    });
    await this.userRepository.create(user);
  }

  private async verifyUser(inputData: InputData): Promise<void> {
    const userEmail = await this.userRepository.findByEmail(inputData.email);
    if (userEmail) {
      throw new CustomError({
        message: `E-mail ${inputData.email} já cadastrado`,
        errorType: EErrorType.Conflict,
      });
    }

    const userDocument = await this.userRepository.findByDocument(
      inputData.document,
    );
    if (userDocument) {
      throw new CustomError({
        message: `CPF/CNPJ ${inputData.document} já cadastrado`,
        errorType: EErrorType.Conflict,
      });
    }
  }
}

export { InputData, DatabaseFactory };
export default CreateUser;
