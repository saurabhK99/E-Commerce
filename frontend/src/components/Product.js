import React from 'react'
import { Link } from 'react-router-dom'
import './css/Product.css'

const Product = ({ pro }) => {
  return (
    <>
      <Link
        to={`/product/${pro._id}`}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <div className='productContainer'>
          <img src={pro.image} alt='' />
          <strong>{pro.name}</strong>
          <span>{pro.price}</span>
        </div>
      </Link>
    </>
  )
}

export default Product
