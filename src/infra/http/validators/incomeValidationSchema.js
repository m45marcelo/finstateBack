"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllIncomesSchema = exports.createIncomeSchema = void 0;
const zod_1 = require("zod");
const Income_1 = require("../../../core/entities/Income");
exports.createIncomeSchema = zod_1.z.object({
    description: zod_1.z
        .string()
        .min(1, 'Nome é obrigatório')
        .max(100, 'Nome deve ter no maximo 100 caracters')
        .trim(),
    value: zod_1.z
        .number()
        .positive('Valor deve ser maior que zero'),
    category: zod_1.z
        .string()
        .refine((val) => Income_1.INCOME_CATEGORIES.includes(val), {
        message: `Categoria inválida, opções: ${Income_1.INCOME_CATEGORIES.join(', ')}`,
    })
});
exports.getAllIncomesSchema = zod_1.z.object({
    description: zod_1.z.string().trim().optional(),
    category: zod_1.z.enum(Income_1.INCOME_CATEGORIES).optional(),
    startDate: zod_1.z.coerce.date().optional(),
    endDate: zod_1.z.coerce.date().optional(),
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(100).default(10)
});
