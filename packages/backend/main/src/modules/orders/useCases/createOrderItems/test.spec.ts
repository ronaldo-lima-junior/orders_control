import { describe, expect, it } from 'vitest';
import MemoryFactory from './MemoryFactory';
import InputData from './InputData';
import { faker } from '@faker-js/faker';
import Order, { EOrderStatus } from '@shared/entities/orders/Orders';
import Product from '@shared/entities/products/Products';
import CreateOrderItem from '.';
import CustomError from '@shared/errors/Errors';

describe('Create Order Item Use Case', () => {
  it('should be able to register a order item', async () => {
    const orderId = faker.number.int();
    const productId = faker.number.int();
    const memoryFactory = new MemoryFactory({
      orders: [Order.createRandom({ id: orderId, status: EOrderStatus.open })],
      products: [Product.createRandom({ id: productId })],
    });

    const inputData = new InputData({
      orderId: orderId.toString(),
      product: {
        id: productId,
        price: faker.number.int(),
        quantity: 1,
      },
    });
    const useCase = new CreateOrderItem(memoryFactory);
    const response = await useCase.execute(inputData);
    expect(response).toBeUndefined();
  });

  it('should be able to register a order item with a non register order', async () => {
    const orderId = faker.number.int();
    const productId = faker.number.int();
    const memoryFactory = new MemoryFactory({
      orders: [Order.createRandom({ id: orderId, status: EOrderStatus.send })],
      products: [Product.createRandom({ id: productId })],
    });

    const inputData = new InputData({
      orderId: orderId.toString(),
      product: {
        id: productId,
        price: faker.number.int(),
        quantity: 1,
      },
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

  it('should be able to register a order item with a non opened order', async () => {
    const orderId = faker.number.int();
    const productId = faker.number.int();
    const memoryFactory = new MemoryFactory({
      orders: [],
      products: [Product.createRandom({ id: productId })],
    });

    const inputData = new InputData({
      orderId: orderId.toString(),
      product: {
        id: productId,
        price: faker.number.int(),
        quantity: 1,
      },
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

  it('should not be able to register a order item whith a non register product', async () => {
    const orderId = faker.number.int();
    const productId = faker.number.int();
    const memoryFactory = new MemoryFactory({
      orders: [Order.createRandom({ id: orderId, status: EOrderStatus.open })],
      products: [],
    });

    const inputData = new InputData({
      orderId: orderId.toString(),
      product: {
        id: productId,
        price: faker.number.int(),
        quantity: 1,
      },
    });
    const useCase = new CreateOrderItem(memoryFactory);
    try {
      await useCase.execute(inputData);
    } catch (err) {
      expect(err).toBeInstanceOf(CustomError);
      expect((err as CustomError).message).toBe(
        `Produto #${productId} não localizado`,
      );
      expect((err as CustomError).statusCode).toBe(409);
    }
  });

  it('should not be able to register a order item whith a product without stock', async () => {
    const orderId = faker.number.int();
    const productId = faker.number.int();
    const memoryFactory = new MemoryFactory({
      orders: [Order.createRandom({ id: orderId, status: EOrderStatus.open })],
      products: [Product.createRandom({ id: productId, quantity: 0 })],
    });

    const inputData = new InputData({
      orderId: orderId.toString(),
      product: {
        id: productId,
        price: faker.number.int(),
        quantity: 1,
      },
    });
    const useCase = new CreateOrderItem(memoryFactory);
    try {
      await useCase.execute(inputData);
    } catch (err) {
      expect(err).toBeInstanceOf(CustomError);
      expect((err as CustomError).message).toBe(
        `Produto #${productId} com estoque insuficiente`,
      );
      expect((err as CustomError).statusCode).toBe(409);
    }
  });
});
