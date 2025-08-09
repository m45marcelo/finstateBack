import {
    BudgetStatus,
    GeneralBudget,
    UpdateGeneralBudgetData,
} from '../../../core/entities/Budgets';
import { NotFoundError } from '../../../shared/errors';
import { GeneralBudgetRepository } from '../../repositories/BudgetsRepository';
interface UpdateGeneralBudgetRequest {
    idUser: string;
    limit?: number;
    spent?: number;
    remaining?: number;
    status?: BudgetStatus;
}

interface UpdateGeneralBudgetResponse {
    newGeneralBudget: GeneralBudget;
}

export class UpdateGeneralBudgetUseCase {
    constructor(private generalBudgetRepository: GeneralBudgetRepository) {}

    async execute({
        idUser,
        limit,
        spent,
        remaining,
        status,
    }: UpdateGeneralBudgetRequest): Promise<UpdateGeneralBudgetResponse | null> {
        const generalBudget =
            await this.generalBudgetRepository.findByIdUser(idUser);

        if (!generalBudget) {
            throw new NotFoundError('Orçamento geral não encontrado');
        }

        const id = generalBudget.id;

        const data: UpdateGeneralBudgetData = {
            limit,
            spent,
            remaining,
            status,
        };

        const newGeneralBudget = await this.generalBudgetRepository.update(
            id,
            data,
        );

        if (!newGeneralBudget) {
            throw new NotFoundError('Orçamento geral não encontrado');
        }

        return {
            newGeneralBudget,
        };
    }
}
