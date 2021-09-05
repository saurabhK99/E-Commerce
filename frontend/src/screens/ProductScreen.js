import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { listProductDetails } from '../actions/productActions'
import Message from '../components/Message'
import Loading from '../components/Loading'

import './css/ProductScreen.css'

const ProductScreen = ({ match }) => {
    const dispatch = useDispatch()
    const productDetails = useSelector((s) => s.productDetails)

    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    return (
        <>
            {loading ? (
                <Loading />
            ) : error ? (
                <Message>{error}</Message>
            ) : (
                <div className='productScreenContainer'>
                    <section className='imgContainer'>
                        <img src={product.image} alt='' />
                    </section>

                    <section className='descContainer'>
                        <strong>{product.name}</strong>
                        <strong>{`${product.rating} stars  ${product.numReviews} Reviews`}</strong>
                        <strong>{product.brand}</strong>
                        <p>{product.description}</p>
                    </section>

                    <section className='priceContainer'>
                        <span className='block'></span>
                        <strong>{`Price: ${product.price}`}</strong>
                        <span>{`In-Stock: ${product.countInStock}`}</span>
                        <button
                            className='addToCart'
                            disabled={!product.countInStock}
                        >
                            Add to Cart
                        </button>
                    </section>
                </div>
            )}
        </>
    )
}

export default ProductScreen
