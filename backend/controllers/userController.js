import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import token from '../config/createToken.js'
import { json } from 'express'

//@route /api/users
// @access public
export const registerUser = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const newUser = {
            name: req.body.name,
            password: await bcrypt.hash(req.body.password, salt),
            email: req.body.email,
        }

        const addedUser = await User.create(newUser)

        if (addedUser) {
            res.status(201).json({ success: 'User Created!' })
        }
    } catch (err) {
        res.status(404).json({ error: err.message })
        // process.exit(1)
    }
}

//@route /api/users/login
//@access public
export const authUser = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const isUser = await User.findOne({ email })

        if (!isUser) {
            res.status(400)
            res.json({ error: 'User not found!' })
            process.exit(1)
        }
        const isAuth = await bcrypt.compare(password, isUser.password)

        if (isAuth) {
            res.status(200).json({
                _id: isUser._id,
                name: isUser.name,
                email: isUser.email,
                token: token({ id: isUser._id }),
            })
        } else {
            res.status(401).json({ error: 'Not Authorised!' })
        }
    } catch (err) {
        res.status(401).json({ error: err.message })
    }
}

//@route GET /api/users/profile
//@access private
export const showUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId)
        const { _id, name, email, isAdmin } = user
        res.status(200).json({
            _id,
            name,
            email,
            isAdmin,
        })
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

//@route PUT /api/users/profile
//@access private
export const updateUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId)
        user.email = req.body.email || user.email
        user.name = req.body.name || user.name
        user.password =
            req.body.password &&
            (bcrypt.hashSync(req.body.password, 10) || user.password)

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}
