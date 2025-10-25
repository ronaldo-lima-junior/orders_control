import { EOrderStatus } from '@shared/entities/orders/Orders';
import { NextFunction, Request, Response } from 'express';
import z from 'zod';

class ValidationOrdersController {
  public async create(
    request: Request,
    _: Response,
    next: NextFunction,
  ): Promise<void> {
    const schema = z.object({
      description: z.string().trim().min(1).max(100),
    });

    schema.parse(request.body);
    next();
  }

  public async update(
    request: Request,
    _: Response,
    next: NextFunction,
  ): Promise<void> {
    const schema = z.object({
      description: z.string().trim().min(1).max(100),
      status: z.enum(EOrderStatus),
    });

    schema.parse(request.body);
    next();
  }

  public async createItem(
    request: Request,
    _: Response,
    next: NextFunction,
  ): Promise<void> {
    const schema = z.object({
      product: z.object({
        id: z.number().min(1),
        quantity: z.number().positive(),
        price: z.number().positive(),
      }),
    });

    schema.parse(request.body);
    next();
  }
}

export default ValidationOrdersController;
