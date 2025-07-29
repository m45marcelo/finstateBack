import {  z } from 'zod';
import { EXPENSE_CATEGORIES } from '../../../core/entities/Expense';
export const createExpenseSchema = z.object({
    name: z
        .string()
        .min(1, 'Nome é obrigatório')
        .max(100, 'Nome deve ter no máximo 100 caracteres')
        .trim(),
    value: z.number().positive('Valor deve ser maior que zero'),
    category: z
        .string()
        .refine((val): val is typeof EXPENSE_CATEGORIES[number] => 
            EXPENSE_CATEGORIES.includes(val as typeof EXPENSE_CATEGORIES[number]), 
        {
            message: `Categoria inválida. Opções: ${EXPENSE_CATEGORIES.join(', ')}`,
        }
    ),
});

export const getAllExpensesSchema = z.object({
    category: z.enum(EXPENSE_CATEGORIES).optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional()
})