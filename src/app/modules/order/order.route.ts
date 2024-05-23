import express from 'express'
import { orderControllers } from './order.controller'

const router = express.Router()

router.post('/api/orders', orderControllers.addOrder)
router.get('/api/orders', orderControllers.allOrders)


export const orderRouters = router
