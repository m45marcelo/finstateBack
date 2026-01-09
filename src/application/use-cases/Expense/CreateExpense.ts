import { BudgetStatus } from '../../../core/entities/Budgets';
import {
    CreatedExpenseData,
    Expense,
    ExpenseCategory,
} from '../../../core/entities/Expense';

import { NotFoundError, ValidationError } from '../../../shared/errors';
import { GeneralBudgetRepository } from '../../repositories/BudgetsRepository';
import { ExpenseRepository } from '../../repositories/ExpenseRepository';
import { UserRepository } from '../../repositories/UserRepository';
import { UpdateGeneralBudgetUseCase } from '../Budgets/UpdateGeneralBudget';

interface CreateExpenseRequest {
    idUser: string;
    description: string;
    value: number;
    category: ExpenseCategory;
}

interface CreateExpenseResponse {
    expense: Expense;
}

export class CreateExpenseUseCase {
    constructor(
        private expenseRepository: ExpenseRepository,
        private userRepository: UserRepository,
        private generalBudgetRepository: GeneralBudgetRepository,
    ) {}

    async execute({
        idUser,
        description,
        value,
        category,
    }: CreateExpenseRequest): Promise<CreateExpenseResponse> {
        const user = await this.userRepository.findById(idUser);
        const generalBudget =
            await this.generalBudgetRepository.findByIdUser(idUser);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        if (value < 0) {
            throw new ValidationError('O valor deve ser maior que zero');
        }

        const expenseData: CreatedExpenseData = {
            idUser,
            description: description.trim(),
            value,
            category,
        };

        if (generalBudget) {
            const updateGeneralBudgetUseCase = new UpdateGeneralBudgetUseCase(
                this.generalBudgetRepository,
            );
            const spent = generalBudget.spent + value;
            const remaining = generalBudget.limit - spent;
            let status: BudgetStatus = 'off';

            if (spent > generalBudget.limit) status = 'exceeded';
            else if (spent < generalBudget.limit) status = 'free';
            else status = 'achieved';

            await updateGeneralBudgetUseCase.execute({
                idUser,
                spent,
                remaining,
                status,
            });
        }

        const expense = await this.expenseRepository.create(expenseData);

        return {
            expense,
        };
    }
}
