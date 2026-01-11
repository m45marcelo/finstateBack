import { CreatedIncomeData, Income, UpdatedIncomeData } from "../../core/entities/Income";
import { PaginatedResponse, PaginationParams } from "../../shared/types/pagination";

export interface FindIncomesFilter {
    idUser: string;
    description?: string;
    category?: string;
    startDate?: Date;
    endDate?: Date;
}

export interface IncomeRepository {
    create(data: CreatedIncomeData): Promise<Income>;
    findById(id: string): Promise<Income | null>;
    findMany(filter: FindIncomesFilter): Promise<Income[]>;
    findManyPaginated(filter: FindIncomesFilter, pagination: PaginationParams): Promise<PaginatedResponse<Income>>
    update(id: string, data: UpdatedIncomeData): Promise<Income | null>;
    delete(id: string): Promise<void>;
    getTotalByUser(idUser: string): Promise<number>;
}