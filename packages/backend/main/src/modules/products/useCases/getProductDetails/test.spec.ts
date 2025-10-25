import { describe, expect, it } from 'vitest';
import MemoryFactory from './MemoryFactory';
import Product from '@shared/entities/products/Products';
import { faker } from '@faker-js/faker';
import GetProductDetails, { InputData } from '.';
import CustomError from '@shared/errors/Errors';

describe('Get Product Use Case', () => {
  it('should be able to find a product', async () => {
    const id = faker.number.int();
    const memoryFactory = new MemoryFactory({
      products: [Product.createRandom({ id }), Product.createRandom()],
    });
    const useCase = new GetProductDetails(memoryFactory);
    const inputData = new InputData({ id: String(id) });
    const response = await useCase.execute(inputData);
    expect(response).toEqual({
      description: expect.any(String),
      price: expect.any(Number),
      category: expect.any(String),
      quantity: expect.any(Number),
      id,
    });
  });

  it('should not be able to find a product when do not exists', async () => {
    const id = faker.number.int();
    const memoryFactory = new MemoryFactory({
      products: [Product.createRandom(), Product.createRandom()],
    });
    const useCase = new GetProductDetails(memoryFactory);
    const inputData = new InputData({ id: String(id) });
    try {
      await useCase.execute(inputData);
    } catch (err) {
      expect(err).toBeInstanceOf(CustomError);
      expect((err as CustomError).message).toBe(
        `Produto #${id} não localizado`,
      );
      expect((err as CustomError).statusCode).toBe(409);
    }
  });
});
