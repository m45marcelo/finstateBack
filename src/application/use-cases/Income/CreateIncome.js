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
exports.CreateIncomeUseCase = void 0;
const errors_1 = require("../../../shared/errors");
class CreateIncomeUseCase {
    constructor(incomeRepository, userRepository) {
        this.incomeRepository = incomeRepository;
        this.userRepository = userRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idUser, description, value, category }) {
            const user = yield this.userRepository.findById(idUser);
            if (!user) {
                throw new errors_1.NotFoundError('Usuário não encontrado');
            }
            if (value < 0) {
                throw new errors_1.ValidationError('o Valor deve ser maior que zero');
            }
            const incomeData = {
                idUser,
                description: description.trim(),
                value,
                category
            };
            const income = yield this.incomeRepository.create(incomeData);
            return {
                income
            };
        });
    }
}
exports.CreateIncomeUseCase = CreateIncomeUseCase;
