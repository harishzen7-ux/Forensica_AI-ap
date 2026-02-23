dotenv.config();
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  JWT_SECRET: z.string().default('super-secret-key-change-me'),
  DB_PATH: z.string().default('forensica.db'),
});

export const env = envSchema.parse(process.env);
