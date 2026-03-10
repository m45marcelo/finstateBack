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
exports.DeleteExpenseUseCase = void 0;
const errors_1 = require("../../../shared/errors");
class DeleteExpenseUseCase {
    constructor(expenseRepository) {
        this.expenseRepository = expenseRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idUser, id }) {
            const existingExpense = yield this.expenseRepository.findById(id);
            if ((existingExpense === null || existingExpense === void 0 ? void 0 : existingExpense.idUser) !== idUser) {
                throw new errors_1.UnauthorizedError("Ocorreu um erro ao tentar deletar essa transação");
            }
            if (!existingExpense) {
                throw new errors_1.ConflictError('Despesa não encontrada');
            }
            yield this.expenseRepository.delete(id);
            return { message: "Transação deletada com sucesso" };
        });
    }
}
exports.DeleteExpenseUseCase = DeleteExpenseUseCase;
