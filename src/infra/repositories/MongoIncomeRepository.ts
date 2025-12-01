import { FindIncomesfilter, IncomeRepository } from "../../application/repositories/IncomeRepository";
import { CreatedIncomeData, Income, UpdatedIncomeData } from "../../core/entities/Income";
import { NotFoundError } from "../../shared/errors";
import { IncomeSchema } from "../database/models/IncomeModel";

export class MongoIncomeRepository implements IncomeRepository {
    async create(data: CreatedIncomeData): Promise<Income> {
        const income = await IncomeSchema.create({
            ...data,
            createdAt: new Date()
        });

        return income.toJSON();
    }

    async findById(id: string): Promise<Income | null> {
        const income = await IncomeSchema.findById(id);

        return income ? income?.toJSON() : null;
    }

    async findMany(filter: FindIncomesfilter): Promise<Income[]> {
        const query: any = { idUser: filter.idUser };

        if(filter.category) {
            query.category = filter.category;
        }

        if(filter.startDate || filter.endDate) {
            query.createdAt = {};

            if(filter.startDate) {
                query.createdAt.$gte = filter.startDate
            }

            if(filter.endDate) {
                query.createdAt.$lte = filter.endDate
            }
        }

        const incomes = await IncomeSchema.find(query).sort({ createdAt: -1 });

        return incomes.map(income => income.toJSON());
    }

    async update(id: string, data: UpdatedIncomeData): Promise<Income | null> {
        const income = await IncomeSchema.findByIdAndUpdate(
            id,
            {
                ...data,
                updatedAt: new Date()
            },
            { new: true }
        )

        return income ? income.toJSON() : null;
    }

    async delete(id: string): Promise<void> {
        await IncomeSchema.findByIdAndDelete(id);
    }

    async getTotalByUser(idUser: string): Promise<number> {
        const result = await IncomeSchema.aggregate([
            { $match: { idUser } },
            { $group: { _id: null, total: { $sum: '$value'} } }
        ])

        return result.length > 0 ? result[0].total : 0;
    }
}
