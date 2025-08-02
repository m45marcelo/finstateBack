import { Subscription } from "../../../core/entities/Subscription";
import { MongoSubscriptionRepository } from "../../../infra/repositories/MongoSubscriptionRepository";

interface GetAllSubscriptionRequest {
    idUser: string;
    startDate?: Date;
    endDate?: Date;
}

interface GetAllSubscriptionResponse {
    subscriptions: Subscription[],
    total: number;
}

export class GetAllSubscriptionUseCase {
    constructor(private subscriptionRepository: MongoSubscriptionRepository) {}

    async execute({ idUser, startDate, endDate }: GetAllSubscriptionRequest): Promise<GetAllSubscriptionResponse> {
        let fullEndDate: Date | undefined;

        if(endDate) {
            fullEndDate = new Date(endDate);
            fullEndDate.setUTCHours(23, 59, 59, 999);
        }

        const filter = {
            idUser,
            startDate,
            endDate
        }
        const subscriptions = await this.subscriptionRepository.findMany(filter);

        const total = subscriptions.reduce((sum, subscription) => sum + subscription.value, 0)

        return {
            subscriptions,
            total
        }
    }
}