import { User } from "../../../core/entities/User";
import { MongoUserRepository } from "../../../infra/repositories/MongoUserRepository";
import { NotFoundError, ValidationError } from "../../../shared/errors";
import { UploadService } from "../../services/UploadService";

interface UploadUserAvatarRequest {
    idUser: string;
    imageBuffer: Buffer;
    mimetype: string;
    size: number;
}

interface UploadUserAvatarResponse {
    user: Omit<User, 'password'>;
}

export class UploadUserAvatarUseCase {
    constructor(
        private userRepository: MongoUserRepository,
        private uploadService: UploadService
    ) {}

    async execute({
        idUser,
        imageBuffer,
        mimetype,
        size
    }: UploadUserAvatarRequest): Promise<UploadUserAvatarResponse> {
        const user = await this.userRepository.findById(idUser);

        if(!user) {
            throw new NotFoundError('Usuário não encontrado')
        }

        const allwedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if(!allwedMimeTypes.includes(mimetype)) {
            throw new ValidationError('Formato de imagem não suportado. Use JPEG, PNG ou WebP')
        }

        const maxSize = 5 * 1024 * 1024;
        if(size > maxSize) {
            throw new ValidationError('Imagem muito grande. Tamanho máximo: 5MB');
        }

        try {
            if(user.avatarPublicId){
                await this.uploadService.deleteImage(user.avatarPublicId);
            }

            const uploadResult = await this.uploadService.uploadImage(
                imageBuffer,
                'finstate/avatars',
                `User_${idUser}`
            )

            const updateUser = await this.userRepository.update(idUser, {
                avatarUrl: uploadResult.secureUrl,
                avatarPublicId: uploadResult.publicId
            })

            if(!updateUser) {
                throw new NotFoundError('Usuário não encontrado')
            }

            const { password: _, ...userWithoutPassword } = updateUser;

            return {
                user: userWithoutPassword
            }
        } catch (error) {
            if(error instanceof ValidationError || error instanceof NotFoundError) {
                throw error;
            }
            throw new ValidationError('Erro ao fazer upload da imagem');
        }
    }
}