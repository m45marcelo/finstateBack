import { Request, Response } from 'express';
import { createExpenseSchema, getAllExpensesSchema } from '../validators/expenseValidateSchema';
import { MongoExpenseRepository } from '../../repositories/MongoExpenseRepository';
import { CreateExpenseUseCase } from '../../../application/use-cases/Expense/CreateExpense';
import { MongoUserRepository } from '../../repositories/MongoUserRepository';
import { ExpenseCategory } from '../../../core/entities/Expense';
import { GetAllUsersUseCase } from '../../../application/use-cases/User/GetAllUsers';

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
        const { category, startDate, endDate } = getAllExpensesSchema.parse(request.body);

        const userRepository = new MongoUserRepository();
        const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);

        const result = await getAllUsersUseCase.execute();

        return response.json(result);
    }
}
