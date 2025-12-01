import { z } from 'zod';
import { BUDGET_CATEGORIES, BUDGET_STATUS } from '../../../core/entities/Budgets';

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
});

export const getBudgetByCategorySchema = z.object({
    status: z
            .refine((val): val is typeof BUDGET_STATUS[number] => 
                BUDGET_STATUS.includes(val as typeof BUDGET_STATUS[number]),
            {
                message: `Opção de status inválida. Opções: ${BUDGET_STATUS.join(', ')}`
            }
            )
})

export const updateBudgetByCategorySchema = z.object({
    limit: z
        .number()
        .positive('O limite deve ser maior que zero')
})