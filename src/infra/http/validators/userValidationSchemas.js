"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSchema = exports.AuthenticateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, 'Nome deve ter pelo menos 2 caracteres')
        .max(100, 'Nome deve ter no maxímo 100 caracteres')
        .trim(),
    email: zod_1.z
        .string()
        .toLowerCase()
        .trim()
        .pipe(zod_1.z.string().email('Email inválido')),
    password: zod_1.z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});
exports.AuthenticateUserSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .toLowerCase()
        .trim()
        .pipe(zod_1.z.string().email('Email inválido')),
    password: zod_1.z.string().min(1, 'Senha é obrigatória'),
});
exports.UpdateUserSchema = zod_1.z.object({
    id: zod_1.z
        .string(),
    name: zod_1.z
        .string()
        .min(1, "Nome deve ter pelo menos 1 caractere")
        .max(100, "Nome deve ter no máximo 100 caracteres")
        .optional(),
    email: zod_1.z
        .string()
        .toLowerCase()
        .trim()
        .pipe(zod_1.z.string().email('Email inválido')),
});
