import Product from '../models/productModel.js'

const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find({})
        res.json(products)
        next()
    } catch (err) {
        res.status(404).json({ error: err.message })
        process.exit(1)
    }
}

const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            res.json(product)
        } else {
            res.status(404).json({ error: 'Unable to find the product' })
        }
        next()
    } catch (err) {
        res.status(404).json({ error: err.message })
        process.exit(1)
    }
}

export { getAllProducts, getProductById }
