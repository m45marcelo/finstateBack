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
exports.CreateSubscriptionUseCase = void 0;
const errors_1 = require("../../../shared/errors");
class CreateSubscriptionUseCase {
    constructor(subscriptionRepository, userRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idUser, description, value, frequency, category, startDate, nextPay }) {
            const user = yield this.userRepository.findById(idUser);
            if (!user) {
                throw new errors_1.NotFoundError('Usuário não encontrado');
            }
            if (value < 0) {
                throw new errors_1.ValidationError('O valor tem que ser maior que zero');
            }
            const subscriptionData = {
                idUser,
                description: description.trim(),
                value,
                frequency,
                category,
                startDate,
                nextPay,
                status: "Pendente"
            };
            const subscription = yield this.subscriptionRepository.create(subscriptionData);
            return {
                subscription
            };
        });
    }
}
exports.CreateSubscriptionUseCase = CreateSubscriptionUseCase;
