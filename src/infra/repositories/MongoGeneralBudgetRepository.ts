import { GeneralBudgetFilter, GeneralBudgetRepository } from "../../application/repositories/BudgetsRepository";
import { CreateGeneralBudgetData, GeneralBudget, UpdateGeneralBudget } from "../../core/entities/Budgets";
import { NotFoundError } from "../../shared/errors";
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

    async findMany(filter: GeneralBudgetFilter): Promise<GeneralBudget[]> {
        const query: any = { idUser: filter.iduser };

        const generalBudgets = await GeneralBudgetModel.find(query).sort({ createdAt: -1});

        return generalBudgets.map((generalBudgets) => generalBudgets.toJSON());
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