import { z } from 'zod';
import {
    SUBSCRIPTION_CATEGORIES,
    SUBSCRIPTION_FREQUENCIES,
} from '../../../core/entities/Subscription';

export const createSubscriptionSchema = z.object({
    name: z
        .string()
        .min(1, 'Nome é obrigatório')
        .max(100, 'Nove deve ter no maxímo 100 caracteres ')
        .trim(),
    value: z.number().positive('Valor deve ser maior que zero'),
    frequency: z
        .string()
        .refine(
            (val): val is (typeof SUBSCRIPTION_FREQUENCIES)[number] =>
                SUBSCRIPTION_FREQUENCIES.includes(
                    val as (typeof SUBSCRIPTION_FREQUENCIES)[number],
                ),
            {
                message: `Frequência inválida, opções: ${SUBSCRIPTION_FREQUENCIES.join(', ')}`,
            },
        ),
    category: z
        .string()
        .refine(
            (val): val is (typeof SUBSCRIPTION_CATEGORIES)[number] =>
                SUBSCRIPTION_CATEGORIES.includes(
                    val as (typeof SUBSCRIPTION_CATEGORIES)[number],
                ),
            {
                message: `Categoria inválida, opções: ${SUBSCRIPTION_CATEGORIES.join(', ')}`,
            },
        ),
    nextPay: z.coerce.date()
});

