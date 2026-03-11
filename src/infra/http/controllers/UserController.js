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
exports.UserController = void 0;
const userValidationSchemas_1 = require("../validators/userValidationSchemas");
const MongoUserRepository_1 = require("../../repositories/MongoUserRepository");
const CreateUser_1 = require("../../../application/use-cases/User/CreateUser");
const GetAllUsers_1 = require("../../../application/use-cases/User/GetAllUsers");
const AuthenticateUser_1 = require("../../../application/use-cases/User/AuthenticateUser");
const errors_1 = require("../../../shared/errors");
const CloudinaryUploadService_1 = require("../../storage/CloudinaryUploadService");
const UploadUserAvatar_1 = require("../../../application/use-cases/User/UploadUserAvatar");
const DeleteUserAvatar_1 = require("../../../application/use-cases/User/DeleteUserAvatar");
const UpdateUser_1 = require("../../../application/use-cases/User/UpdateUser");
class UserController {
    createUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = userValidationSchemas_1.createUserSchema.parse(request.body);
            const userRepository = new MongoUserRepository_1.MongoUserRepository();
            const createUserUseCase = new CreateUser_1.CreateUserUseCase(userRepository);
            const result = yield createUserUseCase.execute({
                name,
                email,
                password,
            });
            return response.status(201).json(result);
        });
    }
    authenticateUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = userValidationSchemas_1.AuthenticateUserSchema.parse(request.body);
            const userRepository = new MongoUserRepository_1.MongoUserRepository();
            const authenticateUserUserCase = new AuthenticateUser_1.AuthenticateUserUseCase(userRepository);
            const authenticatedUser = yield authenticateUserUserCase.execute({
                email,
                password,
            });
            const { token, user } = authenticatedUser;
            response.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                path: "/",
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });
            return response.json({ user });
        });
    }
    logoutUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            response.clearCookie("token", {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                path: "/",
            });
            return response.status(200).json({ message: "Logout realizado com sucesso" });
        });
    }
    updateUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, email } = userValidationSchemas_1.UpdateUserSchema.parse(request.body);
            const userRepository = new MongoUserRepository_1.MongoUserRepository();
            const updateUserUseCase = new UpdateUser_1.UpdateUserUseCase(userRepository);
            const result = yield updateUserUseCase.execute({
                id,
                name,
                email
            });
            return response.json(result);
        });
    }
    me(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = new MongoUserRepository_1.MongoUserRepository();
            const user = yield userRepository.findById(request.user.id);
            if (!user) {
                return response.status(404).json({ message: "Usuário não encontrado" });
            }
            const { password } = user, userWithoutPassword = __rest(user, ["password"]);
            return response.json({ user: userWithoutPassword });
        });
    }
    getAllUsers(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = new MongoUserRepository_1.MongoUserRepository();
            const getAllUsersUseCase = new GetAllUsers_1.GetAllUsersUseCase(userRepository);
            const result = yield getAllUsersUseCase.execute();
            return response.status(200).json(result);
        });
    }
    uploadAvatar(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!request.file) {
                throw new errors_1.ValidationError('Nenhuma imagem foi enviada');
            }
            console.log("informações image:", request.file);
            const userRepository = new MongoUserRepository_1.MongoUserRepository();
            const uploadService = new CloudinaryUploadService_1.CloudinaryUploadService();
            const uploadUserAvatarUseCase = new UploadUserAvatar_1.UploadUserAvatarUseCase(userRepository, uploadService);
            const result = yield uploadUserAvatarUseCase.execute({
                idUser: request.user.id,
                imageBuffer: request.file.buffer,
                mimetype: request.file.mimetype,
                size: request.file.size,
            });
            return response.json(result);
        });
    }
    deleteAvatar(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = new MongoUserRepository_1.MongoUserRepository();
            const uploadService = new CloudinaryUploadService_1.CloudinaryUploadService();
            const deleteUserAvatarUseCase = new DeleteUserAvatar_1.DeleteUserAvatarUseCase(userRepository, uploadService);
            const result = yield deleteUserAvatarUseCase.execute({
                idUser: request.user.id,
            });
            return response.json(result);
        });
    }
}
exports.UserController = UserController;
