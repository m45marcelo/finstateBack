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
exports.GetTransactionsUseCase = void 0;
const Transaction_1 = require("../../../core/entities/Transaction");
class GetTransactionsUseCase {
    constructor(expenseRepository, subscriptionRepository, incomeRepository) {
        this.expenseRepository = expenseRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.incomeRepository = incomeRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idUser, type, category, description, startDate, endDate, page = 1, limit = 10, }) {
            const filter = {
                idUser,
                category,
                description,
                startDate: startDate ? new Date(startDate) : undefined,
                endDate: endDate ? new Date(endDate) : undefined,
            };
            const allTransactions = [];
            if (!type || type === "expense" || type === "subscription") {
                const expenses = yield this.expenseRepository.findMany(filter);
                const subscriptions = yield this.subscriptionRepository.findMany(filter);
                allTransactions.push(...expenses.map(Transaction_1.expenseToTransaction));
                allTransactions.push(...subscriptions.map(Transaction_1.expenseToTransaction));
            }
            if (!type || type === "income") {
                const incomes = yield this.incomeRepository.findMany(filter);
                allTransactions.push(...incomes.map(Transaction_1.incomeToTransaction));
            }
            allTransactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            const totalExpenses = allTransactions
                .filter((t) => t.type === "expense" || t.type === "subscription")
                .reduce((sum, t) => sum + t.value, 0);
            const totalIncomes = allTransactions
                .filter((t) => t.type === "income")
                .reduce((sum, t) => sum + t.value, 0);
            const balance = totalIncomes - totalExpenses;
            const totalItems = allTransactions.length;
            const totalPages = Math.ceil(totalItems / limit);
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedTransactions = allTransactions.slice(startIndex, endIndex);
            return {
                transactions: paginatedTransactions,
                summary: {
                    totalExpenses,
                    totalIncomes,
                    balance,
                },
                pagination: {
                    currentPage: page,
                    itemsPerPage: limit,
                    totalItems,
                    totalPages,
                    hasNextPage: page < totalPages,
                    hasPreviousPage: page > 1,
                },
            };
        });
    }
}
exports.GetTransactionsUseCase = GetTransactionsUseCase;
