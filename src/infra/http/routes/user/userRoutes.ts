import { Router } from 'express';
import { UserController } from '../../controllers/UserController';
import { authMiddleware } from '../../middlewares/authMiddleware';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/singup', (req, res, next) => {
    userController.createUser(req, res).catch(next);
});

userRoutes.post('/login', (req, res, next) => {
    userController.authenticateUser(req, res).catch(next);
});

userRoutes.get('/users', authMiddleware, (req, res, next) => {
    userController.getAllUsers(res).catch(next);
});

export { userRoutes };
