import type { Request, Response } from "express";
import { CreateExpenseUseCase } from "../../../application/use-cases/Expense/CreateExpense";
import { DeleteExpenseUseCase } from "../../../application/use-cases/Expense/DeleteExpense";
import { GetAllExpensesUseCase } from "../../../application/use-cases/Expense/GetAllExpenses";
import { DeleteSubscriptionUseCase } from "../../../application/use-cases/Subscription/DeleteSubscription";
import type { ExpenseCategory } from "../../../core/entities/Expense";
import { MongoExpenseRepository } from "../../repositories/MongoExpenseRepository";
import { MongoGeneralBudgetRepository } from "../../repositories/MongoGeneralBudgetRepository";
import { MongoSubscriptionRepository } from "../../repositories/MongoSubscriptionRepository";
import { MongoUserRepository } from "../../repositories/MongoUserRepository";
import {
	createExpenseSchema,
	deleteExpenseSchema,
	getAllExpensesSchema,
} from "../validators/expenseValidationSchema";

export class ExpenseController {
	async createExpense(request: Request, response: Response): Promise<Response> {
		const { description, value, category } = createExpenseSchema.parse(
			request.body,
		);

		const idUser = request.user.id;

		const userRepository = new MongoUserRepository();
		const expenseRepository = new MongoExpenseRepository();
		const generalBudgetRepository = new MongoGeneralBudgetRepository();
		const createExpenseUseCase = new CreateExpenseUseCase(
			expenseRepository,
			userRepository,
			generalBudgetRepository,
		);

		const result = await createExpenseUseCase.execute({
			idUser,
			description,
			value,
			category: category as ExpenseCategory,
		});

		return response.status(200).json(result);
	}

	async getAllExpenses(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { category, description, startDate, endDate, page, limit } =
			getAllExpensesSchema.parse(request.query);
		const idUser = request.user.id;

		const expenseRepository = new MongoExpenseRepository();
		const getExpensesUseCase = new GetAllExpensesUseCase(expenseRepository);

		const result = await getExpensesUseCase.execute({
			idUser,
			description,
			category,
			startDate,
			endDate,
			page,
			limit,
		});

		return response.json(result);
	}

	async deleteExpense(request: Request, response: Response): Promise<Response> {
		const idUser = request.user.id;
		const { id, type } = deleteExpenseSchema.parse(request.body);
		let result: any = "ok";
		if (type) {
			if (type === "expense") {
				const expenseRepository = new MongoExpenseRepository();
				const deleteExpenseUseCase = new DeleteExpenseUseCase(
					expenseRepository,
				);

				result = await deleteExpenseUseCase.execute({
					idUser,
					id,
				});
			}

			if (type === "subscription") {
				const subscriptionRepository = new MongoSubscriptionRepository();
				const deleteSubscriptioneUseCase = new DeleteSubscriptionUseCase(
					subscriptionRepository,
				);

				result = await deleteSubscriptioneUseCase.execute({
					idUser,
					id,
				});
			}

		}

        return response.json(result)
	}
}
