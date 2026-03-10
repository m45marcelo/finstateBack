"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const errors_1 = require("../../../shared/errors");
const zod_1 = require("zod");
const env_1 = require("../../env");
function errorMiddleware(error, request, response, next) {
    if (error instanceof errors_1.AppError) {
        return response.status(error.statusCode).json({
            message: error.message,
            statusCode: error.statusCode
        });
    }
    let validationErrors = [];
    if (error instanceof zod_1.ZodError) {
        validationErrors = error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message
        }));
        return response.status(400).json({
            message: 'Dados inválidos',
            statusCode: 400,
            details: validationErrors
        });
    }
    if (error.name === 'MongoServerError' && error.code === 11000) {
        return response.status(409).json({
            message: 'Recurso já existe',
            statusCode: 409
        });
    }
    console.error('Erro não tratado:', error);
    const errorResponse = {
        message: 'Erro interno do servidor',
        statusCode: 500
    };
    if (env_1.env.NODE_ENV === 'development') {
        errorResponse.details = {
            name: error.name,
            message: error.message,
            stack: error.stack
        };
    }
    return response.status(500).json(errorResponse);
}
