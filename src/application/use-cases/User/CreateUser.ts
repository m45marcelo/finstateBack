import { CreatedUserData, User } from '../../../core/entities/User';
import { UserRepository } from '../../repositories/UserRepository';
import { ConflictError } from '../../../shared/errors';
import { hash } from 'bcryptjs';

interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
}

interface CreateUserResponse {
    user: Omit<User, 'password'>;
}

export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({
        name,
        email,
        password,
    }: CreateUserRequest): Promise<CreateUserResponse> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new ConflictError('Email já cadastrado');
        }

        const hashedPassword = await hash(password, 6);

        const userData: CreatedUserData = {
            name,
            email,
            password: hashedPassword,
        };

        const user = await this.userRepository.create(userData);

        const { password: _, ...userWithoutPassword } = user;

        return {
            user: userWithoutPassword,
        };
    }
}
