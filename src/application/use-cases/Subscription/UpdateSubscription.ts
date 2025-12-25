import { Subscription, SubscriptionCategories, SubscriptionFrequencies, SubscriptionStatus, UpdatedSubscriptionData } from "../../../core/entities/Subscription";
import { NotFoundError, ValidationError } from "../../../shared/errors";
import { SubscriptionRepository } from "../../repositories/SubscriptionRepository";

interface UpdateSubscriptionRequest {
    id: string;
    description?: string;
    value?: number;
    frequency?: SubscriptionFrequencies;
    status?: SubscriptionStatus;
    startDate?: Date;
    category?: SubscriptionCategories;
    nextPay?: Date;
}

interface UpdateSubscriptionReponse {
    newSubscription: Subscription | null;
}

export class UpdateSubscriptionUseCase{
    constructor(
        private subscriptionRepository: SubscriptionRepository,
    ) {}

    async execute({id, description, value, frequency, status, startDate, category, nextPay}: UpdateSubscriptionRequest):Promise<UpdateSubscriptionReponse>{
        const subscription = await this.subscriptionRepository.findById(id);

        if(!subscription){
            throw new NotFoundError('Despesa recorrente não encontrada');
        }

        if(value){
            if(value < 0) {
                throw new ValidationError('O valor tem que ser maior que zero');
            }
        }

        const updateSubscriptionData: UpdatedSubscriptionData = {
            description,
            value,
            frequency,
            status,
            startDate,
            category,
            nextPay
        }

        const newSubscription = await this.subscriptionRepository.update(id, updateSubscriptionData);

        return{
            newSubscription
        }
    }
}