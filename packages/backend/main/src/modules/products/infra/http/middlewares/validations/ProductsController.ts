import { NextFunction, Request, Response } from 'express';
import z from 'zod';

class ValidationProductsController {
  public async create(
    request: Request,
    _: Response,
    next: NextFunction,
  ): Promise<void> {
    const schema = z.object({
      description: z.string().trim().min(1).max(100),
      category: z.string().trim().min(1).max(100),
      price: z.number().positive(),
      quantity: z.number().positive(),
    });
    schema.parse(request.body);
    next();
  }
}

export default ValidationProductsController;
