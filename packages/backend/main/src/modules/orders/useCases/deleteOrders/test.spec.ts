import { describe, expect, it } from 'vitest';
import MemoryFactory from './MemoryFactory';
import InputData from './InputData';
import { faker } from '@faker-js/faker';
import Order from '@shared/entities/orders/Orders';
import DeleteOrder from '.';
import CustomError from '@shared/errors/Errors';

describe('Delete Order Use Case', () => {
  it('should be able to delete a order', async () => {
    const id = faker.number.int();
    const memoryFactory = new MemoryFactory({
      orders: [Order.createRandom({ id })],
    });

    const inputData = new InputData({
      id: id.toString(),
    });
    const useCase = new DeleteOrder(memoryFactory);
    const response = await useCase.execute(inputData);
    expect(response).toBeUndefined();
  });

  it('should not be able to delete a non register order', async () => {
    const memoryFactory = new MemoryFactory({
      orders: [],
    });

    const inputData = new InputData({
      id: faker.number.int().toString(),
    });
    const useCase = new DeleteOrder(memoryFactory);
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
