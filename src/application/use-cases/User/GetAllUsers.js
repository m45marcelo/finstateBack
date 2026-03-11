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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUsersUseCase = void 0;
const errors_1 = require("../../../shared/errors");
class GetAllUsersUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.findMany();
            if (users.length === 0) {
                throw new errors_1.NotFoundError('Ainda não existem usuários registrados');
            }
            return { users };
        });
    }
}
exports.GetAllUsersUseCase = GetAllUsersUseCase;
