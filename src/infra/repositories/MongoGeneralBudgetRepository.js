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
exports.MongoGeneralBudgetRepository = void 0;
const generalBudgetModel_1 = require("../database/models/generalBudgetModel");
class MongoGeneralBudgetRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const generalBudget = yield generalBudgetModel_1.GeneralBudgetModel.create(Object.assign(Object.assign({}, data), { createdAt: new Date() }));
            return generalBudget.toJSON();
        });
    }
    findByIdUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const generalBudget = yield generalBudgetModel_1.GeneralBudgetModel.findOne({ idUser: idUser });
            return generalBudget ? generalBudget.toJSON() : null;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const generalBudget = yield generalBudgetModel_1.GeneralBudgetModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, data), { updatedAt: new Date() }), { new: true });
            return generalBudget ? generalBudget.toJSON() : null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield generalBudgetModel_1.GeneralBudgetModel.findByIdAndDelete(id);
        });
    }
}
exports.MongoGeneralBudgetRepository = MongoGeneralBudgetRepository;
