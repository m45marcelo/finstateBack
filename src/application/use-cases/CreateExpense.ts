import { CreateExpenseData, Expense, ExpenseCategory } from "../../core/entities/Expense";
import { NotFoundError, ValidationError } from "../../shared/errors";
import { ExpenseRepository } from "../repositories/ExpenseRepository";
import { UserRepository } from "../repositories/UserRepository";

interface CreateExpenseRequest {
    idUser: string;
    name: string;
    value: number;
    category: ExpenseCategory;
}

interface CreateExpenseResponse {
    expense: Expense
}

export class CreateExpenseUseCase {
    constructor(
        private expenseRepository: ExpenseRepository,
        private userRepository: UserRepository
    ) {}

    async execute({ idUser, name, value, category }: CreateExpenseRequest): Promise<CreateExpenseResponse> {
        const user = await this.userRepository.findById(idUser);
        if(!user){
            throw new NotFoundError('Usuário não encontrado');
        }

        if(value < 0) {
            throw new ValidationError('O valor deve ser maior que zero');
        }

        const expenseData: CreateExpenseData = {
            idUser,
            name: name.trim(),
            value,
            category,
        }

        const expense = await this.expenseRepository.create(expenseData);

        return {
            expense
        }
    }
}
