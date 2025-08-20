import { User } from "../../../core/entities/User";
import { NotFoundError, ValidationError } from "../../../shared/errors";
import { UserRepository } from "../../repositories/UserRepository";
import { UploadService } from "../../services/UploadService";

interface DeleteUserAvatarRequest {
    idUser: string;
}

interface DeleteUserAvatarResponse {
    user: Omit<User, 'password'>
}

export class DeleteUserAvatarUseCase {
    constructor(
        private userRepository: UserRepository,
        private uploadService: UploadService
    ) {}

    async execute({ idUser }: DeleteUserAvatarRequest): Promise<DeleteUserAvatarResponse> {
        const user = await this.userRepository.findById(idUser)

        if(!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        if(!user.avatarPublicId) {
            throw new ValidationError('Usuário não possui foto de perfil')
        }

        try {
            await this.uploadService.deleteImage(user.avatarPublicId);

            const updatedUser = await this.userRepository.update(idUser, {
                avatarUrl: undefined,
                avatarPublicId: undefined
            })

            if(!updatedUser) {
                throw new NotFoundError('Usuário não encontrado')
            }

            const { password: _, ...userWithoutPassword } = updatedUser;

            return {
                user: userWithoutPassword
            }
        } catch (error) {
            if(error instanceof ValidationError || error instanceof NotFoundError) {
                throw error;
            }
            throw new ValidationError('erro ao deletar foto de perfil');
        }
    }
}