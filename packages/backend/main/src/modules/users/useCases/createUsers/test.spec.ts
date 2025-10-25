import { describe, expect, it } from 'vitest';
import MemoryFactory from './MemoryFactory';
import InputData from './InputData';
import { faker } from '@faker-js/faker';
import CreateUser from '.';
import CustomError from '@shared/errors/Errors';
import User from '@shared/entities/users/Users';

describe('Create User Use Case', () => {
  it('should be able to register a user', async () => {
    const memoryFactory = new MemoryFactory({
      users: [],
    });
    const sut = new InputData({
      name: faker.person.fullName(),
      document: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.string.uuid(),
    });
    const useCase = new CreateUser(memoryFactory);
    const response = await useCase.execute(sut);
    expect(response).toBeUndefined();
  });

  it('should not be able to register with same email twice', async () => {
    const email = faker.internet.email();
    const memoryFactory = new MemoryFactory({
      users: [User.createRandom({ email })],
    });

    const useCase = new CreateUser(memoryFactory);
    const inputData = new InputData({
      name: faker.person.fullName(),
      document: faker.person.firstName(),
      email,
      password: faker.string.uuid(),
    });

    try {
      await useCase.execute(inputData);
    } catch (err) {
      expect(err).toBeInstanceOf(CustomError);
      expect((err as CustomError).message).toBe(
        `E-mail ${inputData.email} já cadastrado`,
      );
      expect((err as CustomError).statusCode).toBe(409);
    }
  });

  it('should not be able to register with same document twice', async () => {
    const document = faker.internet.email();
    const memoryFactory = new MemoryFactory({
      users: [User.createRandom({ document })],
    });

    const useCase = new CreateUser(memoryFactory);
    const inputData = new InputData({
      name: faker.person.fullName(),
      document,
      email: faker.internet.email(),
      password: faker.string.uuid(),
    });

    try {
      await useCase.execute(inputData);
    } catch (err) {
      expect(err).toBeInstanceOf(CustomError);
      expect((err as CustomError).message).toBe(
        `CPF/CNPJ ${document} já cadastrado`,
      );
      expect((err as CustomError).statusCode).toBe(409);
    }
  });
});
