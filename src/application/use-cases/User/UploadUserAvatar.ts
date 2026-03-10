import type { User } from "../../../core/entities/User";
import { NotFoundError, ValidationError } from "../../../shared/errors";
import type { UserRepository } from "../../repositories/UserRepository";
import type { UploadService } from "../../services/UploadService";

interface UploadUserAvatarRequest {
	idUser: string;
	imageBuffer: Buffer;
	mimetype: string;
	size: number;
}

interface UploadUserAvatarResponse {
	user: Omit<User, "password">;
}

export class UploadUserAvatarUseCase {
	constructor(
		private userRepository: UserRepository,
		private uploadService: UploadService,
	) {}

	async execute({
		idUser,
		imageBuffer,
		mimetype,
		size,
	}: UploadUserAvatarRequest): Promise<UploadUserAvatarResponse> {
		// Verificar se o usuário existe
		const user = await this.userRepository.findById(idUser);
		if (!user) {
			throw new NotFoundError("Usuário não encontrado");
		}

		// Validar tipo de arquivo
		const allowedMimeTypes = [
			"image/jpeg",
			"image/jpg",
			"image/png",
			"image/webp",
		];
		if (!allowedMimeTypes.includes(mimetype)) {
			throw new ValidationError(
				"Formato de imagem não suportado. Use JPEG, PNG ou WebP",
			);
		}

		// Validar tamanho do arquivo (5MB)
		const maxSize = 5 * 1024 * 1024; // 5MB em bytes
		if (size > maxSize) {
			throw new ValidationError("Imagem muito grande. Tamanho máximo: 5MB");
		}

		try {
			// Se o usuário já tem uma foto, deletar a anterior
			if (user.avatarPublicId) {
				await this.uploadService.deleteImage(user.avatarPublicId);
			}

			// Fazer upload da nova imagem
			const uploadResult = await this.uploadService.uploadImage(
				imageBuffer,
				"finance-manager/avatars",
				`user_${idUser}`,
			);

			// Atualizar o usuário no banco
			const updatedUser = await this.userRepository.update(idUser, {
				avatarUrl: uploadResult.secureUrl,
				avatarPublicId: uploadResult.publicId,
			});

			if (!updatedUser) {
				throw new NotFoundError("Usuário não encontrado");
			}

			// Remover a senha do retorno
			const { password: _, ...userWithoutPassword } = updatedUser;

			return {
				user: userWithoutPassword,
			};
		} catch (error) {
			if (error instanceof ValidationError || error instanceof NotFoundError) {
				throw error;
			}
			throw new ValidationError("Erro ao fazer upload da imagem");
		}
	}
}
