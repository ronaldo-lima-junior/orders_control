import { NextFunction, Request, Response } from 'express';
import z from 'zod';

class ValidationSessionsController {
  public async create(
    request: Request,
    _: Response,
    next: NextFunction,
  ): Promise<void> {
    const schema = z.object({
      email: z.email({ message: 'E-mail inválido' }).min(1).max(100),
      password: z.string().trim().min(1).max(100),
    });
    schema.parse(request.body);
    next();
  }
}

export default ValidationSessionsController;
