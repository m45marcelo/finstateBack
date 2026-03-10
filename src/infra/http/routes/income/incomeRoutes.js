"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incomeRoutes = void 0;
const express_1 = require("express");
const IncomeController_1 = require("../../controllers/IncomeController");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const incomeRoutes = (0, express_1.Router)();
exports.incomeRoutes = incomeRoutes;
const incomeController = new IncomeController_1.IncomeController();
incomeRoutes.use(authMiddleware_1.authMiddleware);
incomeRoutes.post('/income', (req, res, next) => {
    incomeController.createIncome(req, res).catch(next);
});
incomeRoutes.get('/incomes', (req, res, next) => {
    incomeController.getAllIncomes(req, res).catch(next);
});
