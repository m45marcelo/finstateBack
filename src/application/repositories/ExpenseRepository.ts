import { CreatedExpenseData, Expense, UpdatedExpenseData } from "../../core/entities/Expense";

export interface FindExpensesfilter {
    idUser: string;
    category?: string;
    startDate?: Date;
    endDate?: Date;
}

export interface ExpenseRepository {
    create(data: CreatedExpenseData): Promise<Expense>;
    findById(id: string): Promise<Expense | null>;
    findMany(filter: FindExpensesfilter): Promise<Expense[]>;
    update(id: string, data: UpdatedExpenseData): Promise<Expense | null>;
    delete(id: string): Promise<void>;
    getTotalByUser(idUser: string): Promise<number>;
}