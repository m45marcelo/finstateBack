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
exports.CreateExpenseUseCase = void 0;
const errors_1 = require("../../../shared/errors");
const UpdateGeneralBudget_1 = require("../Budgets/UpdateGeneralBudget");
class CreateExpenseUseCase {
    constructor(expenseRepository, userRepository, generalBudgetRepository) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
        this.generalBudgetRepository = generalBudgetRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idUser, description, value, category, }) {
            const user = yield this.userRepository.findById(idUser);
            const generalBudget = yield this.generalBudgetRepository.findByIdUser(idUser);
            if (!user) {
                throw new errors_1.NotFoundError('Usuário não encontrado');
            }
            if (value < 0) {
                throw new errors_1.ValidationError('O valor deve ser maior que zero');
            }
            const expenseData = {
                idUser,
                description: description.trim(),
                value,
                category,
            };
            if (generalBudget) {
                const updateGeneralBudgetUseCase = new UpdateGeneralBudget_1.UpdateGeneralBudgetUseCase(this.generalBudgetRepository);
                const spent = generalBudget.spent + value;
                const remaining = generalBudget.limit - spent;
                let status = 'off';
                if (spent > generalBudget.limit)
                    status = 'exceeded';
                else if (spent < generalBudget.limit)
                    status = 'free';
                else
                    status = 'achieved';
                yield updateGeneralBudgetUseCase.execute({
                    idUser,
                    spent,
                    remaining,
                    status,
                });
            }
            const expense = yield this.expenseRepository.create(expenseData);
            return {
                expense,
            };
        });
    }
}
exports.CreateExpenseUseCase = CreateExpenseUseCase;
