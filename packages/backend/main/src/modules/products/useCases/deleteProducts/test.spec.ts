import { describe, expect, it } from 'vitest';
import MemoryFactory from './MemoryFactory';
import { faker } from '@faker-js/faker';
import Product from '@shared/entities/products/Products';
import DeleteProduct, { InputData } from '.';
import CustomError from '@shared/errors/Errors';

describe('Delete Product Use Case', () => {
  it('should be able to delete a product', async () => {
    const id = faker.number.int();
    const memoryFactory = new MemoryFactory({
      products: [Product.createRandom({ id })],
    });
    const useCase = new DeleteProduct(memoryFactory);
    const inputData = new InputData({ id: String(id) });
    const response = await useCase.execute(inputData);
    expect(response).toBeUndefined();
  });

  it('should not be able to delete a non register product', async () => {
    const id = faker.number.int();
    const memoryFactory = new MemoryFactory({ products: [] });
    const useCase = new DeleteProduct(memoryFactory);
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
