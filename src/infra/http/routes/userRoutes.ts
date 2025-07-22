import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/users', (req, res, next) => {
    userController.create(req, res).catch(next);
})



export { userRoutes }