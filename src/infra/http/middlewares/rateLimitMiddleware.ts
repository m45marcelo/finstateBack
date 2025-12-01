import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../../shared/errors";
import { redis } from "../../database/redis";

interface RateLimitOptions {
    maxAttempts: number;
    windowMs: number;
}

export function createUploadRateLimit({ maxAttempts, windowMs }: RateLimitOptions) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const idUser = request.user?.id;

        if(!idUser) {
            return next();
        }

        const key = `upload_attempts:${idUser}`

        const attempts = await redis.incr(`upload_attempts:${idUser}`);

        if(attempts === 1) {
            await redis.pexpire(`upload_attempts:${idUser}`, 60 * 60 * 1000);
        }

        if(attempts > 5) {
            throw new ValidationError("Limite de uploads excedido");
        }

        next();
    }
}

export const avatarUploadRateLimit = createUploadRateLimit({
    maxAttempts: 5,
    windowMs: 60 * 60 * 1000
})