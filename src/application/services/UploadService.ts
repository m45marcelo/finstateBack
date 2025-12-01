export interface UploadResult {
    publicId: string;
    url: string;
    secureUrl: string;
}

export interface UploadService {
    uploadImage(buffer: Buffer, folder: string, publicId?: string): Promise<UploadResult>
    deleteImage(publicId: string): Promise<void>
}