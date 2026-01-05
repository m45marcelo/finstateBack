import { Income, IncomeCategory } from '../../../core/entities/Income';
import {
    FindIncomesFilter,
    IncomeRepository,
} from '../../repositories/IncomeRepository';

interface GetAllIncomesRequest {
    idUser: string
    description?: string;
    category?: IncomeCategory
    startDate?: Date
    endDate?: Date
    page?: number
    limit?: number
  }
  
  interface GetAllIncomesResponse {
    incomes: Income[]
    total: number
    pagination?: {
      currentPage: number
      itemsPerPage: number
      totalItems: number
      totalPages: number
      hasNextPage: boolean
      hasPreviousPage: boolean
    }
  }

export class GetAllIncomesUseCase {
    constructor(private incomeRepository: IncomeRepository) {}

    async execute({
        idUser,
        description,
        category,
        startDate,
        endDate,
        page = 1,
        limit = 10
    }: GetAllIncomesRequest): Promise<GetAllIncomesResponse> {
        let fullEndDate: Date | undefined;

        if (endDate) {
            fullEndDate = new Date(endDate);
            fullEndDate.setUTCHours(23, 59, 59, 999);
        }
        const filter: FindIncomesFilter = {
            idUser,
            description,
            category,
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: fullEndDate,
        };

        const result = await this.incomeRepository.findManyPaginated(filter, {
            page,
            limit
        })
          // Calcular total das receitas da página atual
        const total = result.data.reduce((sum, income) => sum + income.value, 0)
        
        return {
            incomes: result.data,
            total,
            pagination: result.meta
        }
    }
}
