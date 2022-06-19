import React from 'react'
import { useDispatch } from 'react-redux'
import { getProductslist, removeProduct } from '../actions/productActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ProductPanel = ({ info }) => {
    const dispatch = useDispatch()

    const deleteProductHandler = (e) => {
        e.preventDefault()

        dispatch(removeProduct(info._id))
        setTimeout(() => dispatch(getProductslist()), 1000)
    }

    return (
        <tr className='productPanelContainer'>
            <td>
                <img
                    style={{ width: '6rem', borderRadius: '5px' }}
                    src={info.image}
                    alt='product '
                />
            </td>
            <td style={{ flex: '0 0 15%' }}>{info.name}</td>

            <td>&#8377; {info.price}</td>
            <td>{info.countInStock}</td>

            <td>
                <FontAwesomeIcon
                    className='deleteUser'
                    icon={faTrashAlt}
                    onClick={deleteProductHandler}
                />
            </td>
        </tr>
    )
}

export default ProductPanel
