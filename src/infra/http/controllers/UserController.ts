import { Request, Response } from 'express';
import { createUserSchema } from '../schemas/validationSchemas';
import { MongoUserRepository } from '../../repositories/MongoUserRepository';
import { CreateUserUseCase } from '../../../application/use-cases/CreateUser';

export class UserController {
    async create(request: Request, response: Response): Promise<Response> {
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
}
