import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../../shared/errors";
import { verify } from "jsonwebtoken";
import { env } from "../../env";

interface TokenPayload {
    sub: string;
    iat: number;
    exp: number;
}

declare global {
    namespace Express {
        interface Request {
            user: {
                id: string;
            }
        }
    }
}

export function authMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    const tokenFromCookie = request.cookies?.token;

    const authHeader = request.headers.authorization;
    const tokenFromHeader = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : undefined;

    const token = tokenFromCookie || tokenFromHeader;

    if (!token) {
        throw new UnauthorizedError("Token de acesso é obrigatório");
    }

    try {
        const decoded = verify(token, env.JWT_SECRET) as TokenPayload;

        request.user = {
            id: decoded.sub,
        };

        next();
    } catch {
        throw new UnauthorizedError("Token de acesso inválido");
    }
}
