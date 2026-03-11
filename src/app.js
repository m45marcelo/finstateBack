"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const env_1 = require("./infra/env");
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./infra/http/routes");
const errorMiddleware_1 = require("./infra/http/middlewares/errorMiddleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: env_1.env.NODE_ENV === 'production'
        ? ['https://futurosite.com']
        : true,
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
if (env_1.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
        next();
    });
}
app.use('/api', routes_1.routes);
app.use(errorMiddleware_1.errorMiddleware);
app.use((req, res) => {
    res.status(404).json({
        message: 'Rota não encontrada',
        status: 404
    });
});
