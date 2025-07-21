import { z } from 'zod';

const categoriasDespesa = ['Alimantação', 'Moradia', 'Transporte', 'Lazer', 'Saúde', 'Outros'] as const;
const categoriasReceita = ['Salário', 'Freelancer', 'Investimentos', 'Outros'] as const;

export const transactionSchema = z.object({
    type: z.enum(['Receita', 'Despesa']),
    description: z.string().min(1, 'Descrição é obrigatória'),
    value: z.number().positive('O valor deve ser positivo'),
    category: z.string(),
    date: z.coerce.date().optional()
}).superRefine((data, ctx) => {
    

    if(data.type === 'Despesa' && categoriasDespesa.includes(data.category as any)) {
        ctx.addIssue({
            path: ['category'],
            message: `Categoria ${data.category} inválida`,
        });
    }
    if(data.type === 'Receita' && categoriasReceita.includes(data.category as any)) {
        ctx.addIssue({
            path: ['category'],
            message: `Categoria ${data.category} inválida`,
        });
    }
});

export type TransactionDTI = z.infer<typeof TransformStream>;