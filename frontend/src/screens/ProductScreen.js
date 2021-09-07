import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { listProductDetails } from '../actions/productActions'
import Message from '../components/Message'
import Loading from '../components/Loading'

import './css/ProductScreen.css'

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
    const productDetails = useSelector((s) => s.productDetails)

    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

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
                        <span>
                            {product.countInStock
                                ? `In-Stock: ${product.countInStock}`
                                : 'Out of Stock'}
                        </span>
                        <span>
                            Qty:{' '}
                            <select
                                name='qty'
                                id='qty-id'
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                            >
                                {[...Array(product.countInStock).keys()].map(
                                    (k) => (
                                        <option key={k + 1} value={k + 1}>
                                            {k + 1}
                                        </option>
                                    )
                                )}
                            </select>
                        </span>
                        <button
                            className='addToCart'
                            id='cart'
                            onClick={addToCartHandler}
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
