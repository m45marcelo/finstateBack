import { ExpenseRepository } from '../../../application/repositories/ExpenseRepository'
import { IncomeRepository } from '../../../application/repositories/IncomeRepository'
import { Transaction, TransactionType, expenseToTransaction, incomeToTransaction } from '../../../core/entities/Transaction'
import { PaginationMeta } from '../../../shared/types/pagination'

interface GetTransactionsRequest {
  idUser: string
  type?: TransactionType
  category?: string
  startDate?: string
  endDate?: string
  page?: number
  limit?: number
}

interface GetTransactionsResponse {
  transactions: Transaction[]
  summary: {
    totalExpenses: number
    totalIncomes: number
    balance: number
  }
  pagination: PaginationMeta
}

export class GetTransactionsUseCase {
  constructor(
    private expenseRepository: ExpenseRepository,
    private incomeRepository: IncomeRepository
  ) {}

  async execute({
    idUser,
    type,
    category,
    startDate,
    endDate,
    page = 1,
    limit = 10
  }: GetTransactionsRequest): Promise<GetTransactionsResponse> {
    const filter = {
      idUser,
      category,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined
    }

    let allTransactions: Transaction[] = []

    if (!type || type === 'expense') {
      const expenses = await this.expenseRepository.findMany(filter)
      allTransactions.push(...expenses.map(expenseToTransaction))
    }

    if (!type || type === 'income') {
      const incomes = await this.incomeRepository.findMany(filter)
      allTransactions.push(...incomes.map(incomeToTransaction))
    }

    allTransactions.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    const totalExpenses = allTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.value, 0)

    const totalIncomes = allTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.value, 0)

    const balance = totalIncomes - totalExpenses

    const totalItems = allTransactions.length
    const totalPages = Math.ceil(totalItems / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedTransactions = allTransactions.slice(startIndex, endIndex)

    return {
      transactions: paginatedTransactions,
      summary: {
        totalExpenses,
        totalIncomes,
        balance
      },
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    }
  }
}