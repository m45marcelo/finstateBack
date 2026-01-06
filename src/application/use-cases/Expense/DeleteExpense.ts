import { ConflictError, UnauthorizedError } from "../../../shared/errors";
import { ExpenseRepository } from "../../repositories/ExpenseRepository";

interface DeleteExpenseRequest {
    idUser: string;
    id: string;
}

export class DeleteExpenseUseCase {
    constructor(private expenseRepository: ExpenseRepository) {}

    async execute({
        idUser,
        id
    }: DeleteExpenseRequest): Promise<void>{
        const existingExpense = await this.expenseRepository.findById(id);

        if(existingExpense?.idUser !== idUser){
            throw new UnauthorizedError("Ocorreu um erro ao tentar deletar essa transação")
        }
        if(!existingExpense){
            throw new ConflictError('Despesa não encontrada');
        }

        await this.expenseRepository.delete(id);
    }
}