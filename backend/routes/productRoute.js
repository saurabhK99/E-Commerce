import express from 'express'
import {
    getAllProducts,
    getProductById,
    removeProduct,
} from '../controllers/productController.js'
import verify from '../middlewares/verify.js'

const router = express.Router()

router.route('/').get(getAllProducts)

router.route('/admin').get(verify, getAllProducts).delete(verify, removeProduct)

router.route('/:id').get(getProductById)

export default router
