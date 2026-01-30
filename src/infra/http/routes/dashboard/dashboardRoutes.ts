import { Router } from 'express'
import { DashboardController } from '../../../../infra/http/controllers/DashboardController'
import { authMiddleware } from '../../../../infra/http/middlewares/authMiddleware'

const dashboardRoutes = Router()
const dashboardController = new DashboardController()

// Todas as rotas do dashboard requerem autenticação
dashboardRoutes.use(authMiddleware)

dashboardRoutes.get('/dashboard/categories', (req, res, next) => {
    console.log('🎯 Rota /dashboard/categories atingida')
    dashboardController.getCategorySummary(req, res).catch(next)
})

export { dashboardRoutes }