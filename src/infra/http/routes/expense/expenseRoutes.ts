import { Router } from "express";
import { ExpenseController } from "../../controllers/ExpenseController";
import { authMiddleware } from "../../middlewares/authMiddleware";

const expenseRoutes = Router();
const expenseController = new ExpenseController();

expenseRoutes.use(authMiddleware);

expenseRoutes.post('/expense', (req, res, next) => {
    expenseController.createExpense(req, res).catch(next);
});

expenseRoutes.get('/expenses', (req, res, next) => {
    expenseController.getAllExpenses(req, res).catch(next);
});

expenseRoutes.delete("/expense", (req, res, next) => {
    expenseController.deleteExpense(req, res).catch(next);
})

export { expenseRoutes };
