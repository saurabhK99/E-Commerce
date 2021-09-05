import mongoose from 'mongoose'
import dotenv from 'dotenv'

import connectDB from './config/db.js'

import products from './data/products.js'
import users from './data/users.js'

import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import User from './models/userModel.js'

dotenv.config()
connectDB()

const insertData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const sampleUsers = await User.insertMany(users)

        console.log('Inserted Users')

        const sampleProducts = products.map((p) => {
            return { ...p, user: sampleUsers[3]._id }
        })
        await Product.insertMany(sampleProducts)

        console.log('Inserted Products')
    } catch (err) {
        console.log('error: ' + err.message)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('data deleted!')
    } catch (err) {
        console.log('error: ' + err.message)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    insertData()
}
