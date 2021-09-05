import express from 'express'
import dotenv from 'dotenv'

import connectDB from './config/db.js'

import productRoute from './routes/productRoute.js'

const app = express()
dotenv.config()

connectDB()

app.use('/api/products', productRoute)

let PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Listening on port ${PORT}...`))
