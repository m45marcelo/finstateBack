import { GeneralBudget } from '../../../core/entities/Budgets';
import { GeneralBudgetRepository } from '../../repositories/BudgetsRepository';

interface GetGeneralBudgetRequest {
    idUser: string;
}

interface GetGeneralBudgetResponse {
    generalBudget: GeneralBudget[];
}

export class GetGeneralBudgetUseCase {
    constructor(private generalBudgetRepository: GeneralBudgetRepository) {}

    async execute({
        idUser,
    }: GetGeneralBudgetRequest): Promise<GetGeneralBudgetResponse> {
        const generalBudget = await this.generalBudgetRepository.findByIdUser(idUser);
        
        return {
            generalBudget,
        };
    }
}
