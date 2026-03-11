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
exports.ExpenseController = void 0;
const CreateExpense_1 = require("../../../application/use-cases/Expense/CreateExpense");
const DeleteExpense_1 = require("../../../application/use-cases/Expense/DeleteExpense");
const GetAllExpenses_1 = require("../../../application/use-cases/Expense/GetAllExpenses");
const DeleteSubscription_1 = require("../../../application/use-cases/Subscription/DeleteSubscription");
const MongoExpenseRepository_1 = require("../../repositories/MongoExpenseRepository");
const MongoGeneralBudgetRepository_1 = require("../../repositories/MongoGeneralBudgetRepository");
const MongoSubscriptionRepository_1 = require("../../repositories/MongoSubscriptionRepository");
const MongoUserRepository_1 = require("../../repositories/MongoUserRepository");
const expenseValidationSchema_1 = require("../validators/expenseValidationSchema");
class ExpenseController {
    createExpense(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { description, value, category } = expenseValidationSchema_1.createExpenseSchema.parse(request.body);
            const idUser = request.user.id;
            const userRepository = new MongoUserRepository_1.MongoUserRepository();
            const expenseRepository = new MongoExpenseRepository_1.MongoExpenseRepository();
            const generalBudgetRepository = new MongoGeneralBudgetRepository_1.MongoGeneralBudgetRepository();
            const createExpenseUseCase = new CreateExpense_1.CreateExpenseUseCase(expenseRepository, userRepository, generalBudgetRepository);
            const result = yield createExpenseUseCase.execute({
                idUser,
                description,
                value,
                category: category,
            });
            return response.status(200).json(result);
        });
    }
    getAllExpenses(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { category, description, startDate, endDate, page, limit } = expenseValidationSchema_1.getAllExpensesSchema.parse(request.query);
            const idUser = request.user.id;
            const expenseRepository = new MongoExpenseRepository_1.MongoExpenseRepository();
            const getExpensesUseCase = new GetAllExpenses_1.GetAllExpensesUseCase(expenseRepository);
            const result = yield getExpensesUseCase.execute({
                idUser,
                description,
                category,
                startDate,
                endDate,
                page,
                limit,
            });
            return response.json(result);
        });
    }
    deleteExpense(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const idUser = request.user.id;
            const { id, type } = expenseValidationSchema_1.deleteExpenseSchema.parse(request.body);
            let result = "ok";
            if (type) {
                if (type === "expense") {
                    const expenseRepository = new MongoExpenseRepository_1.MongoExpenseRepository();
                    const deleteExpenseUseCase = new DeleteExpense_1.DeleteExpenseUseCase(expenseRepository);
                    result = yield deleteExpenseUseCase.execute({
                        idUser,
                        id,
                    });
                }
                if (type === "subscription") {
                    const subscriptionRepository = new MongoSubscriptionRepository_1.MongoSubscriptionRepository();
                    const deleteSubscriptioneUseCase = new DeleteSubscription_1.DeleteSubscriptionUseCase(subscriptionRepository);
                    result = yield deleteSubscriptioneUseCase.execute({
                        idUser,
                        id,
                    });
                }
            }
            return response.json(result);
        });
    }
}
exports.ExpenseController = ExpenseController;
