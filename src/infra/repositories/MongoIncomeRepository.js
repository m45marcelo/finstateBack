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
exports.MongoIncomeRepository = void 0;
const IncomeModel_1 = require("../database/models/IncomeModel");
class MongoIncomeRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const income = yield IncomeModel_1.IncomeSchema.create(Object.assign(Object.assign({}, data), { createdAt: new Date() }));
            return income.toJSON();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const income = yield IncomeModel_1.IncomeSchema.findById(id);
            return income ? income === null || income === void 0 ? void 0 : income.toJSON() : null;
        });
    }
    findMany(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.buildQuery(filter);
            const incomes = yield IncomeModel_1.IncomeSchema.find(query).sort({ createdAt: -1 });
            return incomes.map((income) => income.toJSON());
        });
    }
    findManyPaginated(filter, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.buildQuery(filter);
            const skip = (pagination.page - 1) * pagination.limit;
            const [incomes, totalItems] = yield Promise.all([
                IncomeModel_1.IncomeSchema.find(query)
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(pagination.limit),
                IncomeModel_1.IncomeSchema.countDocuments(query),
            ]);
            const totalPages = Math.ceil(totalItems / pagination.limit);
            return {
                data: incomes.map((income) => income.toJSON()),
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
            const income = yield IncomeModel_1.IncomeSchema.findByIdAndUpdate(id, Object.assign(Object.assign({}, data), { updatedAt: new Date() }), { new: true });
            return income ? income.toJSON() : null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield IncomeModel_1.IncomeSchema.findByIdAndDelete(id);
        });
    }
    getTotalByUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield IncomeModel_1.IncomeSchema.aggregate([
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
exports.MongoIncomeRepository = MongoIncomeRepository;
