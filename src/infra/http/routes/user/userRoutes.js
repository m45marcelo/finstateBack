"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const UserController_1 = require("../../controllers/UserController");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const uploadMiddleware_1 = require("../../middlewares/uploadMiddleware");
const userRoutes = (0, express_1.Router)();
exports.userRoutes = userRoutes;
const userController = new UserController_1.UserController();
userRoutes.post('/signup', (req, res, next) => {
    userController.createUser(req, res).catch(next);
});
userRoutes.post('/login', (req, res, next) => {
    userController.authenticateUser(req, res).catch(next);
});
userRoutes.get("/me", authMiddleware_1.authMiddleware, (req, res, next) => {
    userController.me(req, res).catch(next);
});
userRoutes.post("/logout", userController.logoutUser);
userRoutes.get('/users', authMiddleware_1.authMiddleware, (req, res, next) => {
    userController.getAllUsers(res).catch(next);
});
userRoutes.patch('/me', authMiddleware_1.authMiddleware, (req, res, next) => {
    userController.updateUser(req, res).catch(next);
});
userRoutes.patch('/profile/avatar', authMiddleware_1.authMiddleware, uploadMiddleware_1.uploadAvatar, uploadMiddleware_1.handleUploaderror, (req, res, next) => {
    userController.uploadAvatar(req, res).catch(next);
});
userRoutes.delete('/profile/avatar', authMiddleware_1.authMiddleware, (req, res, next) => {
    userController.deleteAvatar(req, res).catch(next);
});
