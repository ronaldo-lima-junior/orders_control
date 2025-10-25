import User from '@shared/entities/users/Users';
import IAbstractFactory from './IAbstractFactory';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserMemoryRepository from '@modules/users/repositories/fakes/UserMemoryRepository';

class MemoryFactory implements IAbstractFactory {
  private readonly users: User[];

  constructor({ users }: { users: User[] }) {
    this.users = users;
  }

  public createUserRepository(): IUserRepository {
    return new UserMemoryRepository({ users: this.users });
  }
}

export default MemoryFactory;
