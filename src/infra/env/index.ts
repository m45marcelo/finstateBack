import { z } from 'zod';

import dontenv from 'dotenv';

dontenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
    CLOUDINARY_CLOUD_NAME: z.string(),
    CLOUDINARY_API_KEY: z.string(),
    CLOUDINARY_API_SECRET: z.string(),
    UPSTASH_REDIS_REST_URL: z.string(),
    UPSTASH_REDIS_REST_TOKEN: z.string()
});

export type Env = z.infer<typeof envSchema>

const parsedEnv = envSchema.safeParse(process.env);

if(!parsedEnv.success) {
    console.error('❌ Variável de ambiente inválida:', parsedEnv.error.issues,);
    throw new Error('Variáveis de ambiente inválidas');
}

export const env = parsedEnv.data;