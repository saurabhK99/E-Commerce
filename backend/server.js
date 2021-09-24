import express from 'express'
import dotenv from 'dotenv'

import connectDB from './config/db.js'

import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoute.js'

const app = express()
dotenv.config()

connectDB()

app.use(express.json())
app.use('/api/products', productRoute)
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoute)

let PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Listening on port ${PORT}...`))
