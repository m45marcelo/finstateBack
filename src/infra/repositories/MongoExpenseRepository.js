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
exports.MongoExpenseRepository = void 0;
const expenseModel_1 = require("../database/models/expenseModel");
class MongoExpenseRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const expense = yield expenseModel_1.ExpenseModel.create(Object.assign(Object.assign({}, data), { createdAt: new Date() }));
            return expense.toJSON();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const expense = yield expenseModel_1.ExpenseModel.findById(id);
            return expense ? expense.toJSON() : null;
        });
    }
    findMany(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.buildQuery(filter);
            const expenses = yield expenseModel_1.ExpenseModel.find(query).sort({ createdAt: -1 });
            return expenses.map((expense) => expense.toJSON());
        });
    }
    findManyPaginated(filter, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.buildQuery(filter);
            // Calcular skip (quantos registros pular)
            const skip = (pagination.page - 1) * pagination.limit;
            // Buscar dados paginados e contar total
            const [expenses, totalItems] = yield Promise.all([
                expenseModel_1.ExpenseModel.find(query)
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(pagination.limit),
                expenseModel_1.ExpenseModel.countDocuments(query),
            ]);
            // Calcular metadados da paginação
            const totalPages = Math.ceil(totalItems / pagination.limit);
            return {
                data: expenses.map((expense) => expense.toJSON()),
                meta: {
                    currentPage: pagination.page,
                    itemsPerPage: pagination.limit,
                    totalItems,
                    totalPages,
                    hasNextPage: pagination.page < totalPages,
                    hasPreviousPage: pagination.page > 1,
                },
            };
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const expense = yield expenseModel_1.ExpenseModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, data), { updatedAt: new Date() }), { new: true });
            return expense ? expense.toJSON() : null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const expense = yield expenseModel_1.ExpenseModel.findByIdAndDelete(id);
            return expense ? expense.toJSON() : null;
        });
    }
    getTotalByUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield expenseModel_1.ExpenseModel.aggregate([
                { $match: { idUser } },
                { $group: { _id: null, total: { $sum: "$value" } } },
            ]);
            return result.length > 0 ? result[0].total : 0;
        });
    }
    buildQuery(filter) {
        const query = { idUser: filter.idUser };
        if (filter.description) {
            query.description = { $regex: filter.description, $options: "i" };
        }
        if (filter.category) {
            query.category = filter.category;
        }
        if (filter.startDate || filter.endDate) {
            query.createdAt = {};
            if (filter.startDate) {
                query.createdAt.$gte = filter.startDate;
            }
            if (filter.endDate) {
                query.createdAt.$lte = filter.endDate;
            }
        }
        return query;
    }
}
exports.MongoExpenseRepository = MongoExpenseRepository;
