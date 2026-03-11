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
exports.BudgetByCategoryController = void 0;
const CreateBudgetByCategory_1 = require("../../../application/use-cases/Budgets/CreateBudgetByCategory");
const MongoBudgetByCategoryRepository_1 = require("../../repositories/MongoBudgetByCategoryRepository");
const MongoUserRepository_1 = require("../../repositories/MongoUserRepository");
const budgetByCategoryValidateSchema_1 = require("../validators/budgetByCategoryValidateSchema");
const GetBudgetsByCategory_1 = require("../../../application/use-cases/Budgets/GetBudgetsByCategory");
const UpdateBudgetByCategory_1 = require("../../../application/use-cases/Budgets/UpdateBudgetByCategory");
class BudgetByCategoryController {
    createBudgetByCategory(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { category, limit } = budgetByCategoryValidateSchema_1.createBudgetByCategorySchema.parse(request.body);
            const idUser = request.user.id;
            const budgetByCategoryRepository = new MongoBudgetByCategoryRepository_1.MongoBudgetByCategoryRepository();
            const userRepository = new MongoUserRepository_1.MongoUserRepository();
            const createBudgetByCategoryUseCase = new CreateBudgetByCategory_1.CreateBudgetByCategoryUseCase(budgetByCategoryRepository, userRepository);
            const result = yield createBudgetByCategoryUseCase.execute({
                idUser,
                category: category,
                limit
            });
            return response.status(200).json(result);
        });
    }
    getBudgetByCategory(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status } = budgetByCategoryValidateSchema_1.getBudgetByCategorySchema.parse(request.body);
            const idUser = request.user.id;
            const budgetByCategoryRepository = new MongoBudgetByCategoryRepository_1.MongoBudgetByCategoryRepository();
            const getBudgetByCategoryUseCase = new GetBudgetsByCategory_1.GetBudgetsByCategoryUseCase(budgetByCategoryRepository);
            const result = yield getBudgetByCategoryUseCase.execute({ idUser, status: status });
            return response.json(result);
        });
    }
    updateBudgetByCategory(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const idBudget = request.params.id;
            const idUser = request.user.id;
            const { limit } = budgetByCategoryValidateSchema_1.updateBudgetByCategorySchema.parse(request.body);
            const budgetByCategoryRepository = new MongoBudgetByCategoryRepository_1.MongoBudgetByCategoryRepository();
            const updateBudgetByCategoryUseCase = new UpdateBudgetByCategory_1.UpdateBudgetByCategoryUseCase(budgetByCategoryRepository);
            const result = yield updateBudgetByCategoryUseCase.execute({ idUser, idBudget, limit });
            return response.status(200).json(result);
        });
    }
}
exports.BudgetByCategoryController = BudgetByCategoryController;
