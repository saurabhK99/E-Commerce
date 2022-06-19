import Product from '../models/productModel.js'

export const getLatestProducts = async (req, res) => {
    try {
        const latestProducts = await Product.find({}).sort({_id: -1}).limit(2)
        res.status(200).json(latestProducts)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

const getAllProducts = async (req, res) => {
    let filter = {}
    let page = Number(req.query.page) || 1
    let pages

    if (req.query.filter) {
        if (req.query.filter.charAt(0) === ':') {
            filter = {
                category: req.query.filter.split(':')[1],
            }
        } else {
            filter = {
                name: {
                    $regex: req.query.filter,
                    $options: 'i',
                },
            }
        }
    }

    try {
        const productsCount = await Product.countDocuments(filter)

        pages = Math.ceil(productsCount / 20)

        const products = await Product.find(filter)
            .limit(20)
            .skip(20 * (page - 1))

        res.status(200).json({ products, page, pages })
    } catch (err) {
        res.status(404).json({ error: err.message })
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

const addReview = async (req, res) => {
    try {
        const product = await Product.findById(req.body.productId)

        product.reviews = [...product.reviews, req.body.review]

        await product.save()

        res.json({ success: 'Review Added!' })
    } catch (err) {
        res.json({ error: err.message })
    }
}

export const updateRating = async (req, res) => {
    try {
        const product = await Product.findById(req.body.productId)

        product.rating = req.body.newRating
        product.numReviews = req.body.numReviews

        await product.save()

        res.json({ success: 'Rating Updated!' })
    } catch (err) {
        res.json({ error: err.message })
    }
}

const getAllProductsForAdmin = async (req, res) => {
    try {
        const products = await Product.find()

        res.status(200).json(products)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

export {
    getAllProducts,
    getProductById,
    removeProduct,
    addProduct,
    addReview,
    getAllProductsForAdmin,
}
