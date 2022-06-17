import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { listProductDetails, addReview } from '../actions/productActions'

import Message from '../components/Message'
import Loading from '../components/Loading'
import Review from '../components/Review'
import Rating from '../components/Rating'

import './css/ProductScreen.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)
    const [comment, setComment] = useState()
    const [rating, setRating] = useState(1)

    const dispatch = useDispatch()
    const productDetails = useSelector((s) => s.productDetails)
    const userInfo = useSelector((s) => s.userLogin.userInfo)

    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const showReviewHandler = (e) => {
        let element = document.querySelector('.reviewForm')
        if (element.classList.contains('disableCurrent')) {
            element.classList.remove('disableCurrent')
            e.target.value = 'Hide'
        } else {
            element.classList.add('disableCurrent')
            e.target.value = 'Add Review'
        }
    }
    const addReviewHandler = (e) => {
        e.preventDefault()

        dispatch(
            addReview(product._id, { comment, name: userInfo.name, rating })
        )
        setTimeout(() => {
            dispatch(listProductDetails(match.params.id))
        }, 500)
    }

    return (
        <>
            {loading ? (
                <Loading />
            ) : error ? (
                <Message>{error}</Message>
            ) : (
                <div>
                    <section className='productScreenContainer'>
                        <section className='imgContainer'>
                            <img src={product.image} alt='' />
                            <select
                                className='selectContainer'
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
                            <button
                                className='addToCartButton'
                                id='cart'
                                onClick={addToCartHandler}
                                disabled={!product.countInStock}
                            >
                                <FontAwesomeIcon icon={faShoppingCart}/> &nbsp;Add to Cart
                            </button>
                        </section>

                        <section className='descContainer'>
                            <strong>{product.name}</strong>
                            <span>
                                <Rating rating={product.rating} />
                            </span>
                            <strong>{product.brand}</strong>
                            <strong>&#8377;{product.price}</strong>
                            <p>{product.description}</p>
                            <section className='reviewsContainer'>
                                {userInfo && (
                                    <input
                                        type='button'
                                        className='reviewButton'
                                        onClick={showReviewHandler}
                                        value='Add Review'
                                    />
                                )}
                                <form
                                    className='reviewForm disableCurrent'
                                    onSubmit={addReviewHandler}
                                >
                                    <textarea
                                        name='commentBox'
                                        id='comment'
                                        cols='50'
                                        rows='3'
                                        value={comment}
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                    ></textarea>
                                    <section className='ratingSubmitSection'>
                                        <select
                                            name='ratingBox'
                                            className='selectContainer'
                                            onChange={(e) =>
                                                setRating(e.target.value)
                                            }
                                        >
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                        </select>
                                        <input
                                            type='submit'
                                            className='reviewButton'
                                            value='Submit'
                                        />
                                    </section>
                                </form>

                                {product.reviews &&
                                    (product.reviews.length > 0 ? (
                                        <div className='reviewContainer'>
                                            {product.reviews.map((review) => (
                                                <Review
                                                    key={review._id}
                                                    review={review}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <h1 className='noReviewH1'>
                                            No Reviews
                                        </h1>
                                    ))}
                            </section>
                        </section>
                    </section>
                </div>
            )}
        </>
    )
}

export default ProductScreen
