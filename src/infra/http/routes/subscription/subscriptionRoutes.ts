import { Request, Router } from "express";
import { SubscriptionController } from "../../controllers/SubscriptionController";
import { authMiddleware } from "../../middlewares/authMiddleware";

const subscriptionRoutes = Router();

const subscriptionController = new SubscriptionController();

subscriptionRoutes.use(authMiddleware);

subscriptionRoutes.post('subscription', (res, req, next) =>
    subscriptionController.createSubscription(res, req).catch(next)
)

export { subscriptionRoutes }