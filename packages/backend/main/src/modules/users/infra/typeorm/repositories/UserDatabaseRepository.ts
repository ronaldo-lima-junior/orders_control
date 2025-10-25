import CreateUserInputData from '@modules/users/repositories/dtos/create/InputData';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { Repository } from 'typeorm';
import UserMapper from '../mappers/UserMapper';
import databaseAdapter from '@shared/adapters/database';
import FindUserByEmailOutputData from '@modules/users/repositories/dtos/findByEmail/OutputData';
import CustomError from '@shared/errors/Errors';
import { CaughtError } from '@shared/helpers/CaughtError';
import EErrorType from '@shared/core/ErrorsType';
import FindUserByIdOutputData from '@modules/users/repositories/dtos/findById/OutputData';
import FindUserByDocumentOutputData from '@modules/users/repositories/dtos/findByDocument/OutputData';
import UpdateUserAsaasIdInputData from '@modules/users/repositories/dtos/update/InputData';

class UserDatabaseRepository implements IUserRepository {
  public readonly userRepository: Repository<UserMapper>;

  constructor() {
    const queryRunner = databaseAdapter.getQueryRunner();
    this.userRepository = queryRunner.manager.getRepository(UserMapper);
  }

  public async create(inputData: CreateUserInputData): Promise<void> {
    try {
      const user = this.userRepository.create({
        email: inputData.email,
        name: inputData.name,
        passwordHash: inputData.passwordHash,
        document: inputData.document,
      });

      await this.userRepository.save(user);
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.Database,
      });
    }
  }

  public async findByEmail(
    email: string,
  ): Promise<FindUserByEmailOutputData | undefined> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        return undefined;
      }

      const response = new FindUserByEmailOutputData({
        name: user.name,
        email: user.email,
        passwordHash: user.passwordHash,
        id: user.id,
      });

      return response;
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.Database,
      });
    }
  }

  public async findByDocument(
    document: string,
  ): Promise<FindUserByDocumentOutputData | undefined> {
    try {
      const user = await this.userRepository.findOne({ where: { document } });
      if (!user) {
        return undefined;
      }

      const response = new FindUserByDocumentOutputData({
        name: user.name,
        email: user.email,
        passwordHash: user.passwordHash,
        id: user.id,
      });

      return response;
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.Database,
      });
    }
  }

  public async findById(
    id: number,
  ): Promise<FindUserByIdOutputData | undefined> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        return undefined;
      }

      const response = new FindUserByIdOutputData({
        name: user.name,
        email: user.email,
        passwordHash: user.passwordHash,
        id: user.id,
        asaasId: user.asaasId,
        document: user.document,
      });

      return response;
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.Database,
      });
    }
  }

  public async updateAsaasId(
    inputData: UpdateUserAsaasIdInputData,
  ): Promise<void> {
    try {
      await this.userRepository.update(
        { id: inputData.id },
        { asaasId: inputData.asaasId },
      );
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.Database,
      });
    }
  }
}

export default UserDatabaseRepository;
