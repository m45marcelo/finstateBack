import { z } from 'zod';
import { INCOME_CATEGORIES } from '../../../core/entities/Income';
export const createIncomeSchema = z.object({
    name: z
        .string()
        .min(1, 'Nome é obrigatório')
        .max(100, 'Nome deve ter no maximo 100 caracters')
        .trim(),
    value: z
        .number()
        .positive('Valor deve ser maior que zero'),
    category: z
        .string()
        .refine((val): val is typeof INCOME_CATEGORIES[number] => 
            INCOME_CATEGORIES.includes(val as typeof INCOME_CATEGORIES[number]),
        {
            message: `Categoria inválida, opções: ${INCOME_CATEGORIES.join(', ')}`,
        }
        )
})

export const getAllIncomesSchema = z.object({
    category: z.enum(INCOME_CATEGORIES).optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional()
})


 // idUser: string;
    // name: string;
    // value: number;
    // category: IncomeCategory;