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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryUploadService = void 0;
const cloudinary_1 = require("./cloudinary");
const errors_1 = require("../../shared/errors");
const streamifier_1 = __importDefault(require("streamifier"));
class CloudinaryUploadService {
    uploadImage(buffer, folder, publicId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Enviando para o Cloudinary:", {
                size: buffer.length,
                folder,
                publicId
            });
            try {
                return new Promise((resolve, reject) => {
                    const uploadOptions = {
                        folder,
                        public_id: publicId,
                        resource_type: "image",
                        transformation: [
                            { width: 500, height: 500, crop: "fill", gravity: "face" },
                            { quality: "auto", fetch_format: "auto" }
                        ],
                        allowed_formats: ["jpg", "jpeg", "png", "webp"]
                    };
                    const uploadStream = cloudinary_1.cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
                        if (error) {
                            reject(new errors_1.InternalServerError(`Erro no upload: ${error.message}`));
                        }
                        else if (result) {
                            resolve({
                                publicId: result.public_id,
                                url: result.url,
                                secureUrl: result.secure_url
                            });
                        }
                        else {
                            reject(new errors_1.InternalServerError("Erro desconhecido no upload"));
                        }
                    });
                    streamifier_1.default.createReadStream(buffer).pipe(uploadStream);
                });
            }
            catch (error) {
                throw new errors_1.InternalServerError("Erro ao fazer upload da imagem");
            }
        });
    }
    deleteImage(publicId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield cloudinary_1.cloudinary.uploader.destroy(publicId);
            }
            catch (error) {
                console.error("Erro ao deletar imagem do Cloudinary:", error);
            }
        });
    }
}
exports.CloudinaryUploadService = CloudinaryUploadService;
