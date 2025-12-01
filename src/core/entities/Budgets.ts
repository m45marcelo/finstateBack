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
    spent: number;
    remaining: number;
    status: BudgetStatus;
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

export interface CreatedGeneralBudgetData {
    idUser: string;
    limit: number;
    spent: number;
    remaining: number;
    status: BudgetStatus;
}

export interface CreatedBudgetByCategoryData {
    idUser: string;
    category: BudgetCategories;
    limit: number;
    spent?: number;
    remaining?: number;
    status?: BudgetStatus;
}

export interface UpdatedGeneralBudgetData {
    limit?: number;
    spent?: number;
    remaining?: number;
    status?: BudgetStatus;
}

export interface UpdatedBudgetByCategoryData {
    limit?: number;
    spent?: number;
    remaining?: number;
    status?: BudgetStatus;
}