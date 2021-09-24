import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        shippingAddress: {
            address: { type: String, required: true, default: ' ' },
            city: { type: String, required: true, default: ' ' },
            state: { type: String, required: true, default: ' ' },
            postalCode: { type: String, required: true, default: ' ' },
        },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model('User', userSchema)

export default User
