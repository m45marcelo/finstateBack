import { Router } from "express";
import { GeneralBudgetController } from "../../controllers/GeneralBudgetController";
import { authMiddleware } from "../../middlewares/authMiddleware";

const generalBudgetRoutes = Router();
const generalBudgetController = new GeneralBudgetController();

generalBudgetRoutes.use(authMiddleware);

generalBudgetRoutes.post('/general-budget', (req, res, next) => {
    generalBudgetController.createGeneralBudget(req, res).catch(next);
});

generalBudgetRoutes.get('/general-budget', (req, res, next) => {
    generalBudgetController.getGeneralBudget(req, res).catch(next);
})

export { generalBudgetRoutes }