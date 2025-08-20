import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../../../shared/errors';


const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if(file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new ValidationError('Apenas imagens são permitidas'))
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1
    }
})

export const uploadAvatar = upload.single('avatar');

export const handleUploaderror = (
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
): void => {
    if(error instanceof multer.MulterError) {
        if(error.code === 'LIMIT_FILE_SIZE') {
            throw new ValidationError('Arquivo muito grande. Tamanho máximo: 5MB')
        }
        if(error.code === 'LIMIT_UNEXPECTED_FILE') {
            throw new ValidationError('Campo de arquivo inválido. Use o campo "avatar"')
        }
        throw new ValidationError(`Erro no upload: ${error.message}`)
    }

    next(error)
}