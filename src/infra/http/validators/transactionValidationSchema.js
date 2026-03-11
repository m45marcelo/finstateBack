"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionsSchema = exports.idParamSchema = void 0;
const zod_1 = require("zod");
// Schema para parâmetros de ID
exports.idParamSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID inválido')
});
// Schema para listar transações (despesas + receitas)
exports.getTransactionsSchema = zod_1.z.object({
    type: zod_1.z.enum(['expense', 'income']).optional(),
    description: zod_1.z.string().trim().optional(),
    category: zod_1.z.string().optional(),
    startDate: zod_1.z.string().datetime().optional(),
    endDate: zod_1.z.string().datetime().optional(),
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(100).default(10)
});
