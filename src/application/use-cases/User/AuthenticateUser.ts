import { compare } from 'bcryptjs';
import { User } from '../../../core/entities/User';
import { UnauthorizedError } from '../../../shared/errors';
import { UserRepository } from '../../repositories/UserRepository';
import { sign } from 'jsonwebtoken';
import { env } from '../../../infra/env';

interface AuthenticateUserRequest {
    email: string;
    password: string;
}

interface AuthenticateUserResponse {
    user: Omit<User, 'password'>;
    token: string;
}

export class AuthenticateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({
        email,
        password,
    }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new UnauthorizedError('Email ou senha inválidos');
        }

        const passwordMatches = await compare(password, user.password);
        if (!passwordMatches) {
            throw new UnauthorizedError('Email ou senha inválidos');
        }

        const token = sign({}, env.JWT_SECRET, {
            subject: user.id,
            expiresIn: '7d',
        });

        const { password: _, ...userWithoutPassword } = user;

        return {
            user: userWithoutPassword,
            token,
        };
    }
}
