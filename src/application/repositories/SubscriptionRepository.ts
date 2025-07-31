import {
    CreateSubscriptionData,
    Subscription,
    UpdatedSubscriptionData,
} from '../../core/entities/Subscription';

export interface SubscriptionRepository {
    create(data: CreateSubscriptionData): Promise<Subscription>;
    findMany(idUser: string): Promise<Subscription[]>;
    update(id: string, data: UpdatedSubscriptionData): Promise<Subscription | null>;
    delete(id: string): Promise<void>;
}
