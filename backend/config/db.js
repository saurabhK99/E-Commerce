import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })

        console.log('Connected to ' + con.connection.host)
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

export default connectDB