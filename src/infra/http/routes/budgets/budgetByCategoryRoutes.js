"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetByCategoryRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const BudgetByCategoryController_1 = require("../../controllers/BudgetByCategoryController");
const budgetByCategoryRoutes = (0, express_1.Router)();
exports.budgetByCategoryRoutes = budgetByCategoryRoutes;
const budgetByCategoryController = new BudgetByCategoryController_1.BudgetByCategoryController();
budgetByCategoryRoutes.use(authMiddleware_1.authMiddleware);
budgetByCategoryRoutes.post('/budget-by-category', (req, res, next) => {
    budgetByCategoryController.createBudgetByCategory(req, res).catch(next);
});
budgetByCategoryRoutes.get('/budget-by-category', (req, res, next) => {
    budgetByCategoryController.getBudgetByCategory(req, res).catch(next);
});
budgetByCategoryRoutes.put('/budget-by-category/:id', (req, res, next) => {
    budgetByCategoryController.updateBudgetByCategory(req, res).catch(next);
});
