import {
    CreateSubscriptionData,
    Subscription,
} from '../../core/entities/Subscription';

export interface SubscriptionRepository {
    create(data: CreateSubscriptionData): Promise<Subscription>;
    findMany(idUser: string): Promise<Subscription[] | null>;
    update(id: string): Promise<Subscription | null>;
    delete(id: string): Promise<void>;
}
