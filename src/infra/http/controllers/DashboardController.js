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
exports.DashboardController = void 0;
const GetCategorySummary_1 = require("../../../application/use-cases/Transaction/GetCategorySummary");
const MongoExpenseRepository_1 = require("../../../infra/repositories/MongoExpenseRepository");
const MongoIncomeRepository_1 = require("../../../infra/repositories/MongoIncomeRepository");
const zod_1 = require("zod");
const MongoSubscriptionRepository_1 = require("../../repositories/MongoSubscriptionRepository");
const getSummarySchema = zod_1.z.object({
    startDate: zod_1.z.string().datetime().optional(),
    endDate: zod_1.z.string().datetime().optional()
});
class DashboardController {
    getCategorySummary(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { startDate, endDate } = getSummarySchema.parse(request.query);
            const idUser = request.user.id;
            const expenseRepository = new MongoExpenseRepository_1.MongoExpenseRepository();
            const subscriptionRepository = new MongoSubscriptionRepository_1.MongoSubscriptionRepository();
            const incomeRepository = new MongoIncomeRepository_1.MongoIncomeRepository();
            const getCategorySummaryUseCase = new GetCategorySummary_1.GetCategorySummaryUseCase(expenseRepository, subscriptionRepository, incomeRepository);
            const result = yield getCategorySummaryUseCase.execute({
                idUser,
                startDate,
                endDate
            });
            return response.json(result);
        });
    }
}
exports.DashboardController = DashboardController;
