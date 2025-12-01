export const EXPENSE_CATEGORIES = [
    'Supermercado',
    'Moradia',
    'Entretenimento',
    'Transporte',
    'Lazer',
    'Saúde',
    'Vestuário',
    'Outros',
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export interface Expense {
    id: string;
    idUser: string;
    description: string;
    value: number;
    category: ExpenseCategory;
    createdAt: Date;
    updatedAt?: Date;
}

export interface CreatedExpenseData {
    idUser: string;
    description: string;
    value: number;
    category: ExpenseCategory;
}

export interface UpdatedExpenseData {
    description?: string;
    value?: number;
    category?: ExpenseCategory;
}
