import { Expense, ExpenseCategory } from "../../../core/entities/Expense";
import { ExpenseRepository, FindExpensesfilter } from "../../repositories/ExpenseRepository";

interface GetExpensesRequest {
    idUser: string;
    category?: ExpenseCategory;
    startDate?: Date;
    endDate?: Date;
}

interface GetExpensesResponse {
    expenses: Expense[];
    total: number;
}

export class GetAllExpensesUseCase {
    constructor(private expenseRepository: ExpenseRepository) {}

    async execute({ idUser, category, startDate, endDate }: GetExpensesRequest): Promise<GetExpensesResponse> {
        let fullEndDate: Date | undefined;

        if(endDate){
            fullEndDate = new Date(endDate);
            fullEndDate.setUTCHours(23, 59, 59, 999);
        }
        const filter: FindExpensesfilter = {
            idUser,
            category,
            startDate: startDate? new Date(startDate) : undefined,
            endDate: fullEndDate
        }

        const expenses = await this.expenseRepository.findMany(filter);

        const total = expenses.reduce((sum, expense) => sum + expense.value, 0);

        return {
            expenses,
            total
        }
    }
}