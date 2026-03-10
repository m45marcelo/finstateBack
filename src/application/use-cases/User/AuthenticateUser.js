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
exports.AuthenticateUserUseCase = void 0;
const bcryptjs_1 = require("bcryptjs");
const errors_1 = require("../../../shared/errors");
const jsonwebtoken_1 = require("jsonwebtoken");
const env_1 = require("../../../infra/env");
class AuthenticateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password, }) {
            const user = yield this.userRepository.findByEmail(email);
            if (!user) {
                throw new errors_1.UnauthorizedError('Email ou senha inválidos');
            }
            const passwordMatches = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!passwordMatches) {
                throw new errors_1.UnauthorizedError('Email ou senha inválidos');
            }
            const token = (0, jsonwebtoken_1.sign)({}, env_1.env.JWT_SECRET, {
                subject: user.id,
                expiresIn: '7d',
            });
            const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
            return {
                user: userWithoutPassword,
                token,
            };
        });
    }
}
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;
