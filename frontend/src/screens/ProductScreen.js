import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './css/ProductScreen.css'

const ProductScreen = ({ match }) => {
  const [pro, setPro] = useState({})

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`)

      setPro(data)
    }
    fetchProduct()
  }, [match])

  return (
    <>
      <div className='productScreenContainer'>
        <section className='imgContainer'>
          <img src={pro.image} alt='' />
        </section>

        <section className='descContainer'>
          <strong>{pro.name}</strong>
          <strong>{`${pro.rating} stars  ${pro.numReviews} Reviews`}</strong>
          <strong>{pro.brand}</strong>
          <p>{pro.description}</p>
        </section>

        <section className='priceContainer'>
          <span className='block'></span>
          <strong>{`Price: ${pro.price}`}</strong>
          <span>{`In-Stock: ${pro.countInStock}`}</span>
          <button className='addToCart' disabled={!pro.countInStock}>
            Add to Cart
          </button>
        </section>
      </div>
    </>
  )
}

export default ProductScreen
