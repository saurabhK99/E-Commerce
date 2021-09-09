import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const verify = async (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        let token = req.headers.authorization.split(' ')[1]
        let decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            res.status(401).json({ error: 'Invalid Token!' })
            process.exit(1)
        }

        req.userId = decoded.id
    }
    next()
}

export default verify
