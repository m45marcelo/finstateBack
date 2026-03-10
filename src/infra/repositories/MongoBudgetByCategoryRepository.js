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
exports.MongoBudgetByCategoryRepository = void 0;
const budgetByCategoryModel_1 = require("../database/models/budgetByCategoryModel");
class MongoBudgetByCategoryRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const budget = yield budgetByCategoryModel_1.BudgetByCategoryModel.create(Object.assign(Object.assign({}, data), { createdAt: new Date() }));
            return budget.toJSON();
        });
    }
    findMany(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            //const query: any = { idUser: filter.idUser };
            const budgets = yield budgetByCategoryModel_1.BudgetByCategoryModel.find(filter).sort({
                createdAt: -1,
            });
            return budgets.map((budgetByCategory) => budgetByCategory.toJSON());
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const budget = yield budgetByCategoryModel_1.BudgetByCategoryModel.findById(id);
            return budget ? budget.toJSON() : null;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const budget = yield budgetByCategoryModel_1.BudgetByCategoryModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, data), { updatedAt: new Date() }), { new: true });
            return budget ? budget.toJSON() : null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield budgetByCategoryModel_1.BudgetByCategoryModel.findByIdAndDelete(id);
        });
    }
}
exports.MongoBudgetByCategoryRepository = MongoBudgetByCategoryRepository;
