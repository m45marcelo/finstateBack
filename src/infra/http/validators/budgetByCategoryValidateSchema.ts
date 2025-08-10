import { z } from 'zod';
import { BUDGET_CATEGORIES } from '../../../core/entities/Budgets';

export const createBudgetByCategorySchema = z.object({
    limit: z
        .number()
        .positive('O limite tem que ser maior que zero'),
    category: z
        .string()
        .refine((val): val is typeof BUDGET_CATEGORIES[number] =>
            BUDGET_CATEGORIES.includes(val as typeof BUDGET_CATEGORIES[number]),
        {
            message: `Categoria inválida. Opções: ${BUDGET_CATEGORIES.join(', ')}`
        }
        )
})