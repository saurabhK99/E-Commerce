import express from 'express'

import {
    createOrder,
    updatePayment,
    getOrder,
    getAllOrders,
} from '../controllers/orderController.js'

import verify from '../middlewares/verify.js'
import genInstance from '../middlewares/razorpay.js'

const router = express.Router()

router
    .route('/')
    .post(verify, genInstance, createOrder)
    .get(verify, getAllOrders)
    .put(verify, updatePayment)

router.route('/:id').get(verify, getOrder)

export default router
