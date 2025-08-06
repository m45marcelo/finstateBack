import { GeneralBudgetRepository } from "../../application/repositories/BudgetsRepository";
import { CreateGeneralBudgetData, GeneralBudget, UpdateGeneralBudget } from "../../core/entities/Budgets";
import { GeneralBudgetModel } from "../database/models/generalBudgetModel";

export class MongoGeneralBudgetRepository implements GeneralBudgetRepository {
    async create(data: CreateGeneralBudgetData): Promise<GeneralBudget> {
        const generalBudget = await GeneralBudgetModel.create(
            {
                ...data,
                createdAt: new Date()
            }
        )

        return generalBudget.toJSON();
    }

    async findByIdUser(idUser: string): Promise<GeneralBudget[]> {
        const generalBudget = await GeneralBudgetModel.find({idUser: idUser});

        return generalBudget.map((budget) => budget.toJSON());
    }

    async update(id: string, data: UpdateGeneralBudget): Promise<GeneralBudget | null> {
        const generalBudget = await GeneralBudgetModel.findByIdAndUpdate(
            id,
            {
                ...data,
                updatedAt: new Date()
            },
            { new: true }
        );

        return generalBudget ? generalBudget.toJSON() : null;
    }

    async delete(id: string): Promise<void> {
        await GeneralBudgetModel.findByIdAndDelete(id);
    }
}