import { UploadService, UploadResult } from "../../application/services/UploadService";
import { cloudinary } from "./cloudinary";
import { InternalServerError } from "../../shared/errors";

export class CloudinaryUploadService implements UploadService {
    async uploadImage(buffer: Buffer, folder: string, publicId?: string): Promise<UploadResult> {
        try{
            return new Promise((resolve, reject) => {
                const uploadOptions = {
                    folder,
                    public_id: publicId,
                    resource_type: 'image' as const,
                    transformation: [
                        { width: 500, height: 500, crop: 'fill', gravity: 'face' },
                        { quality: 'auto', fetch_format: 'auto' }
                    ],
                    allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
                }

                const uploadStream = cloudinary.uploader.upload_stream(
                    uploadOptions,
                    (error, result) => {
                        if(error) {
                            reject(new InternalServerError(`Erro no upload: ${error.message}`))
                        } else if(result) {
                            resolve({
                                publicId: result.public_id,
                                url: result.url,
                                secureUrl: result.secure_url
                            })
                        } else {
                            reject(new InternalServerError('Erro desconhecido no upload'))
                        }
                    }
                )

                uploadStream.end(buffer)
            })
        } catch (error) {
            throw new InternalServerError('Erro ao fazer upload da imagem')
        }
    }

    async deletImage(publicId: string): Promise<void> {
        try {
            await cloudinary.uploader.destroy(publicId)
        } catch (error) {
            console.error('Erro ao deletar imagem do Cloudinary:', error)
        }
    }
}