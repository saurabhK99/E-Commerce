import Order from '../models/orderModel.js'
import crypto from 'crypto'
import dotenv from 'dotenv'

dotenv.config()

export const createOrder = async (req, res) => {
    const { amount, currency, receipt, notes } = req.body
    const { user, orderItems, shippingAddress } = req.body

    try {
        const result = await Order.create({ user, orderItems, shippingAddress })

        req.razorpay.orders.create(
            { amount, currency, receipt, notes },
            (err, order) => {
                if (!err)
                    res.status(200).json({ ...order, orderId: result._id })
                else res.status(400).json(err)
            }
        )
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

export const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.body.id)
        
        res.status(200).json({status: "Order removed successfully!"})

    } catch(err) {
        res.status(400).json({error: err.message})
    }
}

export const updatePayment = async (req, res) => {
    try {
        const order = await Order.findById(req.body.id)

        const paymentResponse = req.body.paymentResponse

        const hmac = crypto.createHmac('sha256', process.env.RZPAY_KEY_SECRET)

        hmac.update(
            req.body.order_id + '|' + paymentResponse.razorpay_payment_id
        )

        const generated_signature = hmac.digest('hex')

        if (generated_signature === paymentResponse.razorpay_signature) {
            order.isPaid = true
            order.razorpayOrderId = paymentResponse.razorpay_order_id

            await order.save()

            res.json({ success: 'Payment Successful!' })
        }
        res.json({ error: 'Payment Not Authorized!!!' })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

export const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        res.json(order)
    } catch (err) {
        res.status(401).json({ error: err.message })
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.userId})

        res.json(orders)
    } catch (err) {
        res.status(401).json({ error: err.message })
    }
}

export const getOrdersForAdmin = async (req, res) => {
    try {
        const orders = await Order.find({})
        res.status(200).json(orders)
    } catch (err) {
        res.json({ error: err.message })
    }
}

export const setDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.body.id)
        order.isDelivered = true
        order.save()
        res.status(200).json({ success: 'Delivery Confirmed!' })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}
