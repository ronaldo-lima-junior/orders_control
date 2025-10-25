import { describe, expect, it } from 'vitest';
import MemoryFactory from './MemoryFactory';
import InputData from './InputData';
import { faker } from '@faker-js/faker';
import Order, { EOrderStatus } from '@shared/entities/orders/Orders';
import User from '@shared/entities/users/Users';
import UpdateOrder from '.';
import CustomError from '@shared/errors/Errors';

describe('Update Order Use Case', () => {
  it('should be able to update a order', async () => {
    const id = faker.number.int();
    const userId = faker.number.int();
    const memoryFactory = new MemoryFactory({
      orders: [Order.createRandom({ id })],
      users: [User.createRandom({ id: userId })],
    });

    const inputData = new InputData({
      id: id.toString(),
      description: faker.string.alpha(),
      status: faker.helpers.enumValue(EOrderStatus),
      userId,
    });
    const useCase = new UpdateOrder(memoryFactory);
    const response = await useCase.execute(inputData);
    expect(response).toBeUndefined();
  });

  it('should not be able to update a non register order', async () => {
    const userId = faker.number.int();
    const memoryFactory = new MemoryFactory({
      orders: [],
      users: [User.createRandom({ id: userId })],
    });

    const inputData = new InputData({
      id: faker.number.int().toString(),
      description: faker.string.alpha(),
      status: faker.helpers.enumValue(EOrderStatus),
      userId,
    });

    const useCase = new UpdateOrder(memoryFactory);
    try {
      await useCase.execute(inputData);
    } catch (err) {
      expect(err).toBeInstanceOf(CustomError);
      expect((err as CustomError).message).toBe(
        `Pedido #${inputData.id} não localizado`,
      );
      expect((err as CustomError).statusCode).toBe(409);
    }
  });
});
