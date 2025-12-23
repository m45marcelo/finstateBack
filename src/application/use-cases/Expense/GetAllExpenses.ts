import { Expense, ExpenseCategory } from "../../../core/entities/Expense";
import { ExpenseRepository, FindExpensesFilter } from "../../repositories/ExpenseRepository";

interface GetAllExpensesRequest {
    idUser: string
    category?: ExpenseCategory
    startDate?: Date
    endDate?: Date
    page?: number
    limit?: number
}

interface GetAllExpensesResponse {
    expenses: Expense[]
    total: number
    pagination?: {
    currentPage: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
    }
}
export class GetAllExpensesUseCase {
    constructor(private expenseRepository: ExpenseRepository) {}

    async execute({ idUser, category, startDate, endDate, page = 1, limit = 10 }: GetAllExpensesRequest): Promise<GetAllExpensesResponse> {
        let fullEndDate: Date | undefined;

        if(endDate){
            fullEndDate = new Date(endDate);
            fullEndDate.setUTCHours(23, 59, 59, 999);
        }
        const filter: FindExpensesFilter = {
            idUser,
            category,
            startDate: startDate? new Date(startDate) : undefined,
            endDate: fullEndDate
        }

        const result = await this.expenseRepository.findManyPaginated(filter, {
            page,
            limit
        })
          // Calcular total das despesas da página atual
        const total = result.data.reduce((sum, expense) => sum + expense.value, 0)
        return {
            expenses: result.data,
            total,
            pagination: result.meta
        }
    }
}