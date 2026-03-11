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
exports.MongoUserRepository = void 0;
const UserModel_1 = require("../database/models/UserModel");
class MongoUserRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.UserModel.create(Object.assign(Object.assign({}, data), { createdAt: new Date() }));
            return user.toJSON();
        });
    }
    findMany() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield UserModel_1.UserModel.find();
            return users;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.UserModel.findById(id);
            return user ? user.toJSON() : null;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.UserModel.findOne({ email });
            return user ? user.toJSON() : null;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.UserModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, data), { updatedAt: new Date() }), { new: true });
            return user ? user.toJSON() : null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield UserModel_1.UserModel.findByIdAndDelete(id);
        });
    }
}
exports.MongoUserRepository = MongoUserRepository;
