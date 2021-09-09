import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const createToken = (id) => {
    return jwt.sign(id, process.env.JWT_SECRET, { expiresIn: '180d' })
}

export default createToken
