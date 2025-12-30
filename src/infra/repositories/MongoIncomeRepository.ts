import { FindIncomesFilter, IncomeRepository } from "../../application/repositories/IncomeRepository";
import { CreatedIncomeData, Income, UpdatedIncomeData } from "../../core/entities/Income";
import { PaginatedResponse, PaginationParams } from "../../shared/types/pagination";
import { IncomeSchema } from "../database/models/IncomeModel";

export class MongoIncomeRepository implements IncomeRepository {
    async create(data: CreatedIncomeData): Promise<Income> {
        const income = await IncomeSchema.create({
            ...data,
            createdAt: new Date()
        });

        return income.toJSON();
    }

    async findById(id: string): Promise<Income | null> {
        const income = await IncomeSchema.findById(id);

        return income ? income?.toJSON() : null;
    }

    async findMany(filter: FindIncomesFilter): Promise<Income[]> {
      const query = this.buildQuery(filter)
    
      console.log('🔎 MongoIncomeRepository - Query construída:', JSON.stringify(query, null, 2))
  
      const incomes = await IncomeSchema
        .find(query)
        .sort({ createdAt: -1 })
      
      console.log(`✅ MongoIncomeRepository - ${incomes.length} receitas encontradas`)
      
      return incomes.map(income => income.toJSON())
    }

    async findManyPaginated(
        filter: FindIncomesFilter, 
        pagination: PaginationParams
      ): Promise<PaginatedResponse<Income>> {
        const query = this.buildQuery(filter)
    
        // Calcular skip (quantos registros pular)
        const skip = (pagination.page - 1) * pagination.limit
    
        // Buscar dados paginados e contar total
        const [incomes, totalItems] = await Promise.all([
          IncomeSchema
            .find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pagination.limit),
          IncomeSchema.countDocuments(query)
        ])
    
        // Calcular metadados da paginação
        const totalPages = Math.ceil(totalItems / pagination.limit)
    
        return {
          data: incomes.map(income => income.toJSON()),
          meta: {
            currentPage: pagination.page,
            itemsPerPage: pagination.limit,
            totalItems,
            totalPages,
            hasNextPage: pagination.page < totalPages,
            hasPreviousPage: pagination.page > 1
          }
        }
      }

    async update(id: string, data: UpdatedIncomeData): Promise<Income | null> {
        const income = await IncomeSchema.findByIdAndUpdate(
            id,
            {
                ...data,
                updatedAt: new Date()
            },
            { new: true }
        )

        return income ? income.toJSON() : null;
    }

    async delete(id: string): Promise<void> {
        await IncomeSchema.findByIdAndDelete(id);
    }

    async getTotalByUser(idUser: string): Promise<number> {
        const result = await IncomeSchema.aggregate([
            { $match: { idUser } },
            { $group: { _id: null, total: { $sum: '$value'} } }
        ])

        return result.length > 0 ? result[0].total : 0;
    }

    private buildQuery(filter: FindIncomesFilter): any {
        const query: any = { idUser: filter.idUser }

        if(filter.description){
          query.description = { $regex: filter.description, $options: 'i' }
        }
    
        if (filter.category) {
          query.category = filter.category
        }
    
        if (filter.startDate || filter.endDate) {
          query.createdAt = {}
          
          if (filter.startDate) {
            query.createdAt.$gte = filter.startDate
          }
          
          if (filter.endDate) {
            query.createdAt.$lte = filter.endDate
          }
        }
    
        return query
      }
}
