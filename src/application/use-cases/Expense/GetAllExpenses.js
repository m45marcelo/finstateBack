"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllExpensesUseCase = void 0;
class GetAllExpensesUseCase {
    constructor(expenseRepository) {
        this.expenseRepository = expenseRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idUser, description, category, startDate, endDate, page = 1, limit = 10 }) {
            let fullEndDate;
            if (endDate) {
                fullEndDate = new Date(endDate);
                fullEndDate.setUTCHours(23, 59, 59, 999);
            }
            const filter = {
                idUser,
                description,
                category,
                startDate: startDate ? new Date(startDate) : undefined,
                endDate: fullEndDate
            };
            const result = yield this.expenseRepository.findManyPaginated(filter, {
                page,
                limit
            });
            // Calcular total das despesas da página atual
            const total = result.data.reduce((sum, expense) => sum + expense.value, 0);
            return {
                expenses: result.data,
                total,
                pagination: result.meta
            };
        });
    }
}
exports.GetAllExpensesUseCase = GetAllExpensesUseCase;
