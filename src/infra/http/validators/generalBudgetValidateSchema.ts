import { z } from 'zod';


export const createGeneralBudgetSchema = z.object({
    limit: z
        .number()
        .positive('O Valor tem que ser maior que zero')
})
