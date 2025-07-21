import { z } from 'zod';

import dontenv from 'dotenv';

dontenv.config();

const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
});

export type Env = z.infer<typeof envSchema>

const parsedEnv = envSchema.safeParse(process.env);

if(!parsedEnv.success) {
    console.error('❌ Variável de ambiente inválida:', parsedEnv.error.issues,);
    throw new Error('Variáveis de ambiente inválidas');
}

export const env = parsedEnv.data;