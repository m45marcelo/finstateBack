import { BudgetByCategory, BudgetCategories, BudgetStatus, CreatedBudgetByCategoryData, CreatedGeneralBudgetData, GeneralBudget, UpdatedBudgetByCategoryData, UpdatedGeneralBudgetData } from "../../core/entities/Budgets";

export interface BudgetByCategoryFilter {
    idUser: string;
    status?: BudgetStatus;
}

export interface GeneralBudgetRepository {
    create(data: CreatedGeneralBudgetData): Promise<GeneralBudget>;
    findByIdUser(idUser: string): Promise<GeneralBudget | null>;
    update(id: string, data: UpdatedGeneralBudgetData): Promise<GeneralBudget | null>;
    delete(id: string): Promise<void>;
}

export interface BudgetByCategoryRepository {
    create(data: CreatedBudgetByCategoryData): Promise<BudgetByCategory>;
    findMany(filter: BudgetByCategoryFilter): Promise<BudgetByCategory[]>;
    findById(id: string): Promise<BudgetByCategory | null>;
    update(id: string, data: UpdatedBudgetByCategoryData): Promise<BudgetByCategory | null>
    delete(id: string): Promise<void>;
}