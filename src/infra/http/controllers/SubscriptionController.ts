import { Request, Response } from 'express';
import { createSubscriptionSchema, getAllSubscriptionsSchema } from '../validators/subscriptionValidationSchema';
import { MongoSubscriptionRepository } from '../../repositories/MongoSubscriptionRepository';
import { MongoUserRepository } from '../../repositories/MongoUserRepository';
import { CreateSubscriptionUseCase } from '../../../application/use-cases/Subscription/CreateSubscription';
import { SubscriptionCategories } from '../../../core/entities/Subscription';
import { GetAllSubscriptionUseCase } from '../../../application/use-cases/Subscription/GetAllSubscriptions';

export class SubscriptionController {
    async createSubscription(request: Request, response: Response): Promise<Response> {
        const { description, value, frequency, category, nextPay } =
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
            description,
            value,
            frequency: frequency as SubscriptionCategories,
            category: category as SubscriptionCategories,
            nextPay,
        });

        return response.status(200).json(result);
    }

    async getAllSubscriptions(request: Request, response: Response): Promise<Response>{
        const { startDate, endDate } = getAllSubscriptionsSchema.parse(request.query);

        const idUser = request.user.id;

        const subscriptionRepository = new MongoSubscriptionRepository();
        const getAllSubscriptionsUseCase = new GetAllSubscriptionUseCase(subscriptionRepository);

        const result = await getAllSubscriptionsUseCase.execute({
            idUser,
            startDate,
            endDate
        })

        return response.json(result);
    }
}

