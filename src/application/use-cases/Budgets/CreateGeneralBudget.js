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
exports.CreateGeneralBudgetUseCase = void 0;
const errors_1 = require("../../../shared/errors");
class CreateGeneralBudgetUseCase {
    constructor(generalBudgetRepository, userRepository) {
        this.generalBudgetRepository = generalBudgetRepository;
        this.userRepository = userRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idUser, limit, }) {
            const user = yield this.userRepository.findById(idUser);
            const userHasBudget = yield this.generalBudgetRepository.findByIdUser(idUser);
            if (!user) {
                throw new errors_1.NotFoundError('Usuário não encontrado');
            }
            if (limit <= 0) {
                throw new errors_1.ValidationError('Limite tem que ser maior que zero');
            }
            if (userHasBudget) {
                throw new errors_1.ConflictError('O usuário já possui um orçamento geral');
            }
            const generalBudgetData = {
                idUser,
                limit,
                spent: 0,
                remaining: limit,
                status: 'off'
            };
            const generalBudget = yield this.generalBudgetRepository.create(generalBudgetData);
            return {
                generalBudget,
            };
        });
    }
}
exports.CreateGeneralBudgetUseCase = CreateGeneralBudgetUseCase;
