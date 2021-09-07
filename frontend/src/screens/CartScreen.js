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

    return (
        <>
            {!cartItems ? (
                <strong>Cart Empty!</strong>
            ) : (
                <div className='cartScreenContainer'>
                    <section className='cartItemsSection'>
                        {cartItems.map((item) => {
                            return <CartItem key={item.product} item={item} />
                        })}
                    </section>

                    <section className='checkoutSection'>
                        <span className='block'></span>
                        <strong>
                            Total items:
                            {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                        </strong>
                        <strong>
                            Total Price:
                            {cartItems.reduce(
                                (acc, item) => acc + item.qty * item.price,
                                0
                            )}
                        </strong>
                        <button className='checkout'>Check-Out</button>
                    </section>
                </div>
            )}
        </>
    )
}

export default CartScreen
