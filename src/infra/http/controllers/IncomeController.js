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
exports.IncomeController = void 0;
const incomeValidationSchema_1 = require("../validators/incomeValidationSchema");
const MongoUserRepository_1 = require("../../repositories/MongoUserRepository");
const MongoIncomeRepository_1 = require("../../repositories/MongoIncomeRepository");
const CreateIncome_1 = require("../../../application/use-cases/Income/CreateIncome");
const GetAllIncomes_1 = require("../../../application/use-cases/Income/GetAllIncomes");
class IncomeController {
    createIncome(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { description, value, category } = incomeValidationSchema_1.createIncomeSchema.parse(request.body);
            const idUser = request.user.id;
            const userRepository = new MongoUserRepository_1.MongoUserRepository();
            const incomeRepository = new MongoIncomeRepository_1.MongoIncomeRepository();
            const createIncomeUseCase = new CreateIncome_1.CreateIncomeUseCase(incomeRepository, userRepository);
            const result = yield createIncomeUseCase.execute({
                idUser,
                description,
                value,
                category: category
            });
            return response.status(200).json(result);
        });
    }
    getAllIncomes(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { description, category, startDate, endDate, page, limit } = incomeValidationSchema_1.getAllIncomesSchema.parse(request.query);
            const idUser = request.user.id;
            const incomeRepository = new MongoIncomeRepository_1.MongoIncomeRepository();
            const getIncomesUseCase = new GetAllIncomes_1.GetAllIncomesUseCase(incomeRepository);
            const result = yield getIncomesUseCase.execute({
                idUser,
                description,
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
exports.IncomeController = IncomeController;
