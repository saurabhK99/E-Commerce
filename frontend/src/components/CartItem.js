import React from 'react'
import { addToCart, removeFromCart } from '../actions/cartActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { useDispatch } from 'react-redux'

import './css/CartItem.css'

const CartItem = ({ item, disable }) => {
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
                    <strong>&#8377; {item.price}</strong>
                    <span className='qtyContainer'>
                        <select
                            className='selectContainer'
                            name='qty'
                            id='qty-id'
                            value={item.qty}
                            onChange={(e) =>
                                dispatch(
                                    addToCart(
                                        item.product,
                                        Number(e.target.value)
                                    )
                                )
                            }
                        >
                            {[...Array(item.countInStock).keys()].map((k) => (
                                <option key={k + 1} value={k + 1}>
                                    {k + 1}
                                </option>
                            ))}
                        </select>

                        <FontAwesomeIcon
                            className={`removeItemButton ${disable}`}
                            onClick={removeHandler}
                            icon={faTrashAlt}
                        />
                    </span>
                </span>
            </div>
        </>
    )
}

export default CartItem
