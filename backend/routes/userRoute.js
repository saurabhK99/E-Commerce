import express from 'express'
import {
    registerUser,
    authUser,
    showUserProfile,
} from '../controllers/userController.js'
import verify from '../middlewares/verify.js'

const router = express.Router()

router.route('/').post(registerUser)

router.route('/login').post(authUser)

router.route('/profile').get(verify, showUserProfile)

export default router
