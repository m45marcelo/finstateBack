"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadUserAvatarUseCase = void 0;
const errors_1 = require("../../../shared/errors");
class UploadUserAvatarUseCase {
    constructor(userRepository, uploadService) {
        this.userRepository = userRepository;
        this.uploadService = uploadService;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idUser, imageBuffer, mimetype, size, }) {
            // Verificar se o usuário existe
            const user = yield this.userRepository.findById(idUser);
            if (!user) {
                throw new errors_1.NotFoundError("Usuário não encontrado");
            }
            // Validar tipo de arquivo
            const allowedMimeTypes = [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/webp",
            ];
            if (!allowedMimeTypes.includes(mimetype)) {
                throw new errors_1.ValidationError("Formato de imagem não suportado. Use JPEG, PNG ou WebP");
            }
            // Validar tamanho do arquivo (5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB em bytes
            if (size > maxSize) {
                throw new errors_1.ValidationError("Imagem muito grande. Tamanho máximo: 5MB");
            }
            try {
                // Se o usuário já tem uma foto, deletar a anterior
                if (user.avatarPublicId) {
                    yield this.uploadService.deleteImage(user.avatarPublicId);
                }
                // Fazer upload da nova imagem
                const uploadResult = yield this.uploadService.uploadImage(imageBuffer, "finance-manager/avatars", `user_${idUser}`);
                // Atualizar o usuário no banco
                const updatedUser = yield this.userRepository.update(idUser, {
                    avatarUrl: uploadResult.secureUrl,
                    avatarPublicId: uploadResult.publicId,
                });
                if (!updatedUser) {
                    throw new errors_1.NotFoundError("Usuário não encontrado");
                }
                // Remover a senha do retorno
                const { password: _ } = updatedUser, userWithoutPassword = __rest(updatedUser, ["password"]);
                return {
                    user: userWithoutPassword,
                };
            }
            catch (error) {
                if (error instanceof errors_1.ValidationError || error instanceof errors_1.NotFoundError) {
                    throw error;
                }
                throw new errors_1.ValidationError("Erro ao fazer upload da imagem");
            }
        });
    }
}
exports.UploadUserAvatarUseCase = UploadUserAvatarUseCase;
