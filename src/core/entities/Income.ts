export const INCOME_CATEGORIES = ['Salário', 'Investimentos', 'Freelancer', 'Outros'] as const;

export type IncomeCategory = typeof INCOME_CATEGORIES[number];

export interface Income {
    id: string;
    idUser: string;
    name: string;
    value: number;
    category: IncomeCategory;
    createdAt: Date;
    updatedAt?: Date;
};

export interface CreateIncomeData {
    idUser: string;
    name: string;
    value: number;
    category: IncomeCategory;
};

export interface UpdateIncomeData {
    name?: string;
    value?: number;
    category?: IncomeCategory;
}