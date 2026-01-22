import { Request, Response } from 'express'
import { GetTransactionsUseCase } from '../../../application/use-cases/Transaction/GetTransactions'
import { MongoExpenseRepository } from '../../../infra/repositories/MongoExpenseRepository'
import { MongoIncomeRepository } from '../../../infra/repositories/MongoIncomeRepository'
import { getTransactionsSchema } from '../../../infra/http/validators/transactionValidationSchema'
import { TransactionType } from '../../../core/entities/Transaction'
import { MongoSubscriptionRepository } from '../../repositories/MongoSubscriptionRepository'

export class TransactionController {
  async list(request: Request, response: Response): Promise<Response> {
    
    const { type, description, category, startDate, endDate, page, limit } = getTransactionsSchema.parse(request.query)

    const idUser = request.user.id

    const expenseRepository = new MongoExpenseRepository()
    const subscriptionRepository = new MongoSubscriptionRepository()
    const incomeRepository = new MongoIncomeRepository()
    const getTransactionsUseCase = new GetTransactionsUseCase(expenseRepository, subscriptionRepository, incomeRepository)

    const result = await getTransactionsUseCase.execute({
      idUser,
      description,
      type: type as TransactionType | undefined,
      category,
      startDate,
      endDate,
      page,
      limit
    })

    return response.json(result)
  }
}