import type {
	ExpenseRepository,
	FindExpensesFilter,
} from "../../application/repositories/ExpenseRepository";
import { DeleteExpenseResponse } from "../../application/use-cases/Expense/DeleteExpense";
import type {
	CreatedExpenseData,
	Expense,
	UpdatedExpenseData,
} from "../../core/entities/Expense";
import type {
	PaginatedResponse,
	PaginationParams,
} from "../../shared/types/pagination";
import { ExpenseModel } from "../database/models/expenseModel";

export class MongoExpenseRepository implements ExpenseRepository {
	async create(data: CreatedExpenseData): Promise<Expense> {
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

	async findMany(filter: FindExpensesFilter): Promise<Expense[]> {
		const query = this.buildQuery(filter);

		const expenses = await ExpenseModel.find(query).sort({ createdAt: -1 });

		return expenses.map((expense) => expense.toJSON());
	}

	async findManyPaginated(
		filter: FindExpensesFilter,
		pagination: PaginationParams,
	): Promise<PaginatedResponse<Expense>> {
		const query = this.buildQuery(filter);

		// Calcular skip (quantos registros pular)
		const skip = (pagination.page - 1) * pagination.limit;

		// Buscar dados paginados e contar total
		const [expenses, totalItems] = await Promise.all([
			ExpenseModel.find(query)
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(pagination.limit),
			ExpenseModel.countDocuments(query),
		]);

		// Calcular metadados da paginação
		const totalPages = Math.ceil(totalItems / pagination.limit);

		return {
			data: expenses.map((expense) => expense.toJSON()),
			meta: {
				currentPage: pagination.page,
				itemsPerPage: pagination.limit,
				totalItems,
				totalPages,
				hasNextPage: pagination.page < totalPages,
				hasPreviousPage: pagination.page > 1,
			},
		};
	}

	async update(id: string, data: UpdatedExpenseData): Promise<Expense | null> {
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

	async delete(id: string): Promise<Expense | null> {
		const expense = await ExpenseModel.findByIdAndDelete(id);

		return expense ? expense.toJSON() : null;
	}

	async getTotalByUser(idUser: string): Promise<number> {
		const result = await ExpenseModel.aggregate([
			{ $match: { idUser } },
			{ $group: { _id: null, total: { $sum: "$value" } } },
		]);

		return result.length > 0 ? result[0].total : 0;
	}

	private buildQuery(filter: FindExpensesFilter): any {
		const query: any = { idUser: filter.idUser };

		if (filter.description) {
			query.description = { $regex: filter.description, $options: "i" };
		}

		if (filter.category) {
			query.category = filter.category;
		}

		if (filter.startDate || filter.endDate) {
			query.createdAt = {};

			if (filter.startDate) {
				query.createdAt.$gte = filter.startDate;
			}

			if (filter.endDate) {
				query.createdAt.$lte = filter.endDate;
			}
		}

		return query;
	}
}
