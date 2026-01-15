import { ConflictError, UnauthorizedError } from "../../../shared/errors";
import { SubscriptionRepository } from "../../repositories/SubscriptionRepository";

interface DeleteSubscriptionRequest {
    idUser: string;
    id: string;
}

export class DeleteSubscriptionUseCase {
    constructor(private subscriptionRepository: SubscriptionRepository) {}

    async execute({
        idUser,
        id
    }: DeleteSubscriptionRequest): Promise<void>{
        const existingSubscription = await this.subscriptionRepository.findById(id);

        if(existingSubscription?.idUser !== idUser){
            console.log("idUser=", existingSubscription?.idUser, "idUser=",idUser)
            throw new UnauthorizedError("Ocorreu um erro ao tentar deletar essa transação")
        }
        if(!existingSubscription){
            throw new ConflictError('Despesa não encontrada');
        }

        await this.subscriptionRepository.delete(id);
    }
}