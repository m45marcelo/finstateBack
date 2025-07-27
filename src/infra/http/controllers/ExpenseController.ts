import { Request, Response } from 'express';
import { createExpenseSchema, getAllExpensesSchema } from '../validators/expenseValidateSchema';
import { MongoExpenseRepository } from '../../repositories/MongoExpenseRepository';
import { CreateExpenseUseCase } from '../../../application/use-cases/Expense/CreateExpense';
import { MongoUserRepository } from '../../repositories/MongoUserRepository';
import { ExpenseCategory } from '../../../core/entities/Expense';
import { GetAllExpensesUseCase } from '../../../application/use-cases/Expense/GetAllExpenses';

export class ExpenseController {
    async createExpense(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, value, category } = createExpenseSchema.parse(request.body);
        
        const idUser = request.user.id;

        const userRepository = new MongoUserRepository();
        const expenseRepository = new MongoExpenseRepository();
        const createExpenseUseCase = new CreateExpenseUseCase(
            expenseRepository,
            userRepository,
        );

        const result = await createExpenseUseCase.execute({
            idUser,
            name,
            value,
            category: category as ExpenseCategory,
        });

        return response.status(200).json(result);
    }

    async getAllExpenses(request: Request, response: Response): Promise<Response> {
        const { category, startDate, endDate } = getAllExpensesSchema.parse(request.query);
        console.log(category, startDate, endDate)
        const idUser = request.user.id;

        const expenseRepository = new MongoExpenseRepository();
        const getAllExpensesUseCase = new GetAllExpensesUseCase(expenseRepository);

        const result = await getAllExpensesUseCase.execute({
            idUser,
            category,
            startDate,
            endDate
        });

        return response.json(result);
    }
}
