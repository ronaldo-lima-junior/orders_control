import IUserRepository from '@modules/users/repositories/IUserRepository';
import IJWTProvider from '@shared/providers/JsonWebToken/IJWTProvider';

interface IAbstractFactory {
  createUserRepository(): IUserRepository;
  createJWTProvider(): IJWTProvider;
}

export default IAbstractFactory;
