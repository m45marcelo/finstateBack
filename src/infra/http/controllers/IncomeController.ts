import { Request, Response } from "express";
import { createIncomeSchema } from "../validators/incomeValidation";
import { MongoUserRepository } from "../../repositories/MongoUserRepository";
import { MongoIncomeRepository } from "../../repositories/MongoIncomeRepository";
import { CreateIncomeUseCase } from "../../../application/use-cases/Income/CreateIncome";
import { IncomeCategory } from "../../../core/entities/Income";

export class IncomeController {
    async createIncome(request: Request, response: Response): Promise<Response> {
        const { name, value, category } = createIncomeSchema.parse(request.body);

        const idUser = request.user.id;

        const userRepository = new MongoUserRepository();
        const incomeRepository = new MongoIncomeRepository();

        const createIncomeUseCase = new CreateIncomeUseCase(incomeRepository, userRepository);

        const result = await createIncomeUseCase.execute({
            idUser,
            name,
            value,
            category: category as IncomeCategory
        });

        return response.status(200).json(result);

    }
}
