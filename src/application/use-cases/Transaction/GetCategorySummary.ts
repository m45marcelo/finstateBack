import { ExpenseRepository } from '../../../application/repositories/ExpenseRepository'
import { IncomeRepository } from '../../../application/repositories/IncomeRepository'
import { EXPENSE_CATEGORIES } from '../../../core/entities/Expense'
import { INCOME_CATEGORIES } from '../../../core/entities/Income'
import { SubscriptionRepository } from '../../repositories/SubscriptionRepository'

interface GetCategorySummaryRequest {
  idUser: string
  startDate?: string
  endDate?: string
}

interface CategoryData {
  category: string
  total: number
  count: number
  percentage: number
}

interface GetCategorySummaryResponse {
  expenses: {
    categories: CategoryData[]
    total: number
  }
  incomes: {
    categories: CategoryData[]
    total: number
  }
  balance: number
}

export class GetCategorySummaryUseCase {
    constructor(
      private expenseRepository: ExpenseRepository,
      private subscriptionRepository: SubscriptionRepository,
      private incomeRepository: IncomeRepository
    ) {}
  
    async execute({ 
      idUser, 
      startDate, 
      endDate 
    }: GetCategorySummaryRequest): Promise<GetCategorySummaryResponse> {
      const filter = {
        idUser,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined
      }
  
      // Buscar todas as despesas e receitas do período
      const [expenses, subscriptions, incomes] = await Promise.all([
        this.expenseRepository.findMany(filter),
        this.subscriptionRepository.findMany(filter),
        this.incomeRepository.findMany(filter)
      ])
  
      // Agrupar despesas por categoria (incluindo categorias vazias)
      const expensesByCategory = this.groupByCategoryComplete(
        expenses, 
        EXPENSE_CATEGORIES as unknown as string[]
      )

      const totalExpenses = expenses.reduce((sum, exp) => sum + exp.value, 0)

      const subscriptionByCategory = this.groupByCategoryComplete(
        subscriptions,
        EXPENSE_CATEGORIES as unknown as string[]
      )

      const totalSubscriptions = subscriptions.reduce((sum, exp) => sum + exp.value, 0)

      const totalExpensesAndSubscriptions = totalExpenses + totalSubscriptions;

      console.log(expensesByCategory)
      console.log(subscriptionByCategory)

      expensesByCategory[0].total += subscriptionByCategory[0].total
      expensesByCategory[0].count += subscriptionByCategory[0].count
      expensesByCategory[1].total += subscriptionByCategory[1].total
      expensesByCategory[1].count += subscriptionByCategory[1].count
      expensesByCategory[2].total += subscriptionByCategory[2].total
      expensesByCategory[2].count += subscriptionByCategory[2].count
      expensesByCategory[3].total += subscriptionByCategory[3].total
      expensesByCategory[3].count += subscriptionByCategory[3].count
      expensesByCategory[4].total += subscriptionByCategory[4].total
      expensesByCategory[4].count += subscriptionByCategory[4].count
      expensesByCategory[5].total += subscriptionByCategory[5].total
      expensesByCategory[5].count += subscriptionByCategory[5].count
      expensesByCategory[6].total += subscriptionByCategory[6].total
      expensesByCategory[6].count += subscriptionByCategory[6].count
      expensesByCategory[7].total += subscriptionByCategory[7].total
      expensesByCategory[7].count += subscriptionByCategory[7].count
      
      console.log(expensesByCategory)
      // Agrupar receitas por categoria (incluindo categorias vazias)
      const incomesByCategory = this.groupByCategoryComplete(
        incomes, 
        INCOME_CATEGORIES as unknown as string[]
      )
      const totalIncomes = incomes.reduce((sum, inc) => sum + inc.value, 0)
  
      // Calcular percentuais
      const expenseCategoriesWithPercentage = expensesByCategory.map(cat => ({
        ...cat,
        percentage: totalExpensesAndSubscriptions > 0 ? (cat.total / totalExpensesAndSubscriptions) * 100 : 0
      }))
  
      const incomeCategoriesWithPercentage = incomesByCategory.map(cat => ({
        ...cat,
        percentage: totalIncomes > 0 ? (cat.total / totalIncomes) * 100 : 0
      }))
  
      return {
        expenses: {
          categories: expenseCategoriesWithPercentage,
          total: totalExpensesAndSubscriptions
        },
        incomes: {
          categories: incomeCategoriesWithPercentage,
          total: totalIncomes
        },
        balance: totalIncomes - totalExpensesAndSubscriptions
      }
    }
  
    /**
     * Agrupa por categoria incluindo TODAS as categorias possíveis,
     * mesmo aquelas com valor 0
     */
    private groupByCategoryComplete(
      items: Array<{ category: string; value: number }>,
      allCategories: string[]
    ): Omit<CategoryData, 'percentage'>[] {
      // Criar um mapa com todas as categorias iniciando em 0
      const categoryMap = new Map<string, { total: number; count: number }>()
      
      // Inicializar todas as categorias com 0
      allCategories.forEach(category => {
        categoryMap.set(category, { total: 0, count: 0 })
      })
  
      // Preencher com os valores reais
      items.forEach(item => {
        const existing = categoryMap.get(item.category) || { total: 0, count: 0 }
        categoryMap.set(item.category, {
          total: existing.total + item.value,
          count: existing.count + 1
        })
      })
  
      return Array.from(categoryMap.entries()).map(([category, data]) => ({
        category,
        total: data.total,
        count: data.count
      }))
    }
  }