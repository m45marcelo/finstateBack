import { Request, Response } from "express";
import { CreateBudgetByCategoryUseCase } from "../../../application/use-cases/Budgets/CreateBudgetByCategory";
import { MongoBudgetByCategoryRepository } from "../../repositories/MongoBudgetByCategoryRepository";
import { MongoUserRepository } from "../../repositories/MongoUserRepository";
import { createBudgetByCategorySchema } from "../validators/budgetByCategoryValidateSchema";
import { BudgetCategories } from "../../../core/entities/Budgets";

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
}