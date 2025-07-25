import { Request, Response } from 'express';
import {
    AuthenticateUserSchema,
    createUserSchema,
} from '../validators/userValidationSchemas';
import { MongoUserRepository } from '../../repositories/MongoUserRepository';
import { CreateUserUseCase } from '../../../application/use-cases/User/CreateUser';
import { GetAllUsersUseCase } from '../../../application/use-cases/User/GetAllUsers';
import { AuthenticateUserUseCase } from '../../../application/use-cases/User/AuthenticateUser';

export class UserController {
    async createUser(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = createUserSchema.parse(request.body);
        
        const userRepository = new MongoUserRepository();
        const createUserUseCase = new CreateUserUseCase(userRepository);

        const result = await createUserUseCase.execute({
            name,
            email,
            password,
        });

        return response.status(201).json(result);
    }

    async authenticateUser(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = AuthenticateUserSchema.parse(request.body);

        const userRepository = new MongoUserRepository();
        const authenticateUserUserCase = new AuthenticateUserUseCase(
            userRepository,
        );

        const authenticatedUser = await authenticateUserUserCase.execute({
            email,
            password,
        });

        return response.json(authenticatedUser);
    }

    async getAllUsers(response: Response): Promise<Response> {
        const userRepository = new MongoUserRepository();
        const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);

        const result = await getAllUsersUseCase.execute();

        return response.status(200).json(result);
    }
}
