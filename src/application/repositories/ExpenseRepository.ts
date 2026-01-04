import { Expense, CreatedExpenseData, UpdatedExpenseData } from '../../core/entities/Expense'
import { PaginatedResponse, PaginationParams } from '../../shared/types/pagination'

export interface FindExpensesFilter {
  idUser: string
  description?: string;
  category?: string
  startDate?: Date
  endDate?: Date
}

export interface ExpenseRepository {
  create(data: CreatedExpenseData): Promise<Expense>
  findById(id: string): Promise<Expense | null>
  findMany(filter: FindExpensesFilter): Promise<Expense[]>
  findManyPaginated(filter: FindExpensesFilter, pagination: PaginationParams): Promise<PaginatedResponse<Expense>>
  update(id: string, data: UpdatedExpenseData): Promise<Expense | null>
  delete(id: string): Promise<void>
  getTotalByUser(idUser: string): Promise<number>
}