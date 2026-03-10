import { response } from "express";
import { ConflictError, UnauthorizedError } from "../../../shared/errors";
import { ExpenseRepository } from "../../repositories/ExpenseRepository";
import { SubscriptionRepository } from "../../repositories/SubscriptionRepository";

interface DeleteExpenseRequest {
    idUser: string;
    id: string;
}

export interface DeleteExpenseResponse {
    message: string;
}

export class DeleteExpenseUseCase {
    constructor(private expenseRepository: ExpenseRepository) {}

    async execute({
        idUser,
        id
    }: DeleteExpenseRequest): Promise<DeleteExpenseResponse>{
        const existingExpense = await this.expenseRepository.findById(id);

        if(existingExpense?.idUser !== idUser){
            throw new UnauthorizedError("Ocorreu um erro ao tentar deletar essa transação")
        }
        if(!existingExpense){
            throw new ConflictError('Despesa não encontrada');
        }

        await this.expenseRepository.delete(id);

        return { message: "Transação deletada com sucesso" }
    }
}