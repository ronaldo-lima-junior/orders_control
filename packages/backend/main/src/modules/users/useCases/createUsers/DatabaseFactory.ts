import IUserRepository from '@modules/users/repositories/IUserRepository';
import IAbstractFactory from './IAbstractFactory';
import UserDatabaseRepository from '@modules/users/infra/typeorm/repositories/UserDatabaseRepository';

class DatabaseFactory implements IAbstractFactory {
  public createUserRepository(): IUserRepository {
    return new UserDatabaseRepository();
  }
}

export default DatabaseFactory;
