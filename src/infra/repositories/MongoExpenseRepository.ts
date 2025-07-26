import {
    ExpenseRepository,
    FindExpensesfilter,
} from '../../application/repositories/ExpenseRepository';
import {
    CreateExpenseData,
    Expense,
    UpdateExpenseData,
} from '../../core/entities/Expense';
import { ExpenseModel } from '../database/models/expenseModel';

export class MongoExpenseRepository implements ExpenseRepository {
    async create(data: CreateExpenseData): Promise<Expense> {
        const expense = await ExpenseModel.create({
            ...data,
            createdAt: new Date(),
        });

        return expense.toJSON();
    }

    async findById(id: string): Promise<Expense | null> {
        const expense = await ExpenseModel.findById(id);

        return expense ? expense.toJSON() : null;
    }

    async findMany(filter: FindExpensesfilter): Promise<Expense[]> {
        const query: any = { idUser: filter.idUser };

        if (filter.category) {
            query.category = filter.category;
        }

        if (filter.startDate || filter.endDate) {
            query.createdAt.$gte = filter.startDate;
        }

        if (filter.endDate) {
            query.createdAt.$lte = filter.endDate;
        }

        const expenses = await ExpenseModel.find(query).sort({ createAt: -1 });

        return expenses.map((expense) => expense.toJSON());
    }

    async update(id: string, data: UpdateExpenseData): Promise<Expense | null> {
        const expense = await ExpenseModel.findByIdAndUpdate(
            id,
            {
                ...data,
                updatedAt: new Date(),
            },
            { new: true },
        );

        return expense ? expense.toJSON() : null;
    }

    async delete(id: string): Promise<void> {
        await ExpenseModel.findByIdAndDelete(id);
    }

    async getTotalByUser(idUser: string): Promise<number> {
        const result = await ExpenseModel.aggregate([
            { $match: { idUser } },
            { $group: { _id: null, total: { $sum: '$value' }}}
        ])

        return result.length > 0 ? result[0].total : 0;
    }
}
