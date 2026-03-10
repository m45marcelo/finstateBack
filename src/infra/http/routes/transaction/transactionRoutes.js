"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRoutes = void 0;
const express_1 = require("express");
const TransactionController_1 = require("../../controllers/TransactionController");
const authMiddleware_1 = require("../../../http/middlewares/authMiddleware");
const transactionRoutes = (0, express_1.Router)();
exports.transactionRoutes = transactionRoutes;
const transactionController = new TransactionController_1.TransactionController();
transactionRoutes.use(authMiddleware_1.authMiddleware);
transactionRoutes.get('/transactions', (req, res, next) => {
    transactionController.list(req, res).catch(next);
});
