import {
    CreatedSubscriptionData,
    Subscription,
    UpdatedSubscriptionData,
} from '../../core/entities/Subscription';

export interface FindSubscriptionFilter {
    idUser: string;
    startDate?: Date;
    endDate?: Date
}

export interface SubscriptionRepository {
    create(data: CreatedSubscriptionData): Promise<Subscription>;
    findMany(filter: FindSubscriptionFilter): Promise<Subscription[]>;
    findById(id: string): Promise<Subscription | null>;
    update(id: string, data: UpdatedSubscriptionData): Promise<Subscription | null>;
    delete(id: string): Promise<void>;
}

