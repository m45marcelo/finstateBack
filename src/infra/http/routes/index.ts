import { Router } from 'express';
import { userRoutes } from './user/userRoutes';
import { expenseRoutes } from './expense/expenseRoutes';
import { incomeRoutes } from './income/incomeRoutes';
import { subscriptionRoutes } from './subscription/subscriptionRoutes';
import { generalBudgetRoutes } from './budgets/generalBudgetRoutes';

const routes = Router();

routes.get('/', (req, res) => {
    res.json({
        message: 'FinState API',
        version: '1.0.0',
        status: 'online',
        timestamp: new Date().toISOString(),
    });
});

routes.use(userRoutes);
routes.use(expenseRoutes);
routes.use(incomeRoutes);
routes.use(subscriptionRoutes);
routes.use(generalBudgetRoutes);

export { routes };
