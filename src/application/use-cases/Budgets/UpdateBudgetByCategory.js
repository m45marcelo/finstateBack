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
exports.UpdateBudgetByCategoryUseCase = void 0;
const errors_1 = require("../../../shared/errors");
class UpdateBudgetByCategoryUseCase {
    constructor(budgetByCategoryRepository) {
        this.budgetByCategoryRepository = budgetByCategoryRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idUser, idBudget, limit, spent, remaining, status, }) {
            const theBudgetExist = yield this.budgetByCategoryRepository.findById(idBudget);
            if (!theBudgetExist) {
                throw new errors_1.NotFoundError('Orçamento não encontrado');
            }
            const updateBudgetByCategoryData = {
                limit,
                spent,
                remaining,
                status,
            };
            const newBudgetByCategory = yield this.budgetByCategoryRepository.update(idBudget, updateBudgetByCategoryData);
            return {
                newBudgetByCategory
            };
        });
    }
}
exports.UpdateBudgetByCategoryUseCase = UpdateBudgetByCategoryUseCase;
