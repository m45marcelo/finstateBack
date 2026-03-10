"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const userRoutes_1 = require("./user/userRoutes");
const expenseRoutes_1 = require("./expense/expenseRoutes");
const incomeRoutes_1 = require("./income/incomeRoutes");
const subscriptionRoutes_1 = require("./subscription/subscriptionRoutes");
const generalBudgetRoutes_1 = require("./budgets/generalBudgetRoutes");
const budgetByCategoryRoutes_1 = require("./budgets/budgetByCategoryRoutes");
const transactionRoutes_1 = require("./transaction/transactionRoutes");
const dashboardRoutes_1 = require("./dashboard/dashboardRoutes");
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.get('/', (req, res) => {
    res.json({
        message: 'FinState API',
        version: '1.0.0',
        status: 'online',
        timestamp: new Date().toISOString(),
    });
});
routes.use(userRoutes_1.userRoutes);
routes.use(transactionRoutes_1.transactionRoutes);
routes.use(expenseRoutes_1.expenseRoutes);
routes.use(incomeRoutes_1.incomeRoutes);
routes.use(subscriptionRoutes_1.subscriptionRoutes);
routes.use(generalBudgetRoutes_1.generalBudgetRoutes);
routes.use(budgetByCategoryRoutes_1.budgetByCategoryRoutes);
routes.use(dashboardRoutes_1.dashboardRoutes);
