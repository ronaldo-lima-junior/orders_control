import UseCase from '@shared/core/UseCase';
import InputData from './InputData';
import OutputData from './OutputData';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IJWTProvider from '@shared/providers/JsonWebToken/IJWTProvider';
import IAbstractFactory from './IAbstractFactory';
import CustomError from '@shared/errors/Errors';
import EErrorType from '@shared/core/ErrorsType';
import DatabaseFactory from './DatabaseFactory';
import { compare } from 'bcryptjs';

interface IUserData {
  id: number;
  name: string;
  passwordHash: string;
}
class CreateSession implements UseCase<InputData, OutputData> {
  public readonly userRepository: IUserRepository;

  public readonly jwtProvider: IJWTProvider;

  constructor(repository: IAbstractFactory) {
    this.userRepository = repository.createUserRepository();
    this.jwtProvider = repository.createJWTProvider();
  }

  public async execute(inputData: InputData): Promise<OutputData> {
    const user = await this.verifyUser(inputData.email);
    await this.verifyAuthenticate({
      password: inputData.password,
      passwordHash: user.passwordHash,
    });
    const token = this.generateToken({ userId: user.id, userName: user.name });
    const response = new OutputData({ token });
    return response;
  }

  private generateToken({
    userId,
    userName,
  }: {
    userId: number;
    userName: string;
  }): string {
    const token = this.jwtProvider.generate({
      payload: {
        userId,
        userName,
      },
    });
    return token;
  }

  private async verifyAuthenticate({
    password,
    passwordHash,
  }: {
    password: string;
    passwordHash: string;
  }): Promise<void> {
    const isPasswordValid = await compare(password, passwordHash);
    if (!isPasswordValid) {
      throw new CustomError({
        message: 'Credenciais inválidas!',
        errorType: EErrorType.Authenticate,
      });
    }
  }

  private async verifyUser(email: string): Promise<IUserData> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new CustomError({
        message: 'Credenciais inválidas!',
        errorType: EErrorType.Authenticate,
      });
    }

    return { id: user.id, name: user.name, passwordHash: user.passwordHash };
  }
}

export { InputData, DatabaseFactory };
export default CreateSession;
