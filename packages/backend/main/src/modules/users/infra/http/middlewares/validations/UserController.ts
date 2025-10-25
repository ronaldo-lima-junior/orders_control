import { NextFunction, Request, Response } from 'express';
import z from 'zod';

class ValidationUsersController {
  public async execute(
    request: Request,
    _: Response,
    next: NextFunction,
  ): Promise<void> {
    const schema = z.object({
      name: z.string().trim().min(1).max(100),
      email: z.email({ message: 'E-mail inválido' }),
      password: z.string().trim().min(4).max(100),
      document: z
        .string()
        .trim()
        .min(11)
        .max(14)
        .regex(/^\d+$/g, { message: 'Informe apenas números' }),
    });

    schema.parse(request.body);
    next();
  }
}

export default ValidationUsersController;
