import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(3333),
  DATABASE_HOST: z.string().min(1),
  DATABASE_PORT: z.coerce.number().default(5432),
  DATABASE_USER: z.string().min(1),
  DATABASE_PASSWORD: z.string().min(1),
  DATABASE_NAME: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  TOKEN_ASAAS: z.string().min(1),
  URL_ASAAS: z.url({ message: 'URL ASAAS inválida' }),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Varíaveis de ambiente inválidas', _env.error.format());

  throw new Error('Varíaveis de ambiente inválidas');
}

export const env = _env.data;
