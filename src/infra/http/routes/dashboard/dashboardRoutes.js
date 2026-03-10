"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRoutes = void 0;
const express_1 = require("express");
const DashboardController_1 = require("../../../../infra/http/controllers/DashboardController");
const authMiddleware_1 = require("../../../../infra/http/middlewares/authMiddleware");
const dashboardRoutes = (0, express_1.Router)();
exports.dashboardRoutes = dashboardRoutes;
const dashboardController = new DashboardController_1.DashboardController();
// Todas as rotas do dashboard requerem autenticação
dashboardRoutes.use(authMiddleware_1.authMiddleware);
dashboardRoutes.get('/dashboard/categories', (req, res, next) => {
    console.log('🎯 Rota /dashboard/categories atingida');
    dashboardController.getCategorySummary(req, res).catch(next);
});
