import User from '@shared/entities/users/Users';
import IUserRepository from '../IUserRepository';
import CreateUserInputData from '../dtos/create/InputData';
import FindUserByDocumentOutputData from '../dtos/findByDocument/OutputData';
import FindUserByEmailOutputData from '../dtos/findByEmail/OutputData';
import FindUserByIdOutputData from '../dtos/findById/OutputData';
import UpdateUserAsaasIdInputData from '../dtos/update/InputData';
import CustomError from '@shared/errors/Errors';
import { CaughtError } from '@shared/helpers/CaughtError';
import EErrorType from '@shared/core/ErrorsType';

class UserMemoryRepository implements IUserRepository {
  private readonly users: User[];

  constructor({ users }: { users: User[] }) {
    this.users = users;
  }

  public async create(inputData: CreateUserInputData): Promise<void> {
    try {
      const user = User.createRandom({
        email: inputData.email,
        document: inputData.document,
        name: inputData.name,
        passwordHash: inputData.passwordHash,
      });
      this.users.push(user);
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.FakeError,
      });
    }
  }

  public async findByDocument(
    document: string,
  ): Promise<FindUserByDocumentOutputData | undefined> {
    try {
      const user = this.users.find(
        (user) => user.getData().document === document,
      );
      if (!user) {
        return undefined;
      }

      const response = new FindUserByDocumentOutputData({
        email: user.getData().email,
        id: user.getData().id,
        name: user.getData().name,
        passwordHash: user.getData().passwordHash ?? '',
      });

      return response;
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.FakeError,
      });
    }
  }

  public async findByEmail(
    email: string,
  ): Promise<FindUserByEmailOutputData | undefined> {
    try {
      const user = this.users.find((user) => user.getData().email === email);
      if (!user) {
        return undefined;
      }

      const response = new FindUserByEmailOutputData({
        email: user.getData().email,
        id: user.getData().id,
        name: user.getData().name,
        passwordHash: user.getData().passwordHash ?? '',
      });

      return response;
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.FakeError,
      });
    }
  }

  public async findById(
    id: number,
  ): Promise<FindUserByIdOutputData | undefined> {
    try {
      const user = this.users.find((user) => user.getData().id === id);
      if (!user) {
        return undefined;
      }

      const response = new FindUserByIdOutputData({
        email: user.getData().email,
        id: user.getData().id,
        name: user.getData().name,
        passwordHash: user.getData().passwordHash ?? '',
        document: user.getData().document,
        asaasId: user.getData().asaasId ?? '',
      });

      return response;
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.FakeError,
      });
    }
  }

  public async updateAsaasId(
    inputData: UpdateUserAsaasIdInputData,
  ): Promise<void> {
    try {
      const user = this.users.find(
        (user) => user.getData().id === inputData.id,
      );
      if (user) {
        user.update({
          asaasId: inputData.asaasId,
        });
      }
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.FakeError,
      });
    }
  }
}

export default UserMemoryRepository;
