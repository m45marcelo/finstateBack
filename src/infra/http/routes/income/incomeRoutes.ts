import { Router } from 'express';
import { IncomeController } from '../../controllers/IncomeController';
import { authMiddleware } from '../../middlewares/authMiddleware';

const incomeRoutes = Router();
const incomeController = new IncomeController();

incomeRoutes.use(authMiddleware);

incomeRoutes.post('/income', (req, res, next) => {
    incomeController.createIncome(req, res).catch(next);
});

incomeRoutes.get('/incomes', (req, res, next) => {
    incomeController.getAllIncomes(req, res).catch(next);
})

export { incomeRoutes };
