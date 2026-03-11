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
exports.CreateBudgetByCategoryUseCase = void 0;
const errors_1 = require("../../../shared/errors");
class CreateBudgetByCategoryUseCase {
    constructor(budgetByCategoryRepository, userRepository) {
        this.budgetByCategoryRepository = budgetByCategoryRepository;
        this.userRepository = userRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idUser, category, limit }) {
            const filter = {
                idUser,
                category
            };
            const user = yield this.userRepository.findById(idUser);
            if (!user) {
                throw new errors_1.NotFoundError('Usuário não encontrado');
            }
            const userHasBudgetInCategory = yield this.budgetByCategoryRepository.findMany(filter);
            if (userHasBudgetInCategory.length > 0) {
                throw new errors_1.ConflictError("Já existe um orçamento feito com essa categoria");
            }
            if (limit < 0) {
                throw new errors_1.ValidationError('O limite tem que ser maior que zero');
            }
            const budgetByCategoryData = {
                idUser,
                category,
                limit,
                spent: 0,
                remaining: limit,
                status: "off",
            };
            const budgetByCategory = yield this.budgetByCategoryRepository.create(budgetByCategoryData);
            return {
                budgetByCategory
            };
        });
    }
}
exports.CreateBudgetByCategoryUseCase = CreateBudgetByCategoryUseCase;
