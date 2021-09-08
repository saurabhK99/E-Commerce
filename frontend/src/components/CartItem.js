import React from 'react'
import { addToCart, removeFromCart } from '../actions/cartActions'

import { useDispatch } from 'react-redux'

import './css/CartItem.css'

const CartItem = ({ item }) => {
    const dispatch = useDispatch()

    const removeHandler = () => {
        dispatch(removeFromCart(item.product))
    }

    return (
        <>
            <div className='cartItemContainer'>
                <img src={item.image} alt='' />
                <span className='itemDetails'>
                    <strong>{item.name}</strong>
                    <strong>{item.price}</strong>
                    <select
                        name='qty'
                        id='qty-id'
                        value={item.qty}
                        onChange={(e) =>
                            dispatch(
                                addToCart(item.product, Number(e.target.value))
                            )
                        }
                    >
                        {[...Array(item.countInStock).keys()].map((k) => (
                            <option key={k + 1} value={k + 1}>
                                {k + 1}
                            </option>
                        ))}
                    </select>
                </span>
                <button className='removeItem' onClick={removeHandler}>
                    remove
                </button>
            </div>
        </>
    )
}

export default CartItem
