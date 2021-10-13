import React from 'react'
import { useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTruck,
    faCheckCircle,
    faTimesCircle,
} from '@fortawesome/free-solid-svg-icons'

import './css/CommonPanel.css'

import { getAllAdminOrders, orderSetDelivered } from '../actions/orderActions'

const OrderPanel = ({ order }) => {
    const dispatch = useDispatch()

    const deliverHandler = () => {
        dispatch(orderSetDelivered(order._id))

        setTimeout(() => {
            dispatch(getAllAdminOrders())
        }, 500)
    }

    return (
        <tr>
            <td>{order._id}</td>
            <td>
                {order.isDelivered ? (
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        style={{ color: 'green' }}
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={faTimesCircle}
                        style={{ color: 'red' }}
                    />
                )}
            </td>
            <td>
                <FontAwesomeIcon
                    className='markDelivered'
                    icon={faTruck}
                    onClick={deliverHandler}
                />
            </td>
        </tr>
    )
}

export default OrderPanel
