import {
    CreatedSubscriptionData,
    Subscription,
    SubscriptionCategories,
    SubscriptionFrequencies,
} from '../../../core/entities/Subscription';
import { NotFoundError, ValidationError } from '../../../shared/errors';
import { SubscriptionRepository } from '../../repositories/SubscriptionRepository';
import { UserRepository } from '../../repositories/UserRepository';

interface CreateSubscriptionRequest {
    idUser: string;
    description: string;
    value: number;
    frequency: SubscriptionFrequencies;
    category: SubscriptionCategories;
    startDate: Date;
    nextPay: Date;
}

interface CreatedSubscriptionResponse {
    subscription: Subscription
}

export class CreateSubscriptionUseCase {
    constructor(
        private subscriptionRepository: SubscriptionRepository,
        private userRepository: UserRepository
    ) {}

    async execute({idUser, description, value, frequency, category, startDate, nextPay}: CreateSubscriptionRequest): Promise<CreatedSubscriptionResponse> {
        const user = await this.userRepository.findById(idUser);

        if(!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        if(value < 0) {
            throw new ValidationError('O valor tem que ser maior que zero');
        }

        const subscriptionData: CreatedSubscriptionData = {
            idUser,
            description: description.trim(),
            value,
            frequency,
            category,
            startDate,
            nextPay,
            status: "Pendente"
        }

        const subscription = await this.subscriptionRepository.create(subscriptionData);

        return {
            subscription
        }
    }
}