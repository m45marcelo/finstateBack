import {
    CreateSubscriptionData,
    Subscription,
    UpdatedSubscriptionData,
} from '../../core/entities/Subscription';

export interface FindSubscriptionFilter {
    idUser: string;
    startDate?: Date;
    endDate?: Date
}

export interface SubscriptionRepository {
    create(data: CreateSubscriptionData): Promise<Subscription>;
    findMany(filter: FindSubscriptionFilter): Promise<Subscription[]>;
    update(id: string, data: UpdatedSubscriptionData): Promise<Subscription | null>;
    delete(id: string): Promise<void>;
}

