import { NextFunction, Request, Response, Router } from 'express';
import { UserController } from '../../controllers/UserController';
import { authMiddleware } from '../../middlewares/authMiddleware';
import {
    handleUploaderror,
    uploadAvatar,
} from '../../middlewares/uploadMiddleware';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/signup', (req, res, next) => {
    userController.createUser(req, res).catch(next);
});

userRoutes.post('/login', (req, res, next) => {
    userController.authenticateUser(req, res).catch(next);
});

userRoutes.get("/me", authMiddleware, (req, res, next) => {
    userController.me(req, res).catch(next)
});

userRoutes.post("/logout", userController.logoutUser);

userRoutes.get('/users', authMiddleware, (req, res, next) => {
    userController.getAllUsers(res).catch(next);
});

userRoutes.patch('/me', authMiddleware, (req, res, next) => {
    userController.updateUser(req, res).catch(next)
})

userRoutes.patch(
    '/profile/avatar',
    authMiddleware,
    uploadAvatar,
    handleUploaderror,
    (req: Request, res: Response, next: NextFunction) => {
        userController.uploadAvatar(req, res).catch(next);
    },
);

userRoutes.delete('/profile/avatar', authMiddleware, (req, res, next) => {
    userController.deleteAvatar(req, res).catch(next); 
})

export { userRoutes };
