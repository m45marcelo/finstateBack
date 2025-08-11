import { BudgetByCategory, BudgetCategories, BudgetStatus } from "../../../core/entities/Budgets";
import { MongoBudgetByCategoryRepository } from "../../../infra/repositories/MongoBudgetByCategoryRepository";
import { BudgetByCategoryFilter } from "../../repositories/BudgetsRepository";

interface GetBudgetsByCategoryRequest {
    idUser: string;
    status?: BudgetStatus;
}

interface GetBudgetsByCategoryResponse {
    budgetsByCategory: BudgetByCategory[];
}

export class GetBudgetsByCategoryUseCase {
    constructor(private budgetByCategoryRepository: MongoBudgetByCategoryRepository){}

    async execute({ idUser, status }: GetBudgetsByCategoryRequest): Promise<GetBudgetsByCategoryResponse | null> {
        const filter: BudgetByCategoryFilter = {
            idUser,
            status
        }
    
        const budgetsByCategory = await this.budgetByCategoryRepository.findMany(filter);

        return {
            budgetsByCategory
        }
    }
}