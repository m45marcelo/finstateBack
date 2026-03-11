"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBudgetByCategorySchema = exports.getBudgetByCategorySchema = exports.createBudgetByCategorySchema = void 0;
const zod_1 = require("zod");
const Budgets_1 = require("../../../core/entities/Budgets");
exports.createBudgetByCategorySchema = zod_1.z.object({
    limit: zod_1.z
        .number()
        .positive('O limite tem que ser maior que zero'),
    category: zod_1.z
        .string()
        .refine((val) => Budgets_1.BUDGET_CATEGORIES.includes(val), {
        message: `Categoria inválida. Opções: ${Budgets_1.BUDGET_CATEGORIES.join(', ')}`
    })
});
exports.getBudgetByCategorySchema = zod_1.z.object({
    status: zod_1.z
        .refine((val) => Budgets_1.BUDGET_STATUS.includes(val), {
        message: `Opção de status inválida. Opções: ${Budgets_1.BUDGET_STATUS.join(', ')}`
    })
});
exports.updateBudgetByCategorySchema = zod_1.z.object({
    limit: zod_1.z
        .number()
        .positive('O limite deve ser maior que zero')
});
