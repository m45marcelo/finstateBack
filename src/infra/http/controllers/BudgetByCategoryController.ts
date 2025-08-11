import { Request, Response } from "express";
import { CreateBudgetByCategoryUseCase } from "../../../application/use-cases/Budgets/CreateBudgetByCategory";
import { MongoBudgetByCategoryRepository } from "../../repositories/MongoBudgetByCategoryRepository";
import { MongoUserRepository } from "../../repositories/MongoUserRepository";
import { createBudgetByCategorySchema, getBudgetByCategorySchema } from "../validators/budgetByCategoryValidateSchema";
import { BudgetCategories, BudgetStatus } from "../../../core/entities/Budgets";
import { GetBudgetsByCategoryUseCase } from "../../../application/use-cases/Budgets/GetBudgetsByCategory";

export class BudgetByCategoryController {
    async createBudgetByCategory(request: Request, response: Response): Promise<Response> {
        const { category, limit } = createBudgetByCategorySchema.parse(request.body);
        const idUser = request.user.id
        const budgetByCategoryRepository = new MongoBudgetByCategoryRepository();
        const userRepository = new MongoUserRepository();

        const createBudgetByCategoryUseCase = new CreateBudgetByCategoryUseCase(budgetByCategoryRepository, userRepository);

        const result = await createBudgetByCategoryUseCase.execute({
            idUser,
            category: category as BudgetCategories,
            limit
        }) 

        return response.status(200).json(result);
    }

    async getBudgetByCategory(request: Request, response: Response): Promise<Response> {
        const { status } = getBudgetByCategorySchema.parse(request.body);
        const idUser = request.user.id;

        const budgetByCategoryRepository = new MongoBudgetByCategoryRepository();
        const getBudgetByCategoryUseCase = new GetBudgetsByCategoryUseCase(budgetByCategoryRepository);

        const result = await getBudgetByCategoryUseCase.execute({idUser, status: status as BudgetStatus});

        return response.json(result);
    }

    
}