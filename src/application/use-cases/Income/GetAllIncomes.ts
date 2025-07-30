import { Income } from '../../../core/entities/Income';
import {
    FindIncomesfilter,
    IncomeRepository,
} from '../../repositories/IncomeRepository';

interface GetAllIncomesRequest {
    idUser: string;
    category: string;
    startDate: string;
    endDate: string;
}

interface GetAllIncomesResponse {
    incomes: Income[];
    total: number;
}

export class GetAllIncomesUseCase {
    constructor(private incomeRepository: IncomeRepository) {}

    async execute({
        idUser,
        category,
        startDate,
        endDate,
    }: GetAllIncomesRequest): Promise<GetAllIncomesResponse> {
        let fullEndDate: Date | undefined;

        if (endDate) {
            fullEndDate = new Date(endDate);
            fullEndDate.setUTCHours(23, 59, 59, 999);
        }
        const filter: FindIncomesfilter = {
            idUser,
            category,
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: fullEndDate,
        };

        const incomes = await this.incomeRepository.findMany(filter);

        const total = incomes.reduce((sum, income) => sum + income.value, 0);

        return {
            incomes,
            total
        }
    }
}
