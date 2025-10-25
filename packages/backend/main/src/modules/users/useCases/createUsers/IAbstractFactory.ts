import IUserRepository from '@modules/users/repositories/IUserRepository';

interface IAbstractFactory {
  createUserRepository(): IUserRepository;
}

export default IAbstractFactory;
