"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const errors_1 = require("../../../shared/errors");
const jsonwebtoken_1 = require("jsonwebtoken");
const env_1 = require("../../env");
function authMiddleware(request, response, next) {
    var _a;
    const tokenFromCookie = (_a = request.cookies) === null || _a === void 0 ? void 0 : _a.token;
    const authHeader = request.headers.authorization;
    const tokenFromHeader = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer "))
        ? authHeader.split(" ")[1]
        : undefined;
    const token = tokenFromCookie || tokenFromHeader;
    if (!token) {
        throw new errors_1.UnauthorizedError("Token de acesso é obrigatório");
    }
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, env_1.env.JWT_SECRET);
        request.user = {
            id: decoded.sub,
        };
        next();
    }
    catch (_b) {
        throw new errors_1.UnauthorizedError("Token de acesso inválido");
    }
}
