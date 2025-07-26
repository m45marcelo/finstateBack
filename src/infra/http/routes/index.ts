import { Router } from 'express';
import { userRoutes } from './user/userRoutes';
import { expenseRoutes } from './expense/expenseRoutes';

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

export { routes };
