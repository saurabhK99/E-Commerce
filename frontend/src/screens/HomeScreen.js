import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Product from '../components/Product'

import './css/HomeScreen.css'

const HomeScreen = () => {
  let [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <>
      <div className='homeScreenContainer'>
        {products.map((product) => (
          <Product pro={product} />
        ))}
      </div>
    </>
  )
}

export default HomeScreen
