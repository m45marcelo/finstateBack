import { BudgetByCategory, CreateBudgetByCategoryData, CreateGeneralBudgetData, GeneralBudget, UpdateGeneralBudget } from "../../core/entities/Budgets";
export interface GeneralBudgetFilter {
    iduser: string;
}

export interface BudgetByCategoryFilter {
    idUser: string;
}

export interface GeneralBudgetRepository {
    create(data: CreateGeneralBudgetData): Promise<GeneralBudget>;
    findMany(filter: GeneralBudgetFilter): Promise<GeneralBudget[]>;
    update(id: string, data: UpdateGeneralBudget): Promise<GeneralBudget | null>;
    delete(id: string): Promise<void>;
}

export interface BudgetByCategoryRepository {
    create(data: CreateBudgetByCategoryData): Promise<BudgetByCategory>;
    findMany(filter: BudgetByCategoryFilter): Promise<BudgetByCategory>;
    update(id: string, data: BudgetByCategoryFilter): Promise<BudgetByCategory | null>
    delete(id: string): Promise<void>;
}