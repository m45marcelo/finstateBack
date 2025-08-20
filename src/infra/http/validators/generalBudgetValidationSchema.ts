import { z } from 'zod';


export const createGeneralBudgetSchema = z.object({
    limit: z
        .number()
        .positive('O limite tem que ser maior que zero')
})
