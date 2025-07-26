import { User } from '../../../core/entities/User';
import { NotFoundError } from '../../../shared/errors';
import { UserRepository } from '../../repositories/UserRepository';

// interface UserWithoutPassword {
//     userWithoutPassword: Omit<User, 'password'>;
// }

interface GetAllUsersResponse {
    users: User[];
}

export class GetAllUsersUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(): Promise<GetAllUsersResponse> {
        const users = await this.userRepository.getAll();
        if (users.length === 0) {
            throw new NotFoundError('Ainda não existem usuários registrados');
        }
        return { users };
    }
}
