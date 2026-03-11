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
exports.UpdateSubscriptionUseCase = void 0;
const errors_1 = require("../../../shared/errors");
class UpdateSubscriptionUseCase {
    constructor(subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, description, value, frequency, status, startDate, category, nextPay }) {
            const subscription = yield this.subscriptionRepository.findById(id);
            if (!subscription) {
                throw new errors_1.NotFoundError('Despesa recorrente não encontrada');
            }
            if (value) {
                if (value < 0) {
                    throw new errors_1.ValidationError('O valor tem que ser maior que zero');
                }
            }
            const updateSubscriptionData = {
                description,
                value,
                frequency,
                status,
                startDate,
                category,
                nextPay
            };
            const newSubscription = yield this.subscriptionRepository.update(id, updateSubscriptionData);
            return {
                newSubscription
            };
        });
    }
}
exports.UpdateSubscriptionUseCase = UpdateSubscriptionUseCase;
