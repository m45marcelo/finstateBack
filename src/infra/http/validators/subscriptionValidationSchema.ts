import { z } from 'zod';
import {
    SUBSCRIPTION_CATEGORIES,
    SUBSCRIPTION_FREQUENCIES,
    SUBSCRIPTION_STATUS,
} from '../../../core/entities/Subscription';

export const createSubscriptionSchema = z.object({
    description: z
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
    startDate: z.coerce.date(),
    nextPay: z.coerce.date()
});

export const updateSubscriptionSchema = z.object({
    id: z
        .string(),
    description: z
        .string()
        .min(1, 'A descrição deve ter ao menos 1 caractere')
        .max(100, 'A descrição deve ter no maxímo 100 caracteres ')
        .trim()
        .optional(),
    value: z.number().positive('Valor deve ser maior que zero').optional(),
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
        )
        .optional(),
    status: z
        .string()
        .refine(
            (val): val is (typeof SUBSCRIPTION_STATUS)[number] =>
                SUBSCRIPTION_STATUS.includes(
                    val as (typeof SUBSCRIPTION_STATUS)[number]
                ),
            {
                message: `Status inválido, opções: ${SUBSCRIPTION_STATUS.join(', ')}`
            }
        )
        .optional(),
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
        )
        .optional(),
    startDate: z.coerce.date().optional(),
    nextPay: z.coerce.date().optional()
});

export const getAllSubscriptionsSchema = z.object({
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional()
})