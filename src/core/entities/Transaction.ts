import type { Expense, ExpenseCategory } from "./Expense";
import type { Income, IncomeCategory } from "./Income";

export type TransactionType = "expense" | "income" | "subscription";

export interface Transaction {
	id: string;
	idUser: string;
	description: string;
	value: number;
	category: ExpenseCategory | IncomeCategory;
	type: TransactionType;
	createdAt: Date;
	updatedAt?: Date;
}

export interface TransactionFilter {
	idUser: string;
	type?: TransactionType;
	category?: string;
	startDate?: Date;
	endDate?: Date;
}

export function expenseToTransaction(expense: Expense): Transaction {
	return {
		...expense,
		type: "expense",
	};
}

export function incomeToTransaction(income: Income): Transaction {
	return {
		...income,
		type: "income",
	};
}
