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
exports.TransactionController = void 0;
const GetTransactions_1 = require("../../../application/use-cases/Transaction/GetTransactions");
const MongoExpenseRepository_1 = require("../../../infra/repositories/MongoExpenseRepository");
const MongoIncomeRepository_1 = require("../../../infra/repositories/MongoIncomeRepository");
const transactionValidationSchema_1 = require("../../../infra/http/validators/transactionValidationSchema");
const MongoSubscriptionRepository_1 = require("../../repositories/MongoSubscriptionRepository");
class TransactionController {
    list(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type, description, category, startDate, endDate, page, limit } = transactionValidationSchema_1.getTransactionsSchema.parse(request.query);
            const idUser = request.user.id;
            const expenseRepository = new MongoExpenseRepository_1.MongoExpenseRepository();
            const subscriptionRepository = new MongoSubscriptionRepository_1.MongoSubscriptionRepository();
            const incomeRepository = new MongoIncomeRepository_1.MongoIncomeRepository();
            const getTransactionsUseCase = new GetTransactions_1.GetTransactionsUseCase(expenseRepository, subscriptionRepository, incomeRepository);
            const result = yield getTransactionsUseCase.execute({
                idUser,
                description,
                type: type,
                category,
                startDate,
                endDate,
                page,
                limit
            });
            return response.json(result);
        });
    }
}
exports.TransactionController = TransactionController;
