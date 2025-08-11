import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { BudgetByCategoryController } from '../../controllers/BudgetByCategoryController';

const budgetByCategoryRoutes = Router();
const budgetByCategoryController = new BudgetByCategoryController();

budgetByCategoryRoutes.use(authMiddleware);

budgetByCategoryRoutes.post('/budget-by-category', (req, res, next) => {
    budgetByCategoryController.createBudgetByCategory(req, res).catch(next);
});

budgetByCategoryRoutes.get('/budget-by-category', (req, res, next) => {
    budgetByCategoryController.getBudgetByCategory(req, res).catch(next);
})

export { budgetByCategoryRoutes };
