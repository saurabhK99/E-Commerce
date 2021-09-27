import Product from '../models/productModel.js'

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (err) {
        res.status(404).json({ error: err.message })
        process.exit(1)
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            res.json(product)
        } else {
            res.status(404).json({ error: 'Unable to find the product' })
        }
    } catch (err) {
        res.status(404).json({ error: err.message })
        process.exit(1)
    }
}

const removeProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.body.id)
        await product.remove()
        res.status(200).json({ success: 'Product Removed!' })
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

const addProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        await product.save()
        res.status(200).json({ success: 'Product Added!' })
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}
export { getAllProducts, getProductById, removeProduct, addProduct }
