import React from 'react'
import { useDispatch } from 'react-redux'
import { getProductslist, removeProduct } from '../actions/productActions'

import './css/ProductPanel.css'

const ProductPanel = ({ info }) => {
    const dispatch = useDispatch()

    const deleteUserHandler = (e) => {
        e.preventDefault()

        dispatch(removeProduct(info._id))
        setTimeout(() => dispatch(getProductslist()), 1000)
    }

    return (
        <div className='productPanelContainer'>
            <span className='poductPanelCol'>
                <img
                    style={{ width: '8em', borderRadius: '5px' }}
                    src={info.image}
                    alt='product '
                />
            </span>
            <span className='poductPanelName' style={{ flex: '0 0 10%' }}>
                {info.name}
            </span>

            <span className='poductPanelCol'>&#8377; {info.price}</span>
            <span className='poductPanelCol'>Qty: {info.countInStock}</span>

            <span className='poductPanelCol'>
                <button className='deleteUser' onClick={deleteUserHandler}>
                    Delete
                </button>
            </span>
        </div>
    )
}

export default ProductPanel
