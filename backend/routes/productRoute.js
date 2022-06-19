import express from 'express'

import {
    addProduct,
    getAllProducts,
    getAllProductsForAdmin,
    getProductById,
    removeProduct,
    addReview,
    getLatestProducts,
    updateRating
} from '../controllers/productController.js'

import verify from '../middlewares/verify.js'

const router = express.Router()

router.route('/').get(getAllProducts)

router
    .route('/admin')
    .get(verify, getAllProductsForAdmin)
    .delete(verify, removeProduct)
    .post(verify, addProduct)

router.route('/review').put(verify, addReview)

router.route('/rating').put(verify, updateRating)

router.route('/latest').get(getLatestProducts)

router.route('/:id').get(getProductById)


export default router
