export const BUDGET_STATUS = ['off', 'free', 'exceeded', 'achieved' ] as const;
export type BudgetStatus = (typeof BUDGET_STATUS)[number];

export const BUDGET_CATEGORIES = [
    'Supermercado',
    'Moradia',
    'Entretenimento',
    'Transporte',
    'Lazer',
    'Saúde',
    'Vestuário',
    'Outros',
] as const;
export type BudgetCategories = (typeof BUDGET_CATEGORIES)[number];

export interface GeneralBudget {
    id: string;
    idUser: string;
    limit: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface BudgetByCategory {
    id: string;
    idUser: string;
    category: BudgetCategories;
    limit: number;
    spent: number;
    remaining: number;
    status: BudgetStatus;
    createdAt: Date;
    updatedAt: Date; 
}

export interface CreateGeneralBudgetData {
    idUser: string;
    limit: number;
}

export interface CreateBudgetByCategoryData {
    idUser: string;
    category: BudgetCategories;
    limit: number;
    spent: number;
    remaining: number;
    status: BudgetStatus;
}

export interface UpdateGeneralBudget {
    limit?: number;
}

export interface UpdateBudgetByCategory {
    limit?: number;
}