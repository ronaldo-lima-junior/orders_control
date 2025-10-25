import { describe, expect, it } from 'vitest';
import MemoryFactory from './MemoryFactory';
import InputData from './InputData';
import { faker } from '@faker-js/faker';
import Order, { EOrderStatus } from '@shared/entities/orders/Orders';
import CreateOrderItem from '.';
import CustomError from '@shared/errors/Errors';

describe('Delete Order Item Use Case', () => {
  it('should be able to delete a order item', async () => {
    const orderId = faker.number.int();
    const itemId = faker.number.int();
    const orderItem = [
      {
        id: itemId,
        orderId,
        productId: faker.number.int(),
        productPrice: faker.number.int(),
        productQuantity: faker.number.int(),
        deletedAt: null,
      },
    ];
    const memoryFactory = new MemoryFactory({
      orders: [
        Order.createRandom({
          id: orderId,
          status: EOrderStatus.open,
          items: orderItem,
        }),
      ],
    });

    const inputData = new InputData({
      orderId: orderId.toString(),
      itemId: itemId.toString(),
    });
    const useCase = new CreateOrderItem(memoryFactory);
    const response = await useCase.execute(inputData);
    expect(response).toBeUndefined();
  });

  it('should not be able to delete a order item with a non registered order', async () => {
    const orderId = faker.number.int();
    const itemId = faker.number.int();
    const memoryFactory = new MemoryFactory({
      orders: [],
    });

    const inputData = new InputData({
      orderId: orderId.toString(),
      itemId: itemId.toString(),
    });
    const useCase = new CreateOrderItem(memoryFactory);
    try {
      await useCase.execute(inputData);
    } catch (err) {
      expect(err).toBeInstanceOf(CustomError);
      expect((err as CustomError).message).toBe(
        `Pedido #${orderId} não localizado`,
      );
      expect((err as CustomError).statusCode).toBe(409);
    }
  });

  it('should be able to delete a order item', async () => {
    const orderId = faker.number.int();
    const itemId = faker.number.int();
    const memoryFactory = new MemoryFactory({
      orders: [Order.createRandom({ id: orderId, status: EOrderStatus.send })],
    });

    const inputData = new InputData({
      orderId: orderId.toString(),
      itemId: itemId.toString(),
    });
    const useCase = new CreateOrderItem(memoryFactory);
    try {
      await useCase.execute(inputData);
    } catch (err) {
      expect(err).toBeInstanceOf(CustomError);
      expect((err as CustomError).message).toBe(
        `Pedido #${orderId} já processado, o que impede a sua modificação`,
      );
      expect((err as CustomError).statusCode).toBe(409);
    }
  });
});
