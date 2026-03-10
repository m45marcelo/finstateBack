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
exports.GetAllSubscriptionUseCase = void 0;
class GetAllSubscriptionUseCase {
    constructor(subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idUser, startDate, endDate }) {
            let fullEndDate;
            if (endDate) {
                fullEndDate = new Date(endDate);
                fullEndDate.setUTCHours(23, 59, 59, 999);
            }
            const filter = {
                idUser,
                startDate,
                endDate: fullEndDate
            };
            const subscriptions = yield this.subscriptionRepository.findMany(filter);
            const total = subscriptions.reduce((sum, subscription) => sum + subscription.value, 0);
            return {
                subscriptions,
                total
            };
        });
    }
}
exports.GetAllSubscriptionUseCase = GetAllSubscriptionUseCase;
