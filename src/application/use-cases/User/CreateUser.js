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
exports.CreateUserUseCase = void 0;
const errors_1 = require("../../../shared/errors");
const bcryptjs_1 = require("bcryptjs");
class CreateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password, }) {
            const existingUser = yield this.userRepository.findByEmail(email);
            if (existingUser) {
                throw new errors_1.ConflictError('Email já cadastrado');
            }
            const hashedPassword = yield (0, bcryptjs_1.hash)(password, 6);
            const userData = {
                name,
                email,
                password: hashedPassword,
            };
            const user = yield this.userRepository.create(userData);
            const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
            return {
                user: userWithoutPassword,
            };
        });
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
