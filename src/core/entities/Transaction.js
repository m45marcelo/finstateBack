"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseToTransaction = expenseToTransaction;
exports.incomeToTransaction = incomeToTransaction;
// Função helper para converter Expense em Transaction
function expenseToTransaction(expense) {
    return Object.assign(Object.assign({}, expense), { type: "expense" });
}
// Função helper para converter Income em Transaction
function incomeToTransaction(income) {
    return Object.assign(Object.assign({}, income), { type: "income" });
}
