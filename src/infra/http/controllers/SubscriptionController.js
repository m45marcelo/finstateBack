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
exports.SubscriptionController = void 0;
const subscriptionValidationSchema_1 = require("../validators/subscriptionValidationSchema");
const MongoSubscriptionRepository_1 = require("../../repositories/MongoSubscriptionRepository");
const MongoUserRepository_1 = require("../../repositories/MongoUserRepository");
const CreateSubscription_1 = require("../../../application/use-cases/Subscription/CreateSubscription");
const GetAllSubscriptions_1 = require("../../../application/use-cases/Subscription/GetAllSubscriptions");
const UpdateSubscription_1 = require("../../../application/use-cases/Subscription/UpdateSubscription");
class SubscriptionController {
    createSubscription(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { description, value, frequency, category, startDate, nextPay } = subscriptionValidationSchema_1.createSubscriptionSchema.parse(request.body);
            const idUser = request.user.id;
            const userRepository = new MongoUserRepository_1.MongoUserRepository();
            const subscriptionRepository = new MongoSubscriptionRepository_1.MongoSubscriptionRepository();
            const createSubscriptionUseCase = new CreateSubscription_1.CreateSubscriptionUseCase(subscriptionRepository, userRepository);
            const result = yield createSubscriptionUseCase.execute({
                idUser,
                description,
                value,
                frequency: frequency,
                category: category,
                startDate,
                nextPay,
            });
            return response.status(200).json(result);
        });
    }
    updateSubscription(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, description, value, status, frequency, category, startDate, nextPay } = subscriptionValidationSchema_1.updateSubscriptionSchema.parse(request.body);
            const subscriptionRepository = new MongoSubscriptionRepository_1.MongoSubscriptionRepository();
            const updateSubscriptionUseCase = new UpdateSubscription_1.UpdateSubscriptionUseCase(subscriptionRepository);
            const result = yield updateSubscriptionUseCase.execute({
                id,
                description,
                value,
                frequency: frequency,
                category: category,
                status: status,
                startDate,
                nextPay
            });
            return response.json(result);
        });
    }
    getAllSubscriptions(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { startDate, endDate } = subscriptionValidationSchema_1.getAllSubscriptionsSchema.parse(request.query);
            const idUser = request.user.id;
            const subscriptionRepository = new MongoSubscriptionRepository_1.MongoSubscriptionRepository();
            const getAllSubscriptionsUseCase = new GetAllSubscriptions_1.GetAllSubscriptionUseCase(subscriptionRepository);
            const result = yield getAllSubscriptionsUseCase.execute({
                idUser,
                startDate,
                endDate
            });
            return response.json(result);
        });
    }
}
exports.SubscriptionController = SubscriptionController;
