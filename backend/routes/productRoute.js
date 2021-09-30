import express from 'express'

import {
    addProduct,
    getAllProducts,
    getProductById,
    removeProduct,
    addReview,
} from '../controllers/productController.js'

import verify from '../middlewares/verify.js'

const router = express.Router()

router.route('/').get(getAllProducts)

router
    .route('/admin')
    .get(verify, getAllProducts)
    .delete(verify, removeProduct)
    .post(verify, addProduct)

router.route('/review').put(verify, addReview)

router.route('/:id').get(getProductById)

export default router
