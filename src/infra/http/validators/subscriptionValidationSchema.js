"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSubscriptionsSchema = exports.updateSubscriptionSchema = exports.createSubscriptionSchema = void 0;
const zod_1 = require("zod");
const Subscription_1 = require("../../../core/entities/Subscription");
exports.createSubscriptionSchema = zod_1.z.object({
    description: zod_1.z
        .string()
        .min(1, 'Nome é obrigatório')
        .max(100, 'Nove deve ter no maxímo 100 caracteres ')
        .trim(),
    value: zod_1.z.number().positive('Valor deve ser maior que zero'),
    frequency: zod_1.z
        .string()
        .refine((val) => Subscription_1.SUBSCRIPTION_FREQUENCIES.includes(val), {
        message: `Frequência inválida, opções: ${Subscription_1.SUBSCRIPTION_FREQUENCIES.join(', ')}`,
    }),
    category: zod_1.z
        .string()
        .refine((val) => Subscription_1.SUBSCRIPTION_CATEGORIES.includes(val), {
        message: `Categoria inválida, opções: ${Subscription_1.SUBSCRIPTION_CATEGORIES.join(', ')}`,
    }),
    startDate: zod_1.z.coerce.date(),
    nextPay: zod_1.z.coerce.date()
});
exports.updateSubscriptionSchema = zod_1.z.object({
    id: zod_1.z
        .string(),
    description: zod_1.z
        .string()
        .min(1, 'A descrição deve ter ao menos 1 caractere')
        .max(100, 'A descrição deve ter no maxímo 100 caracteres ')
        .trim()
        .optional(),
    value: zod_1.z.number().positive('Valor deve ser maior que zero').optional(),
    frequency: zod_1.z
        .string()
        .refine((val) => Subscription_1.SUBSCRIPTION_FREQUENCIES.includes(val), {
        message: `Frequência inválida, opções: ${Subscription_1.SUBSCRIPTION_FREQUENCIES.join(', ')}`,
    })
        .optional(),
    status: zod_1.z
        .string()
        .refine((val) => Subscription_1.SUBSCRIPTION_STATUS.includes(val), {
        message: `Status inválido, opções: ${Subscription_1.SUBSCRIPTION_STATUS.join(', ')}`
    })
        .optional(),
    category: zod_1.z
        .string()
        .refine((val) => Subscription_1.SUBSCRIPTION_CATEGORIES.includes(val), {
        message: `Categoria inválida, opções: ${Subscription_1.SUBSCRIPTION_CATEGORIES.join(', ')}`,
    })
        .optional(),
    startDate: zod_1.z.coerce.date().optional(),
    nextPay: zod_1.z.coerce.date().optional()
});
exports.getAllSubscriptionsSchema = zod_1.z.object({
    startDate: zod_1.z.coerce.date().optional(),
    endDate: zod_1.z.coerce.date().optional()
});
