import { CreateIncomeData, Income, UpdateIncomeData } from "../../core/entities/Income";

export interface FindIncomesfilter {
    idUser: string;
    category?: string;
    startDate?: Date;
    endDate?: Date;
}

export interface IncomeRepository {
    create(data: CreateIncomeData): Promise<Income>;
    findById(id: string): Promise<Income | null>;
    findMany(filter: FindIncomesfilter): Promise<Income[]>;
    update(id: string, data: UpdateIncomeData): Promise<Income[] | null>;
    delete(id: string): Promise<void>;
    getTotalByUser(idUser: string): Promise<number>;
}