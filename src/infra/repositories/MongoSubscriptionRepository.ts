import { FindSubscriptionFilter, SubscriptionRepository } from '../../application/repositories/SubscriptionRepository';
import {
    CreatedSubscriptionData,
    Subscription,
    UpdatedSubscriptionData,
} from '../../core/entities/Subscription';
import { subscriptionModel } from '../database/models/subscriptionModel';

export class MongoSubscriptionRepository implements SubscriptionRepository {
    async create(data: CreatedSubscriptionData): Promise<Subscription> {
        const subscription = await subscriptionModel.create({
            ...data,
            createdAt: new Date(),
        });

        return subscription.toJSON();
    }

    async findMany(filter: FindSubscriptionFilter): Promise<Subscription[]> {

        const query: any = { idUser: filter.idUser };

        if(filter.startDate || filter.endDate) {
            query.createdAt = {};

            if(filter.startDate) {
                query.createdAt.$gte = filter.startDate;
            }

            if(filter.endDate) {
                query.createdAt.$lte = filter.endDate;
            }
        }
        const subscriptions = await subscriptionModel.find(query).sort({ createdAt: -1 });

        return subscriptions.map((subscription) => subscription.toJSON());
    }

    async findById(id: string): Promise<Subscription | null> {
        const subscription = await subscriptionModel.findById(id);

        return subscription ? subscription.toJSON() : null;
    }

    async update(id: string, data: UpdatedSubscriptionData): Promise<Subscription | null> {
        const subscription = await subscriptionModel.findByIdAndUpdate(
            id,
            {
                ...data,
                updatedAt: new Date()
            },
            {
                new: true
            }
        )

        return subscription ? subscription.toJSON() : null;
    }

    async delete(id: string): Promise<void> {
        await subscriptionModel.findByIdAndDelete(id);
    }
}
