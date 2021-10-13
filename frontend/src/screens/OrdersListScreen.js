import React, { useEffect } from 'react'
import OrderPanel from '../components/OrderPanel'
import { getAllAdminOrders } from '../actions/orderActions'
import { useDispatch, useSelector } from 'react-redux'

import Loading from '../components/Loading'
import Message from '../components/Message'

const OrdersListScreen = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllAdminOrders())
    }, [dispatch])

    const orderAdmin = useSelector((state) => state.orderAdmin)

    const { loading, error, orders } = orderAdmin

    return (
        <>
            {loading ? (
                <Loading />
            ) : error ? (
                <Message type='error'>{error}</Message>
            ) : (
                <table className='defaultTable'>
                    <thead>
                        <tr>
                            <th>order id</th>
                            <th>delivery status</th>
                            <th>mark</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <OrderPanel key={order._id} order={order} />
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default OrdersListScreen
