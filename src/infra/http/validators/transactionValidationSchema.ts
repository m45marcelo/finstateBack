import { z } from 'zod';
// Schema para parâmetros de ID
export const idParamSchema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID inválido')
  })
  
  // Schema para listar transações (despesas + receitas)
  export const getTransactionsSchema = z.object({
    type: z.enum(['expense', 'income']).optional(),
    description: z.string().trim().optional(),
    category: z.string().optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10)
  })