import {
    BudgetByCategoryFilter,
    BudgetByCategoryRepository,
} from '../../application/repositories/BudgetsRepository';
import {
    CreateBudgetByCategoryData,
    BudgetByCategory,
} from '../../core/entities/Budgets';
import { BudgetByCategoryModel } from '../database/models/budgetByCategoryModel';

export class MongoBudgetByCategoryRepository
    implements BudgetByCategoryRepository
{
    async create(data: CreateBudgetByCategoryData): Promise<BudgetByCategory> {
        const budgetByCategory = await BudgetByCategoryModel.create({
            ...data,
            createdAt: new Date(),
        });

        return budgetByCategory.toJSON();
    }

    async findMany(
        filter: BudgetByCategoryFilter,
    ): Promise<BudgetByCategory[]> {
        const query: any = { idUser: filter.idUser };

        const budgetsByCategory = await BudgetByCategoryModel.find(query).sort({
            createdAt: -1,
        });

        return budgetsByCategory.map((budgetByCategory) =>
            budgetByCategory.toJSON(),
        );
    }

    async update(
        id: string,
        data: BudgetByCategoryFilter,
    ): Promise<BudgetByCategory | null> {
        const budgetByCategory = await BudgetByCategoryModel.findByIdAndUpdate(
            id,
            {
                ...data,
                updatedAt: new Date(),
            },
            { new: true },
        );

        return budgetByCategory ? budgetByCategory.toJSON() : null;
    }

    async delete(id: string): Promise<void> {
        await BudgetByCategoryModel.findByIdAndDelete(id)
    }
}
