export abstract class AppError extends Error {
    public readonly statusCode: number

    constructor(message: string, statusCode = 400) {
        super(message)
        this.statusCode = statusCode
        this.name = this.constructor.name

        Error.captureStackTrace(this, this.constructor)
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 400)
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = 'Recurso não encontrado') {
        super(message, 404)
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = 'Não autorizado') {
        super(message, 401)
    }
}

export class ConflictError extends AppError {
    constructor(message: string) {
        super(message, 409)
    }
}

export class InternalServerError extends AppError {
    constructor(message: string = 'Erro interno do servidor'){
        super(message, 500)
    }

}