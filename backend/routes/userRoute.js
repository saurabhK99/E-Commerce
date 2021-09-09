import express from 'express'
import {
    registerUser,
    authUser,
    showUserProfile,
    updateUserProfile,
} from '../controllers/userController.js'
import verify from '../middlewares/verify.js'

const router = express.Router()

router.route('/').post(registerUser)

router.route('/login').post(authUser)

router
    .route('/profile')
    .get(verify, showUserProfile)
    .put(verify, updateUserProfile)

export default router
