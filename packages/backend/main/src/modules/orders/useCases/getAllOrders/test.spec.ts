import { describe, expect, it } from 'vitest';
import MemoryFactory from './MemoryFactory';
import InputData from './InputData';
import { faker } from '@faker-js/faker';
import Order, { EOrderStatus } from '@shared/entities/orders/Orders';
import GetAllOrders from '../getAllOrders';

describe('Get All Orders Use Case', () => {
  it('should be able to fetch orders', async () => {
    const memoryFactory = new MemoryFactory({
      orders: [Order.createRandom(), Order.createRandom()],
    });

    const useCase = new GetAllOrders(memoryFactory);
    const inputData = new InputData({});
    const response = await useCase.execute(inputData);
    expect(response.list.length).toEqual(2);
    expect(response.list).toContainEqual({
      id: expect.any(Number),
      description: expect.any(String),
      status: expect.any(String),
      registeredAt: expect.any(String),
      user: {
        id: expect.any(Number),
        name: expect.any(String),
      },
    });
  });

  it('should be able to fetch orders with description filter', async () => {
    const filter = faker.string.alpha();
    const memoryFactory = new MemoryFactory({
      orders: [
        Order.createRandom({ description: filter }),
        Order.createRandom(),
      ],
    });

    const useCase = new GetAllOrders(memoryFactory);
    const inputData = new InputData({ description: filter });
    const response = await useCase.execute(inputData);
    expect(response.list.length).toEqual(1);
    expect(response.list).toContainEqual({
      id: expect.any(Number),
      description: filter,
      status: expect.any(String),
      registeredAt: expect.any(String),
      user: {
        id: expect.any(Number),
        name: expect.any(String),
      },
    });
  });

  it('should be able to fetch orders with status filter', async () => {
    const filter = faker.helpers.enumValue(EOrderStatus);
    const memoryFactory = new MemoryFactory({
      orders: [Order.createRandom({ status: filter }), Order.createRandom()],
    });

    const useCase = new GetAllOrders(memoryFactory);
    const inputData = new InputData({ status: filter });
    const response = await useCase.execute(inputData);
    expect(response.list.length).toEqual(1);
    expect(response.list).toContainEqual({
      id: expect.any(Number),
      description: expect.any(String),
      status: filter,
      registeredAt: expect.any(String),
      user: {
        id: expect.any(Number),
        name: expect.any(String),
      },
    });
  });

  it('should be able to fetch orders with status filter', async () => {
    const filter = faker.number.int();
    const memoryFactory = new MemoryFactory({
      orders: [
        Order.createRandom({ user: { id: filter, name: '' } }),
        Order.createRandom(),
      ],
    });

    const useCase = new GetAllOrders(memoryFactory);
    const inputData = new InputData({ userId: filter.toString() });
    const response = await useCase.execute(inputData);
    expect(response.list.length).toEqual(1);
    expect(response.list).toContainEqual({
      id: expect.any(Number),
      description: expect.any(String),
      status: expect.any(String),
      registeredAt: expect.any(String),
      user: {
        id: filter,
        name: expect.any(String),
      },
    });
  });
});
