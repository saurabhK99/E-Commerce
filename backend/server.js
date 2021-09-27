import express from 'express'
import dotenv from 'dotenv'
import path from 'path'

import connectDB from './config/db.js'

import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoute.js'
import uploadRoute from './routes/uploadRoute.js'

const app = express()
dotenv.config()

connectDB()

app.use(express.json())
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')))

app.use('/api/products', productRoute)
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoute)
app.use('/api/uploads', uploadRoute)

let PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Listening on port ${PORT}...`))
