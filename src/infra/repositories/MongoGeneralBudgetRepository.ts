import { GeneralBudgetRepository } from "../../application/repositories/BudgetsRepository";
import { CreateGeneralBudgetData, GeneralBudget, UpdateGeneralBudgetData } from "../../core/entities/Budgets";
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

    async findByIdUser(idUser: string): Promise<GeneralBudget | null> {
        const generalBudget = await GeneralBudgetModel.findOne({idUser: idUser});

        return generalBudget ? generalBudget.toJSON() : null;
    }

    async update(id: string, data: UpdateGeneralBudgetData): Promise<GeneralBudget | null> {
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