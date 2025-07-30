import { Router } from 'express';
import { IncomeController } from '../../controllers/IncomeController';
import { authMiddleware } from '../../middlewares/authMiddleware';

const incomeRoutes = Router();
const incomeController = new IncomeController();

incomeRoutes.use(authMiddleware);

incomeRoutes.post('/incomes', (res, req, next) => {
    incomeController.createIncome(res, req).catch(next);
});

export { incomeRoutes };
