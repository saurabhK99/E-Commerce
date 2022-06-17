import React from 'react'
import { Link } from 'react-router-dom'

import './css/topDeals.css'

const TopDeals = ({ product }) => {
    return (
        <Link
            to={`/product/${product._id}`}
            style={{ textDecoration: 'none', color: 'black' }}
        >
            <div className='latestProductContainer'>
                <img src={product.image} alt='' />
                <span className="latestProductDescSection">
                    <strong>{product.name}</strong>
                    <span>&#8377; {product.price}</span>
                </span>
            </div>
        </Link>
    )
}

export default TopDeals
