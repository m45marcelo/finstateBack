"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalBudgetRoutes = void 0;
const express_1 = require("express");
const GeneralBudgetController_1 = require("../../controllers/GeneralBudgetController");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const generalBudgetRoutes = (0, express_1.Router)();
exports.generalBudgetRoutes = generalBudgetRoutes;
const generalBudgetController = new GeneralBudgetController_1.GeneralBudgetController();
generalBudgetRoutes.use(authMiddleware_1.authMiddleware);
generalBudgetRoutes.post('/general-budget', (req, res, next) => {
    generalBudgetController.createGeneralBudget(req, res).catch(next);
});
generalBudgetRoutes.get('/general-budget', (req, res, next) => {
    generalBudgetController.getGeneralBudget(req, res).catch(next);
});
generalBudgetRoutes.put('/general-budget', (req, res, next) => {
    generalBudgetController.updateGeneralBudget(req, res).catch(next);
});
