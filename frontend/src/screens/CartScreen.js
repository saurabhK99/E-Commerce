import { faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addToCart } from '../actions/cartActions'

import CartItem from '../components/CartItem'

import './css/CartScreen.css'

const CartScreen = ({ match, history, location }) => {
    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    useEffect(() => {
        if (productId) dispatch(addToCart(productId, qty))
    }, [dispatch, productId, qty])

    const { cartItems } = useSelector((state) => state.cart)

    const checkoutHandler = () => {
        history.push('/login?redirect=order-summary')
    }

    return (
        <>
            {cartItems.length < 1 ? (
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: '10%',
                        textTransform: 'uppercase',
                        fontSize: '2rem',
                    }}
                >
                    Cart Empty!
                </div>
            ) : (
                <div className='cartScreenContainer'>
                    <section className='cartItemsSection'>
                        {cartItems.map((item) => {
                            return <CartItem key={item.product} item={item} />
                        })}
                    </section>

                    <section className='checkoutSection'>
                        <span className='checkoutSectionSpan'>
                            <strong>Price</strong>
                            
                            <span>&#8377;{cartItems.reduce(
                                (acc, item) => acc + item.qty * item.price,
                                0
                            )}</span>
                        </span>
                        <span className='checkoutSectionSpan'>
                            <strong>Shipping</strong>
                            
                            <span>&#8377;40</span>
                        </span>
                        <span className='checkoutSectionSpan'>
                            <strong>Discount </strong>
                            
                            <span>-&#8377;40
                            </span>
                        </span>
                        <span className='checkoutSectionSpan'>
                            <strong>Total Price </strong>
                            
                            <span>&#8377;{cartItems.reduce(
                                (acc, item) => acc + item.qty * item.price,
                                0
                            )}</span>
                        </span>
                        <button className='checkout' onClick={checkoutHandler}>
                            <FontAwesomeIcon icon={faMoneyBillAlt} /> &nbsp;Check-Out
                        </button>
                    </section>
                </div>
            )}
        </>
    )
}

export default CartScreen
