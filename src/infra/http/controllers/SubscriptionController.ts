import { Request, Response } from 'express';
import { createSubscriptionSchema } from '../validators/subscriptionValidator';
import { MongoSubscriptionRepository } from '../../repositories/MongoSubscriptionRepository';
import { MongoUserRepository } from '../../repositories/MongoUserRepository';
import { CreateSubscriptionUseCase } from '../../../application/use-cases/Subscription/CreateSubscription';
import { SubscriptionCategories } from '../../../core/entities/Subscription';

export class SubscriptionController {
    async createSubscription(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, value, frequency, category, nextPay } =
            createSubscriptionSchema.parse(request.body);

        const idUser = request.user.id;

        const userRepository = new MongoUserRepository();
        const subscriptionRepository = new MongoSubscriptionRepository();

        const createSubscriptionUseCase = new CreateSubscriptionUseCase(
            subscriptionRepository,
            userRepository,
        );

        const result = await createSubscriptionUseCase.execute({
            idUser,
            name,
            value,
            frequency: frequency as SubscriptionCategories,
            category: category as SubscriptionCategories,
            nextPay,
        });

        return response.status(200).json(result);
    }
}
