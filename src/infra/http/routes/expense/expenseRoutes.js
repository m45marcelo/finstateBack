"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseRoutes = void 0;
const express_1 = require("express");
const ExpenseController_1 = require("../../controllers/ExpenseController");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const expenseRoutes = (0, express_1.Router)();
exports.expenseRoutes = expenseRoutes;
const expenseController = new ExpenseController_1.ExpenseController();
expenseRoutes.use(authMiddleware_1.authMiddleware);
expenseRoutes.post('/expense', (req, res, next) => {
    expenseController.createExpense(req, res).catch(next);
});
expenseRoutes.get('/expenses', (req, res, next) => {
    expenseController.getAllExpenses(req, res).catch(next);
});
expenseRoutes.delete("/expense", (req, res, next) => {
    expenseController.deleteExpense(req, res).catch(next);
});
