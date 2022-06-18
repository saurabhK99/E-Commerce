import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getOrder } from '../actions/orderActions'

import Message from '../components/Message'
import Loading from '../components/Loading'
import OrderItem from '../components/OrderItem'

import './css/OrderDetailsScreen.css'

const OrderDetailsScreen = ({ match }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(match.params.id)
        dispatch(getOrder(match.params.id))
    }, [dispatch, match])

    const order = useSelector((s) => s.order)
    const { orderDetails, loading, error } = order
    return (
        <>
            {loading ? (
                <Loading />
            ) : error ? (
                <Message type='error'>{error}</Message>
            ) : (
                orderDetails.orderItems && (
                    <div className='orderContainer'>
                        <section className='orderItems'>
                            {orderDetails.isDelivered ? (
                                <span className='deliveryStatus success'>
                                    Delivered
                                </span>
                            ) : (
                                <span className='deliveryStatus error'>
                                    Delivery Pending
                                </span>
                            )}
                            <strong
                                style={{
                                    textTransform: 'uppercase',
                                    color: 'gray',
                                    boxShadow: '0 1px 0 rgb(0,0,0,0.2)',
                                    margin: '1em',
                                }}
                            >
                                Items
                            </strong>
                            {orderDetails.orderItems.map((item) => (
                                <OrderItem item={item} key={orderDetails._id} />
                            ))}
                        </section>

                        <section className='shippingDetails'>
                            <strong
                                style={{
                                    textTransform: 'uppercase',
                                    color: 'gray',
                                    boxShadow: '0 1px 0 rgb(0,0,0,0.2)',
                                    margin: '1em',
                                }}
                            >
                                Shipped To
                            </strong>
                            <strong>
                                {`${orderDetails.shippingAddress.address},
                         ${orderDetails.shippingAddress.city},
                          ${orderDetails.shippingAddress.state} -
                          ${orderDetails.shippingAddress.postalCode}  `}
                            </strong>
                        </section>
                    </div>
                )
            )}
        </>
    )
}

export default OrderDetailsScreen
