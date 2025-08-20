import { GeneralBudget } from '../../../core/entities/Budgets';
import { NotFoundError } from '../../../shared/errors';
import { GeneralBudgetRepository } from '../../repositories/BudgetsRepository';

interface GetGeneralBudgetRequest {
    idUser: string;
}

interface GetGeneralBudgetResponse {
    generalBudget: GeneralBudget;
}

export class GetGeneralBudgetUseCase {
    constructor(private generalBudgetRepository: GeneralBudgetRepository) {}

    async execute({
        idUser,
    }: GetGeneralBudgetRequest): Promise<GetGeneralBudgetResponse> {
        const generalBudget =
            await this.generalBudgetRepository.findByIdUser(idUser);

        if (!generalBudget) {
            throw new NotFoundError('O Usuário ainda não tem um orçamento geral criado');
        }
        return {
            generalBudget,
        };
    }
}
