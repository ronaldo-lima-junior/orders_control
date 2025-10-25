import IUserRepository from '@modules/users/repositories/IUserRepository';
import IAbstractFactory from './IAbstractFactory';
import UserDatabaseRepository from '@modules/users/infra/typeorm/repositories/UserDatabaseRepository';
import IJWTProvider from '@shared/providers/JsonWebToken/IJWTProvider';
import JsonWebTokenProvider from '@shared/providers/JsonWebToken/implementations';

class DatabaseFactory implements IAbstractFactory {
  public createUserRepository(): IUserRepository {
    return new UserDatabaseRepository();
  }

  public createJWTProvider(): IJWTProvider {
    return new JsonWebTokenProvider();
  }
}

export default DatabaseFactory;
