import { email, z } from 'zod';
export const createUserSchema = z.object({
    name: z
        .string()
        .min(2, 'Nome deve ter pelo menos 2 caracteres')
        .max(100, 'Nome deve ter no maxímo 100 caracteres')
        .trim(),
    email: z
        .string()
        .toLowerCase()
        .trim()
        .pipe(z.string().email('Email inválido')),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export const AuthenticateUserSchema = z.object({
    email: z
        .string()
        .toLowerCase()
        .trim()
        .pipe(z.string().email('Email inválido')),
    password: z.string().min(1, 'Senha é obrigatória'),
});
