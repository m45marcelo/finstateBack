import { Request, response, Response } from "express";
import { createGeneralBudgetSchema } from "../validators/generalBudgetValidateSchema";
import { MongoGeneralBudgetRepository } from "../../repositories/MongoGeneralBudgetRepository";
import { CreateGeneralBudgetUseCase } from "../../../application/use-cases/Budgets/CreateGeneralBudget";
import { MongoUserRepository } from "../../repositories/MongoUserRepository";
import { GetGeneralBudgetUseCase } from "../../../application/use-cases/Budgets/GetGeneralBudgetUseCase";

export class GeneralBudgetController {
    async createGeneralBudget(request: Request, response: Response): Promise<Response> {
        const { limit } = createGeneralBudgetSchema.parse(request.body);
        const idUser = request.user.id;

        const generalBudgetRepository = new MongoGeneralBudgetRepository();
        const userRepository = new MongoUserRepository()
        const createGeneralBudgetUseCase = new CreateGeneralBudgetUseCase(generalBudgetRepository, userRepository);


        const result = await createGeneralBudgetUseCase.execute({
            idUser,
            limit 
        })

        return response.status(200).json(result);
    }

    async getGeneralBudget(request: Request, response: Response): Promise<Response> {
        const idUser = request.user.id;

        const generalBugetRepository = new MongoGeneralBudgetRepository();

        const getGeneralBudgetUseCase = new GetGeneralBudgetUseCase(generalBugetRepository);

        const result = await getGeneralBudgetUseCase.execute({idUser});
        
        return response.json(result);
    }
}