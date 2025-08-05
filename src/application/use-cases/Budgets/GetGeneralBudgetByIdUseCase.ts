import { GeneralBudget } from '../../../core/entities/Budgets';
import { NotFoundError } from '../../../shared/errors';
import { GeneralBudgetRepository } from '../../repositories/BudgetsRepository';

interface GetGeneralBudgetByIdRequest {
    id: string;
}

interface GetGeneralBudgetByIdResponse {
    generalBudget: GeneralBudget;
}

export class GetGeneralBudgetByIdUseCase {
    constructor(private generalBudgetRepository: GeneralBudgetRepository) {}

    async execute({
        id,
    }: GetGeneralBudgetByIdRequest): Promise<GetGeneralBudgetByIdResponse> {
        const generalBudget = await this.generalBudgetRepository.findById(id);

        if (!generalBudget) {
            throw new NotFoundError('Orçamento não encontrado');
        }

        return {
            generalBudget,
        };
    }
}
