import { BudgetCategories, BudgetStatus, CreateGeneralBudgetData, GeneralBudget } from "../../../core/entities/Budgets";
import { NotFoundError, ValidationError } from "../../../shared/errors";
import { GeneralBudgetRepository } from "../../repositories/BudgetsRepository";
import { UserRepository } from "../../repositories/UserRepository";

interface CreateGeneralBudgetRequest {
    idUser: string;
    category: BudgetCategories;
    limit: number;
    spent: number;
    remaining: number;
    status: BudgetStatus;
}

interface CreateGeneralBudgetResponse {
    generalBudget: GeneralBudget;
}
export class CreateGeneralBudgetUseCase{
    constructor(private generalBudgetRepository: GeneralBudgetRepository, private userRepository: UserRepository) {}

    async execute({ idUser, category, limit, spent, remaining, status }: CreateGeneralBudgetRequest): Promise<CreateGeneralBudgetResponse> {
        const user = await this.userRepository.findById(idUser);

        if(!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        if(limit <= 0) {
            throw new ValidationError('Limite tem que ser maior que zero');
        }

        const generalBudgetData: CreateGeneralBudgetData = {
            idUser,
            category,
            limit,
            spent,
            remaining,
            status
        }

        const generalBudget = await this.generalBudgetRepository.create(generalBudgetData);

        return {
            generalBudget
        }
    }
}