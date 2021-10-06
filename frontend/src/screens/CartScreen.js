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
                        <span>
                            Total items:{' '}
                            {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                        </span>
                        <span>
                            Total Price: &#8377;
                            {cartItems.reduce(
                                (acc, item) => acc + item.qty * item.price,
                                0
                            )}
                        </span>
                        <button className='checkout' onClick={checkoutHandler}>
                            Check-Out
                        </button>
                    </section>
                </div>
            )}
        </>
    )
}

export default CartScreen
