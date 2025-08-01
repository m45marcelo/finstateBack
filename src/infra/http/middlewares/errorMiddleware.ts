import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../shared/errors";
import { ZodError } from "zod";
import { env } from "../../env";

interface ErrorResponse {
    message: string;
    statusCode: number;
    details?: any;
}

export function errorMiddleware(
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
): Response {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            message: error.message,
            statusCode: error.statusCode
        })
    }

    if(error instanceof ZodError) {
        var validationErrors = error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message
        }))

        return response.status(400).json({
            message: 'Dados inválidos',
            statusCode: 400,
            details: validationErrors
        })
    }

    if(error.name === 'MongoServerError' && (error as any).code === 11000) {
        return response.status(409).json({
            message: 'Recurso já existe',
            statusCode: 409
        })
    }

    console.error('Erro não tratado:', error);

    const errorResponse: ErrorResponse = {
        message: 'Erro interno do servidor',
        statusCode: 500
    }
    
    if(env.NODE_ENV === 'development') {
        errorResponse.details = {
            name: error.name,
            message: error.message,
            stack: error.stack
        }
    }

    return response.status(500).json(errorResponse)
}