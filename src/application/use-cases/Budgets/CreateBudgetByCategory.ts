import { BudgetByCategory, BudgetCategories, CreateBudgetByCategoryData } from "../../../core/entities/Budgets";
import { MongoBudgetByCategoryRepository } from "../../../infra/repositories/MongoBudgetByCategoryRepository";
import { MongoUserRepository } from "../../../infra/repositories/MongoUserRepository";
import { ConflictError, NotFoundError, ValidationError } from "../../../shared/errors";

interface CreateBudgetByCategoryRequest {
    idUser: string;
    category: BudgetCategories;
    limit: number;
}

interface CreateBudgetByCategoryResponse {
    budgetByCategory: BudgetByCategory;
}

export class CreateBudgetByCategoryUseCase {
    constructor(
                private budgetByCategoryRepository: MongoBudgetByCategoryRepository,
                private userRepository: MongoUserRepository
            ) {}

    async execute({ idUser, category, limit }: CreateBudgetByCategoryRequest): Promise<CreateBudgetByCategoryResponse> {
        const filter = {
            idUser,
            category
        }

        const user = await this.userRepository.findById(idUser);

        if(!user){
            throw new NotFoundError('Usuário não encontrado');
        }

        const userHasBudgetInCategory = await this.budgetByCategoryRepository.findMany(filter);

        if(userHasBudgetInCategory.length > 0){
            throw new ConflictError("Já existe um orçamento feito com essa categoria");
        }

        if(limit < 0){
            throw new ValidationError('O limite tem que ser maior que zero');
        }

        const budgetByCategoryData: CreateBudgetByCategoryData = {
            idUser,
            category, 
            limit,
            spent: 0, 
            remaining: limit,
            status: "off",
        }

        const budgetByCategory = await this.budgetByCategoryRepository.create(budgetByCategoryData)

        return {
            budgetByCategory
        }
    }
}