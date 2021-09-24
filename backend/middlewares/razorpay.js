import Razorpay from 'razorpay'

const genInstance = async (req, res, next) => {
    const instance = new Razorpay({
        key_id: process.env.RZPAY_KEY_ID,
        key_secret: process.env.RZPAY_KEY_SECRET,
    })

    req.razorpay = instance

    next()
}

export default genInstance
