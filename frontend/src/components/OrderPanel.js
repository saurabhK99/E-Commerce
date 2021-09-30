import React from 'react'

import { useDispatch } from 'react-redux'

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
        <div className='orderPanelContainer'>
            <span>{order._id}</span>
            <span>{order.isDelivered ? 'Delivered' : 'Not Delivered'}</span>
            <button className='setDeliverButton' onClick={deliverHandler}>
                Mark As Delivered
            </button>
        </div>
    )
}

export default OrderPanel
