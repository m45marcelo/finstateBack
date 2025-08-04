import { Request, Router } from 'express';
import { SubscriptionController } from '../../controllers/SubscriptionController';
import { authMiddleware } from '../../middlewares/authMiddleware';

const subscriptionRoutes = Router();

const subscriptionController = new SubscriptionController();

subscriptionRoutes.use(authMiddleware);

subscriptionRoutes.post('/subscription', (req, res, next) =>
    subscriptionController.createSubscription(req, res).catch(next),
);

subscriptionRoutes.get('/subscriptions', (req, res, next) => 
    subscriptionController.getAllSubscriptions(req, res).catch(next),
);

export { subscriptionRoutes };
