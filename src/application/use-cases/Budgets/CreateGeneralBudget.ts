import {
    BudgetCategories,
    BudgetStatus,
    CreateGeneralBudgetData,
    GeneralBudget,
} from '../../../core/entities/Budgets';
import {
    ConflictError,
    NotFoundError,
    ValidationError,
} from '../../../shared/errors';
import { GeneralBudgetRepository } from '../../repositories/BudgetsRepository';
import { UserRepository } from '../../repositories/UserRepository';

interface CreateGeneralBudgetRequest {
    idUser: string;
    limit: number;
}

interface CreateGeneralBudgetResponse {
    generalBudget: GeneralBudget;
}
export class CreateGeneralBudgetUseCase {
    constructor(
        private generalBudgetRepository: GeneralBudgetRepository,
        private userRepository: UserRepository,
    ) {}

    async execute({
        idUser,
        limit,
    }: CreateGeneralBudgetRequest): Promise<CreateGeneralBudgetResponse> {
        const user = await this.userRepository.findById(idUser);
        const userHasBudget =
            await this.generalBudgetRepository.findByIdUser(idUser);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        if (limit <= 0) {
            throw new ValidationError('Limite tem que ser maior que zero');
        }

        if (userHasBudget.length === 1) {
            throw new ConflictError('O usuário já possui um orçamento geral');
        }

        const generalBudgetData: CreateGeneralBudgetData = {
            idUser,
            limit,
        };

        const generalBudget =
            await this.generalBudgetRepository.create(generalBudgetData);

        return {
            generalBudget,
        };
    }
}
