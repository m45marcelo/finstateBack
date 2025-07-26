import { Expense, ExpenseCategory } from "../../../core/entities/Expense";
import { ExpenseRepository, FindExpensesfilter } from "../../repositories/ExpenseRepository";

interface GetExpensesRequest {
    idUser: string;
    category?: ExpenseCategory;
    startDate?: string;
    endDate?: string;
}

interface GetExpensesResponse {
    expenses: Expense[];
    total: number;
}

export class GetExpensesUseCase {
    constructor(private expenseRepository: ExpenseRepository) {}

    async execute({ idUser, category, startDate, endDate }: GetExpensesRequest): Promise<GetExpensesResponse> {
        const filter: FindExpensesfilter = {
            idUser,
            category,
            startDate: startDate? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined
        }

        const expenses = await this.expenseRepository.findMany(filter);

        const total = expenses.reduce((sum, expense) => sum + expense.value, 0);

        return {
            expenses,
            total
        }
    }
}