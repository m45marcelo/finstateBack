import { Request, Response } from 'express'
import { GetCategorySummaryUseCase } from '../../../application/use-cases/Transaction/GetCategorySummary'
import { MongoExpenseRepository } from '../../../infra/repositories/MongoExpenseRepository'
import { MongoIncomeRepository } from '../../../infra/repositories/MongoIncomeRepository'
import { z } from 'zod'

const getSummarySchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional()
})

export class DashboardController {

  async getCategorySummary(request: Request, response: Response): Promise<Response> {
    const { startDate, endDate } = getSummarySchema.parse(request.query)
    const idUser = request.user.id

    const expenseRepository = new MongoExpenseRepository()
    const incomeRepository = new MongoIncomeRepository()
    const getCategorySummaryUseCase = new GetCategorySummaryUseCase(
      expenseRepository,
      incomeRepository
    )

    const result = await getCategorySummaryUseCase.execute({
      idUser,
      startDate,
      endDate
    })

    return response.json(result)
  }
}