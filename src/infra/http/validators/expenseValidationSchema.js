"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllExpensesSchema = exports.deleteExpenseSchema = exports.createExpenseSchema = void 0;
const zod_1 = require("zod");
const Expense_1 = require("../../../core/entities/Expense");
const TransactionType = ["income", "expense", "subscription"];
exports.createExpenseSchema = zod_1.z.object({
    description: zod_1.z
        .string()
        .min(1, 'Nome é obrigatório')
        .max(100, 'Nome deve ter no máximo 100 caracteres')
        .trim(),
    value: zod_1.z.number().positive('O valor deve ser maior que zero'),
    category: zod_1.z
        .string()
        .refine((val) => Expense_1.EXPENSE_CATEGORIES.includes(val), {
        message: `Categoria inválida. Opções: ${Expense_1.EXPENSE_CATEGORIES.join(', ')}`,
    }),
});
exports.deleteExpenseSchema = zod_1.z.object({
    id: zod_1.z.string("a transação prescisa ter um id").trim(),
    type: zod_1.z.string()
});
exports.getAllExpensesSchema = zod_1.z.object({
    description: zod_1.z.string().trim().optional(),
    category: zod_1.z.enum(Expense_1.EXPENSE_CATEGORIES).optional(),
    startDate: zod_1.z.coerce.date().optional(),
    endDate: zod_1.z.coerce.date().optional(),
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(100).default(10)
});
