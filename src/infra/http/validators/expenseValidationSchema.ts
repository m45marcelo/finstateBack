import {  z } from 'zod';
import { EXPENSE_CATEGORIES } from '../../../core/entities/Expense';

const TransactionType = ["income", "expense", "subscription"] as const
export const createExpenseSchema = z.object({
    description: z
        .string()
        .min(1, 'Nome é obrigatório')
        .max(100, 'Nome deve ter no máximo 100 caracteres')
        .trim(),
    value: z.number().positive('O valor deve ser maior que zero'),
    category: z
        .string()
        .refine((val): val is typeof EXPENSE_CATEGORIES[number] => 
            EXPENSE_CATEGORIES.includes(val as typeof EXPENSE_CATEGORIES[number]), 
        {
            message: `Categoria inválida. Opções: ${EXPENSE_CATEGORIES.join(', ')}`,
        }
    ),
});

export const deleteExpenseSchema = z.object({
    id: z.string("a transação prescisa ter um id").trim(),
    type: z.string()
})

export const getAllExpensesSchema = z.object({
    description: z.string().trim().optional(),
    category: z.enum(EXPENSE_CATEGORIES).optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10)
})
