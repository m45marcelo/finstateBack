import { Request, Response } from "express";
import { createIncomeSchema, getAllIncomesSchema } from "../validators/incomeValidationSchema";
import { MongoUserRepository } from "../../repositories/MongoUserRepository";
import { MongoIncomeRepository } from "../../repositories/MongoIncomeRepository";
import { CreateIncomeUseCase } from "../../../application/use-cases/Income/CreateIncome";
import { IncomeCategory } from "../../../core/entities/Income";
import { GetAllIncomesUseCase } from "../../../application/use-cases/Income/GetAllIncomes";

export class IncomeController {
    async createIncome(request: Request, response: Response): Promise<Response> {
        const { description, value, category } = createIncomeSchema.parse(request.body);
        const idUser = request.user.id;

        const userRepository = new MongoUserRepository();
        const incomeRepository = new MongoIncomeRepository();

        const createIncomeUseCase = new CreateIncomeUseCase(incomeRepository, userRepository);

        const result = await createIncomeUseCase.execute({
            idUser,
            description,
            value,
            category: category as IncomeCategory
        });

        return response.status(200).json(result);

    }

    async getAllIncomes(request: Request, response: Response) : Promise<Response> {
        const { category, startDate, endDate } = getAllIncomesSchema.parse(request.query);
        const idUser = request.user.id;

        const incomeRepository = new MongoIncomeRepository()
        const getAllIncomesUseCase = new GetAllIncomesUseCase(incomeRepository);

        const result = await getAllIncomesUseCase.execute({
            idUser,
            category,
            startDate,
            endDate
        })

        return response.json(result)
    }
}
