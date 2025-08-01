import { SubscriptionRepository } from '../../application/repositories/SubscriptionRepository';
import {
    CreateSubscriptionData,
    Subscription,
    UpdatedSubscriptionData,
} from '../../core/entities/Subscription';
import { subscriptionModel } from '../database/models/subscriptionModel';

export class MongoSubscriptionRepository implements SubscriptionRepository {
    async create(data: CreateSubscriptionData): Promise<Subscription> {
        const subscription = await subscriptionModel.create({
            ...data,
            createdAt: new Date(),
        });

        return subscription.toJSON();
    }

    async findMany(idUser: string): Promise<Subscription[]> {
        const subscriptions = await subscriptionModel
            .find({ userId: idUser })
            .sort({ createdAt: -1 });

        return subscriptions.map((subscription) => subscription.toJSON());
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
