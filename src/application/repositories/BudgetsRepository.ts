import { BudgetByCategory, BudgetCategories, BudgetStatus, CreateBudgetByCategoryData, CreateGeneralBudgetData, GeneralBudget, UpdateBudgetByCategoryData, UpdateGeneralBudgetData } from "../../core/entities/Budgets";

export interface BudgetByCategoryFilter {
    idUser: string;
    status?: BudgetStatus;
}

export interface GeneralBudgetRepository {
    create(data: CreateGeneralBudgetData): Promise<GeneralBudget>;
    findByIdUser(idUser: string): Promise<GeneralBudget | null>;
    update(id: string, data: UpdateGeneralBudgetData): Promise<GeneralBudget | null>;
    delete(id: string): Promise<void>;
}

export interface BudgetByCategoryRepository {
    create(data: CreateBudgetByCategoryData): Promise<BudgetByCategory>;
    findMany(filter: BudgetByCategoryFilter): Promise<BudgetByCategory[]>;
    findById(id: string): Promise<BudgetByCategory | null>;
    update(id: string, data: UpdateBudgetByCategoryData): Promise<BudgetByCategory | null>
    delete(id: string): Promise<void>;
}