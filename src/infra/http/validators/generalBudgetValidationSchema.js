"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGeneralBudgetSchema = void 0;
const zod_1 = require("zod");
exports.createGeneralBudgetSchema = zod_1.z.object({
    limit: zod_1.z
        .number()
        .positive('O limite tem que ser maior que zero')
});
