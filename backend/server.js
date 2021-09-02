import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'

const app = express()
dotenv.config()

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)

  res.json(product)
})

let PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Listening on port ${PORT}...`))
