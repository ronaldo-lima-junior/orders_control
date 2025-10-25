import { describe, expect, it } from 'vitest';
import MemoryFactory from './MemoryFactory';
import InputData from './InputData';
import { faker } from '@faker-js/faker';
import User from '@shared/entities/users/Users';
import CreateOrder from '.';
import CustomError from '@shared/errors/Errors';

describe('Create Order Use Case', () => {
  it('should be able to register a order', async () => {
    const userId = faker.number.int();
    const memoryFactory = new MemoryFactory({
      orders: [],
      users: [User.createRandom({ id: userId })],
    });

    const inputData = new InputData({
      description: faker.string.alpha(),
      userId,
    });
    const useCase = new CreateOrder(memoryFactory);
    const response = await useCase.execute(inputData);
    expect(response).toBeUndefined();
  });

  it('should not be able to register a order with a non register user', async () => {
    const memoryFactory = new MemoryFactory({
      orders: [],
      users: [],
    });

    const inputData = new InputData({
      description: faker.string.alpha(),
      userId: faker.number.int(),
    });
    const useCase = new CreateOrder(memoryFactory);
    try {
      await useCase.execute(inputData);
    } catch (err) {
      expect(err).toBeInstanceOf(CustomError);
      expect((err as CustomError).message).toBe(
        `Usuário #${inputData.userId} não localizado`,
      );
      expect((err as CustomError).statusCode).toBe(409);
    }
  });
});
