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
exports.GeneralBudgetController = void 0;
const generalBudgetValidationSchema_1 = require("../validators/generalBudgetValidationSchema");
const MongoGeneralBudgetRepository_1 = require("../../repositories/MongoGeneralBudgetRepository");
const CreateGeneralBudget_1 = require("../../../application/use-cases/Budgets/CreateGeneralBudget");
const MongoUserRepository_1 = require("../../repositories/MongoUserRepository");
const GetGeneralBudget_1 = require("../../../application/use-cases/Budgets/GetGeneralBudget");
const UpdateGeneralBudget_1 = require("../../../application/use-cases/Budgets/UpdateGeneralBudget");
class GeneralBudgetController {
    createGeneralBudget(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit } = generalBudgetValidationSchema_1.createGeneralBudgetSchema.parse(request.body);
            const idUser = request.user.id;
            const generalBudgetRepository = new MongoGeneralBudgetRepository_1.MongoGeneralBudgetRepository();
            const userRepository = new MongoUserRepository_1.MongoUserRepository();
            const createGeneralBudgetUseCase = new CreateGeneralBudget_1.CreateGeneralBudgetUseCase(generalBudgetRepository, userRepository);
            const result = yield createGeneralBudgetUseCase.execute({
                idUser,
                limit,
            });
            return response.status(200).json(result);
        });
    }
    getGeneralBudget(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const idUser = request.user.id;
            const generalBugetRepository = new MongoGeneralBudgetRepository_1.MongoGeneralBudgetRepository();
            const getGeneralBudgetUseCase = new GetGeneralBudget_1.GetGeneralBudgetUseCase(generalBugetRepository);
            const result = yield getGeneralBudgetUseCase.execute({ idUser });
            return response.json(result);
        });
    }
    updateGeneralBudget(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const idUser = request.user.id;
            const { limit, spent, remaining, status } = request.body;
            const generalBudgetRepository = new MongoGeneralBudgetRepository_1.MongoGeneralBudgetRepository();
            const updateGeneralBudgetUseCase = new UpdateGeneralBudget_1.UpdateGeneralBudgetUseCase(generalBudgetRepository);
            const result = yield updateGeneralBudgetUseCase.execute({
                idUser,
                limit,
            });
            return response.status(200).json(result);
        });
    }
}
exports.GeneralBudgetController = GeneralBudgetController;
