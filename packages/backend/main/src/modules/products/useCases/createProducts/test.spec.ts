import { describe, expect, it } from 'vitest';
import MemoryFactory from './MemoryFactory';
import InputData from './InputData';
import { faker } from '@faker-js/faker';
import CreateProduct from '.';

describe('Create Product Use Case', () => {
  it('should be able to register a product', async () => {
    const memoryFactory = new MemoryFactory({
      products: [],
    });
    const inputData = new InputData({
      category: faker.string.alpha(),
      description: faker.string.alpha(),
      price: faker.number.int(),
      quantity: faker.number.int(),
    });
    const useCase = new CreateProduct(memoryFactory);
    const response = await useCase.execute(inputData);
    expect(response).toBeUndefined();
  });
});
