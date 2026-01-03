import { Request, Response } from 'express';
import {
    createExpenseSchema,
    getAllExpensesSchema,
} from '../validators/expenseValidationSchema';
import { MongoExpenseRepository } from '../../repositories/MongoExpenseRepository';
import { CreateExpenseUseCase } from '../../../application/use-cases/Expense/CreateExpense';
import { MongoUserRepository } from '../../repositories/MongoUserRepository';
import { ExpenseCategory } from '../../../core/entities/Expense';
import { GetAllExpensesUseCase } from '../../../application/use-cases/Expense/GetAllExpenses';
import { MongoGeneralBudgetRepository } from '../../repositories/MongoGeneralBudgetRepository';

export class ExpenseController {
    async createExpense(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { description, value, category } = createExpenseSchema.parse(
            request.body,
        );

        const idUser = request.user.id;

        const userRepository = new MongoUserRepository();
        const expenseRepository = new MongoExpenseRepository();
        const generalBudgetRepository = new MongoGeneralBudgetRepository();
        const createExpenseUseCase = new CreateExpenseUseCase(
            expenseRepository,
            userRepository,
            generalBudgetRepository
        );

        const result = await createExpenseUseCase.execute({
            idUser,
            description,
            value,
            category: category as ExpenseCategory,
        });

        return response.status(200).json(result);
    }

    async getAllExpenses(request: Request, response: Response): Promise<Response> {
        const { category, description, startDate, endDate, page, limit } = getAllExpensesSchema.parse(request.query)
        const idUser = request.user.id
    
        const expenseRepository = new MongoExpenseRepository()
        const getExpensesUseCase = new GetAllExpensesUseCase(expenseRepository)
    
        const result = await getExpensesUseCase.execute({
          idUser,
          description,
          category,
          startDate,
          endDate,
          page,
          limit
        })
    
        return response.json(result)
      }
}
