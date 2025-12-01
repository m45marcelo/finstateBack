import { Request, Response } from 'express';
import {
    AuthenticateUserSchema,
    createUserSchema,
} from '../validators/userValidationSchemas';
import { MongoUserRepository } from '../../repositories/MongoUserRepository';
import { CreateUserUseCase } from '../../../application/use-cases/User/CreateUser';
import { GetAllUsersUseCase } from '../../../application/use-cases/User/GetAllUsers';
import { AuthenticateUserUseCase } from '../../../application/use-cases/User/AuthenticateUser';
import { ValidationError } from '../../../shared/errors';
import { CloudinaryUploadService } from '../../storage/CloudinaryUploadService';
import { UploadUserAvatarUseCase } from '../../../application/use-cases/User/UploadUserAvatar';
import { DeleteUserAvatarUseCase } from '../../../application/use-cases/User/DeleteUserAvatar';
import { env } from '../../../infra/env/index';
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

        const { token, user } = authenticatedUser;

        response.cookie("token", token, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7,
    });

        return response.json({ user });
    }

    async getAllUsers(response: Response): Promise<Response> {
        const userRepository = new MongoUserRepository();
        const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);

        const result = await getAllUsersUseCase.execute();

        return response.status(200).json(result);
    }

    async profile(request: Request, response: Response): Promise<Response> {
        const userRepository = new MongoUserRepository();
        const user = await userRepository.findById(request.user.id);

        if (!user) {
            return response
                .status(404)
                .json({ message: 'Usuário não encontrado' });
        }

        const { password: _, ...userWithoutPassword } = user;

        return response.json({ user: userWithoutPassword });
    }

    async uploadAvatar(
        request: Request,
        response: Response,
    ): Promise<Response> {
        if (!request.file) {
            throw new ValidationError('Nenhuma imagem foi enviada');
        }

        const userRepository = new MongoUserRepository();
        const uploadService = new CloudinaryUploadService();
        const uploadUserAvatarUseCase = new UploadUserAvatarUseCase(
            userRepository,
            uploadService,
        );

        const result = await uploadUserAvatarUseCase.execute({
            idUser: request.user.id,
            imageBuffer: request.file.buffer,
            mimetype: request.file.mimetype,
            size: request.file.size,
        });

        return response.json(result);
    }

    async deleteAvatar(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const userRepository = new MongoUserRepository();
        const uploadService = new CloudinaryUploadService();
        const deleteUserAvatarUseCase = new DeleteUserAvatarUseCase(
            userRepository,
            uploadService,
        );

        const result = await deleteUserAvatarUseCase.execute({
            idUser: request.user.id,
        });

        return response.json(result);
    }
}
