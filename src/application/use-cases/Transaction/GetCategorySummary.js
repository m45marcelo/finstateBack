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
exports.GetCategorySummaryUseCase = void 0;
const Expense_1 = require("../../../core/entities/Expense");
const Income_1 = require("../../../core/entities/Income");
class GetCategorySummaryUseCase {
    constructor(expenseRepository, subscriptionRepository, incomeRepository) {
        this.expenseRepository = expenseRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.incomeRepository = incomeRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idUser, startDate, endDate }) {
            const filter = {
                idUser,
                startDate: startDate ? new Date(startDate) : undefined,
                endDate: endDate ? new Date(endDate) : undefined
            };
            const [expenses, subscriptions, incomes] = yield Promise.all([
                this.expenseRepository.findMany(filter),
                this.subscriptionRepository.findMany(filter),
                this.incomeRepository.findMany(filter)
            ]);
            const expensesByCategory = this.groupByCategoryComplete(expenses, Expense_1.EXPENSE_CATEGORIES);
            const totalExpenses = expenses.reduce((sum, exp) => sum + exp.value, 0);
            const subscriptionByCategory = this.groupByCategoryComplete(subscriptions, Expense_1.EXPENSE_CATEGORIES);
            const totalSubscriptions = subscriptions.reduce((sum, exp) => sum + exp.value, 0);
            const totalExpensesAndSubscriptions = totalExpenses + totalSubscriptions;
            expensesByCategory[0].total += subscriptionByCategory[0].total;
            expensesByCategory[0].count += subscriptionByCategory[0].count;
            expensesByCategory[1].total += subscriptionByCategory[1].total;
            expensesByCategory[1].count += subscriptionByCategory[1].count;
            expensesByCategory[2].total += subscriptionByCategory[2].total;
            expensesByCategory[2].count += subscriptionByCategory[2].count;
            expensesByCategory[3].total += subscriptionByCategory[3].total;
            expensesByCategory[3].count += subscriptionByCategory[3].count;
            expensesByCategory[4].total += subscriptionByCategory[4].total;
            expensesByCategory[4].count += subscriptionByCategory[4].count;
            expensesByCategory[5].total += subscriptionByCategory[5].total;
            expensesByCategory[5].count += subscriptionByCategory[5].count;
            expensesByCategory[6].total += subscriptionByCategory[6].total;
            expensesByCategory[6].count += subscriptionByCategory[6].count;
            expensesByCategory[7].total += subscriptionByCategory[7].total;
            expensesByCategory[7].count += subscriptionByCategory[7].count;
            const incomesByCategory = this.groupByCategoryComplete(incomes, Income_1.INCOME_CATEGORIES);
            const totalIncomes = incomes.reduce((sum, inc) => sum + inc.value, 0);
            const expenseCategoriesWithPercentage = expensesByCategory.map(cat => (Object.assign(Object.assign({}, cat), { percentage: totalExpensesAndSubscriptions > 0 ? (cat.total / totalExpensesAndSubscriptions) * 100 : 0 })));
            const incomeCategoriesWithPercentage = incomesByCategory.map(cat => (Object.assign(Object.assign({}, cat), { percentage: totalIncomes > 0 ? (cat.total / totalIncomes) * 100 : 0 })));
            return {
                expenses: {
                    categories: expenseCategoriesWithPercentage,
                    total: totalExpensesAndSubscriptions
                },
                incomes: {
                    categories: incomeCategoriesWithPercentage,
                    total: totalIncomes
                },
                balance: totalIncomes - totalExpensesAndSubscriptions
            };
        });
    }
    groupByCategoryComplete(items, allCategories) {
        const categoryMap = new Map();
        allCategories.forEach(category => {
            categoryMap.set(category, { total: 0, count: 0 });
        });
        items.forEach(item => {
            const existing = categoryMap.get(item.category) || { total: 0, count: 0 };
            categoryMap.set(item.category, {
                total: existing.total + item.value,
                count: existing.count + 1
            });
        });
        return Array.from(categoryMap.entries()).map(([category, data]) => ({
            category,
            total: data.total,
            count: data.count
        }));
    }
}
exports.GetCategorySummaryUseCase = GetCategorySummaryUseCase;
