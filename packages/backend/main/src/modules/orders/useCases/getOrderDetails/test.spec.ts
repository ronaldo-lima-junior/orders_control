import { describe, expect, it } from 'vitest';
import MemoryFactory from './MemoryFactory';
import InputData from './InputData';
import { faker } from '@faker-js/faker';
import Order from '@shared/entities/orders/Orders';
import GetOrderDetails from '.';
import CustomError from '@shared/errors/Errors';

describe('Get Order Use Case', () => {
  it('should be able to find a order', async () => {
    const id = faker.number.int();
    const memoryFactory = new MemoryFactory({
      orders: [Order.createRandom({ id }), Order.createRandom()],
    });

    const useCase = new GetOrderDetails(memoryFactory);
    const inputData = new InputData({ id: String(id) });
    const response = await useCase.execute(inputData);
    expect(response).toEqual({
      id: expect.any(Number),
      description: expect.any(String),
      status: expect.any(String),
      registeredAt: expect.any(String),
      user: {
        id: expect.any(Number),
        name: expect.any(String),
      },
      items: [],
    });
  });

  it('should not be able to find a order when do not exists', async () => {
    const id = faker.number.int();
    const memoryFactory = new MemoryFactory({
      orders: [Order.createRandom(), Order.createRandom()],
    });

    const useCase = new GetOrderDetails(memoryFactory);
    const inputData = new InputData({ id: String(id) });
    try {
      await useCase.execute(inputData);
    } catch (err) {
      expect(err).toBeInstanceOf(CustomError);
      expect((err as CustomError).message).toBe(`Pedido #${id} não localizado`);
      expect((err as CustomError).statusCode).toBe(409);
    }
  });
});
