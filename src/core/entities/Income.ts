export const INCOME_CATEGORIES = ['Salário', 'Investimentos', 'Freelancer', 'Outros'] as const;

export type IncomeCategory = typeof INCOME_CATEGORIES[number];

export interface Income {
    id: string;
    idUser: string;
    description: string;
    value: number;
    category: IncomeCategory;
    createdAt: Date;
    updatedAt?: Date;
};

export interface CreatedIncomeData {
    idUser: string;
    description: string;
    value: number;
    category: IncomeCategory;
};

export interface UpdatedIncomeData {
    description?: string;
    value?: number;
    category?: IncomeCategory;
}