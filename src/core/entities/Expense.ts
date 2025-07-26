export const EXPENSE_CATEGORIES = [
    'Alimentação',
    'Moradia',
    'Transporte',
    'Lazer',
    'Saúde',
    'Outros',
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export interface Expense {
    id: string;
    idUser: string;
    name: string;
    value: number;
    category: ExpenseCategory;
    createdAt: Date;
    updatedAt?: Date;
}

export interface CreateExpenseData {
    idUser: string;
    name: string;
    value: number;
    category: ExpenseCategory;
}

export interface UpdateExpenseData {
    name?: string;
    value?: number;
    category?: ExpenseCategory;
}
