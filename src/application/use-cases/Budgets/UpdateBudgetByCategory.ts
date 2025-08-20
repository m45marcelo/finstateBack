import {
    BudgetByCategory,
    BudgetStatus,
    UpdateBudgetByCategoryData,
} from '../../../core/entities/Budgets';
import { MongoBudgetByCategoryRepository } from '../../../infra/repositories/MongoBudgetByCategoryRepository';
import { NotFoundError } from '../../../shared/errors';

interface UpdateBudgetByCategoryRequest {
    idUser: string;
    idBudget: string;
    limit?: number;
    spent?: number;
    remaining?: number;
    status?: BudgetStatus;
}

interface UpdateBudgetByCategoryResponse {
    newBudgetByCategory: BudgetByCategory | null;
}

export class UpdateBudgetByCategoryUseCase {
    constructor(
        private budgetByCategoryRepository: MongoBudgetByCategoryRepository,
    ) {}

    async execute({
        idUser,
        idBudget,
        limit,
        spent,
        remaining,
        status,
    }: UpdateBudgetByCategoryRequest): Promise<UpdateBudgetByCategoryResponse | null> {
        const theBudgetExist = await this.budgetByCategoryRepository.findById(idBudget);

        if(!theBudgetExist){
            throw new NotFoundError('Orçamento não encontrado');
        }

        const updateBudgetByCategoryData: UpdateBudgetByCategoryData = {
            limit,
            spent,
            remaining,
            status,
        };

        const newBudgetByCategory = await this.budgetByCategoryRepository.update(idBudget ,updateBudgetByCategoryData);

        return {
            newBudgetByCategory
        }
    }
}
