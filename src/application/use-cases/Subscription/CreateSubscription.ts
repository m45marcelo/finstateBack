import {
    CreateSubscriptionData,
    Subscription,
    SubscriptionCategories,
    SubscriptionFrequencies,
} from '../../../core/entities/Subscription';
import { NotFoundError, ValidationError } from '../../../shared/errors';
import { SubscriptionRepository } from '../../repositories/SubscriptionRepository';
import { UserRepository } from '../../repositories/UserRepository';

interface CreateSubscriptionRequest {
    idUser: string;
    name: string;
    value: number;
    frequency: SubscriptionFrequencies;
    category: SubscriptionCategories;
    nextPay: Date;
}

interface CreateSubscriptionResponse {
    subscription: Subscription
}

export class CreateSubscriptionUseCase {
    constructor(
        private subscriptionRepository: SubscriptionRepository,
        private userRepository: UserRepository
    ) {}

    async execute({idUser, name, value, frequency, category, nextPay}: CreateSubscriptionRequest): Promise<CreateSubscriptionResponse> {
        const user = await this.userRepository.findById(idUser);

        if(!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        if(value < 0) {
            throw new ValidationError('O valor tem que ser maior que zero');
        }

        const subscriptionData: CreateSubscriptionData = {
            idUser,
            name: name.trim(),
            value,
            frequency,
            category,
            nextPay
        }

        const subscription = await this.subscriptionRepository.create(subscriptionData);

        return {
            subscription
        }
    }
}