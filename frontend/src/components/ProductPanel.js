import React from 'react'
import { useDispatch } from 'react-redux'
import { getProductslist, removeProduct } from '../actions/productActions'

import './css/ProductPanel.css'

const ProductPanel = ({ info }) => {
    const dispatch = useDispatch()

    const deleteProductHandler = (e) => {
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
            <span style={{ flex: '0 0 15%' }}>{info.name}</span>

            <span>&#8377; {info.price}</span>
            <span>Qty: {info.countInStock}</span>

            <span>
                <button className='deleteButton' onClick={deleteProductHandler}>
                    Delete
                </button>
            </span>
        </div>
    )
}

export default ProductPanel
