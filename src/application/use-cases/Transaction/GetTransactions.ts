import type { ExpenseRepository } from "../../../application/repositories/ExpenseRepository";
import type { IncomeRepository } from "../../../application/repositories/IncomeRepository";
import {
	expenseToTransaction,
	incomeToTransaction,
	type Transaction,
	type TransactionType,
} from "../../../core/entities/Transaction";
import type { PaginationMeta } from "../../../shared/types/pagination";
import type { SubscriptionRepository } from "../../repositories/SubscriptionRepository";

interface GetTransactionsRequest {
	idUser: string;
	type?: TransactionType;
	category?: string;
	description?: string;
	startDate?: string;
	endDate?: string;
	page?: number;
	limit?: number;
}

interface GetTransactionsResponse {
	transactions: Transaction[];
	summary: {
		totalExpenses: number;
		totalIncomes: number;
		balance: number;
	};
	pagination: PaginationMeta;
}

export class GetTransactionsUseCase {
	constructor(
		private expenseRepository: ExpenseRepository,
		private subscriptionRepository: SubscriptionRepository,
		private incomeRepository: IncomeRepository,
	) {}

	async execute({
		idUser,
		type,
		category,
		description,
		startDate,
		endDate,
		page = 1,
		limit = 10,
	}: GetTransactionsRequest): Promise<GetTransactionsResponse> {
		const filter = {
			idUser,
			category,
			description,
			startDate: startDate ? new Date(startDate) : undefined,
			endDate: endDate ? new Date(endDate) : undefined,
		};

		const allTransactions: Transaction[] = [];

		if (!type || type === "expense" || type === "subscription") {
			const expenses = await this.expenseRepository.findMany(filter);
			const subscriptions = await this.subscriptionRepository.findMany(filter);
			allTransactions.push(...expenses.map(expenseToTransaction));
			allTransactions.push(...subscriptions.map(expenseToTransaction));
		}

		if (!type || type === "income") {
			const incomes = await this.incomeRepository.findMany(filter);

			allTransactions.push(...incomes.map(incomeToTransaction));
		}

		allTransactions.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		);

		const totalExpenses = allTransactions
			.filter((t) => t.type === "expense")
			.reduce((sum, t) => sum + t.value, 0);

		const totalIncomes = allTransactions
			.filter((t) => t.type === "income")
			.reduce((sum, t) => sum + t.value, 0);

		const balance = totalIncomes - totalExpenses;

		const totalItems = allTransactions.length;
		const totalPages = Math.ceil(totalItems / limit);
		const startIndex = (page - 1) * limit;
		const endIndex = startIndex + limit;
		const paginatedTransactions = allTransactions.slice(startIndex, endIndex);

		return {
			transactions: paginatedTransactions,
			summary: {
				totalExpenses,
				totalIncomes,
				balance,
			},
			pagination: {
				currentPage: page,
				itemsPerPage: limit,
				totalItems,
				totalPages,
				hasNextPage: page < totalPages,
				hasPreviousPage: page > 1,
			},
		};
	}
}
