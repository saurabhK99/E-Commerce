import React from 'react'
import products from '../products'
import Product from '../components/Product'

import './css/HomeScreen.css'

const HomeScreen = () => {
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
