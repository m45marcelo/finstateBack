"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUploaderror = exports.uploadAvatar = void 0;
const multer_1 = __importDefault(require("multer"));
const errors_1 = require("../../../shared/errors");
const storage = multer_1.default.memoryStorage();
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    else {
        cb(new errors_1.ValidationError('Apenas imagens são permitidas'));
    }
};
const upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1
    }
});
exports.uploadAvatar = upload.single('avatar');
const handleUploaderror = (error, request, response, next) => {
    if (error instanceof multer_1.default.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            throw new errors_1.ValidationError('Arquivo muito grande. Tamanho máximo: 5MB');
        }
        if (error.code === 'LIMIT_UNEXPECTED_FILE') {
            throw new errors_1.ValidationError('Campo de arquivo inválido. Use o campo "avatar"');
        }
        throw new errors_1.ValidationError(`Erro no upload: ${error.message}`);
    }
    next(error);
};
exports.handleUploaderror = handleUploaderror;
