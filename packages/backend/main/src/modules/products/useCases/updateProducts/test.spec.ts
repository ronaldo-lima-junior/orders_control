import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';
import MemoryFactory from './MemoryFactory';
import Product from '@shared/entities/products/Products';
import UpdateProduct, { InputData } from '.';
import CustomError from '@shared/errors/Errors';

describe('Update Product Use Case', () => {
  it('should be able to update a product', async () => {
    const id = faker.number.int();
    const memoryFactory = new MemoryFactory({
      products: [Product.createRandom({ id })],
    });
    const useCase = new UpdateProduct(memoryFactory);
    const inputData = new InputData({
      category: faker.string.alpha(),
      description: faker.string.alpha(),
      id: String(id),
      price: faker.number.int(),
      quantity: faker.number.int(),
    });
    const response = await useCase.execute(inputData);
    expect(response).toBeUndefined();
  });

  it('should not be able to delete a non register product', async () => {
    const id = faker.number.int();
    const memoryFactory = new MemoryFactory({ products: [] });
    const useCase = new UpdateProduct(memoryFactory);
    const inputData = new InputData({
      category: faker.string.alpha(),
      description: faker.string.alpha(),
      id: String(id),
      price: faker.number.int(),
      quantity: faker.number.int(),
    });

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
