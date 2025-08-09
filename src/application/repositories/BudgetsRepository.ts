import { BudgetByCategory, CreateBudgetByCategoryData, CreateGeneralBudgetData, GeneralBudget, UpdateGeneralBudgetData } from "../../core/entities/Budgets";

export interface BudgetByCategoryFilter {
    idUser: string;
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
    update(id: string, data: BudgetByCategoryFilter): Promise<BudgetByCategory | null>
    delete(id: string): Promise<void>;
}