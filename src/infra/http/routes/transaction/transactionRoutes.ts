import { Router } from 'express'
import { TransactionController } from '../../controllers/TransactionController'
import { authMiddleware } from '../../../http/middlewares/authMiddleware'

const transactionRoutes = Router()
const transactionController = new TransactionController()

transactionRoutes.use(authMiddleware)

transactionRoutes.get('/transactions', (req, res, next) => {
  transactionController.list(req, res).catch(next)
})

export { transactionRoutes }