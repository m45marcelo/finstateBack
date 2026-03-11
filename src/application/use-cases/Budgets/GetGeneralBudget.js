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
exports.GetGeneralBudgetUseCase = void 0;
const errors_1 = require("../../../shared/errors");
class GetGeneralBudgetUseCase {
    constructor(generalBudgetRepository) {
        this.generalBudgetRepository = generalBudgetRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idUser, }) {
            const generalBudget = yield this.generalBudgetRepository.findByIdUser(idUser);
            if (!generalBudget) {
                throw new errors_1.NotFoundError('O Usuário ainda não tem um orçamento geral criado');
            }
            return {
                generalBudget,
            };
        });
    }
}
exports.GetGeneralBudgetUseCase = GetGeneralBudgetUseCase;
