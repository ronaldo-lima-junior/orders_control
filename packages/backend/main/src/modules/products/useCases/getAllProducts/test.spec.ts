import { describe, expect, it } from 'vitest';
import MemoryFactory from './MemoryFactory';
import Product from '@shared/entities/products/Products';
import GetAllProduct, { InputData } from '.';
import { faker } from '@faker-js/faker';

describe('Get All Products Use Case', () => {
  it('should be able to fetch products', async () => {
    const memoryFactory = new MemoryFactory({
      products: [Product.createRandom(), Product.createRandom()],
    });
    const useCase = new GetAllProduct(memoryFactory);
    const inputData = new InputData({});
    const response = await useCase.execute(inputData);
    expect(response.list.length).toEqual(2);
    expect(response.list).toContainEqual({
      id: expect.any(Number),
      description: expect.any(String),
      category: expect.any(String),
      price: expect.any(Number),
      quantity: expect.any(Number),
    });
  });

  it('should be able to fetch products with description filter', async () => {
    const description = faker.commerce.productName();
    const memoryFactory = new MemoryFactory({
      products: [Product.createRandom({ description }), Product.createRandom()],
    });
    const useCase = new GetAllProduct(memoryFactory);
    const inputData = new InputData({ description });
    const response = await useCase.execute(inputData);
    expect(response.list.length).toEqual(1);
    expect(response.list).toContainEqual({
      id: expect.any(Number),
      description,
      category: expect.any(String),
      price: expect.any(Number),
      quantity: expect.any(Number),
    });
  });

  it('should be able to fetch products with category filter', async () => {
    const category = faker.commerce.productName();
    const memoryFactory = new MemoryFactory({
      products: [Product.createRandom({ category }), Product.createRandom()],
    });
    const useCase = new GetAllProduct(memoryFactory);
    const inputData = new InputData({ category });
    const response = await useCase.execute(inputData);
    expect(response.list.length).toEqual(1);
    expect(response.list).toContainEqual({
      id: expect.any(Number),
      description: expect.any(String),
      category,
      price: expect.any(Number),
      quantity: expect.any(Number),
    });
  });
});
