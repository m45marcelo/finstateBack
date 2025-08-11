import {
    BudgetByCategoryFilter,
    BudgetByCategoryRepository,
} from '../../application/repositories/BudgetsRepository';
import {
    CreateBudgetByCategoryData,
    BudgetByCategory,
    UpdateBudgetByCategoryData,
} from '../../core/entities/Budgets';
import { BudgetByCategoryModel } from '../database/models/budgetByCategoryModel';

export class MongoBudgetByCategoryRepository
    implements BudgetByCategoryRepository
{
    async create(data: CreateBudgetByCategoryData): Promise<BudgetByCategory> {
        const budget = await BudgetByCategoryModel.create({
            ...data,
            createdAt: new Date(),
        });

        return budget.toJSON();
    }

    async findMany(
        filter: BudgetByCategoryFilter,
    ): Promise<BudgetByCategory[]> {
        //const query: any = { idUser: filter.idUser };

        const budgets = await BudgetByCategoryModel.find(filter).sort({
            createdAt: -1,
        });

        return budgets.map((budgetByCategory) =>
            budgetByCategory.toJSON(),
        );
    }

    async update(
        id: string,
        data: UpdateBudgetByCategoryData,
    ): Promise<BudgetByCategory | null> {
        const budget = await BudgetByCategoryModel.findByIdAndUpdate(
            id,
            {
                ...data,
                updatedAt: new Date(),
            },
            { new: true },
        );

        return budget ? budget.toJSON() : null;
    }

    async delete(id: string): Promise<void> {
        await BudgetByCategoryModel.findByIdAndDelete(id)
    }
}
