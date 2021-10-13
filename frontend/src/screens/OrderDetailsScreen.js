import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getOrder } from '../actions/orderActions'

import Message from '../components/Message'
import Loading from '../components/Loading'
import OrderItem from '../components/OrderItem'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'

import './css/OrderDetailsScreen.css'

const OrderDetailsScreen = ({ match, history }) => {
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
                        <section>
                            <Link className='backwardLink' to={'/profile'}>
                                <FontAwesomeIcon icon={faLongArrowAltLeft} /> GO
                                BACK
                            </Link>
                            <span className='orderItems'>
                                <strong style={{ fontSize: '2em' }}>
                                    ITEMS
                                </strong>
                                {orderDetails.orderItems.map((item) => (
                                    <OrderItem
                                        item={item}
                                        key={orderDetails._id}
                                    />
                                ))}
                            </span>
                        </section>
                        <section className='orderPrice'>
                            <div className='shippingDetails'>
                                <strong
                                    style={{
                                        fontSize: '2em',
                                        margin: '1rem',
                                    }}
                                >
                                    Shipping Address
                                </strong>
                                <strong
                                    style={{
                                        fontSize: '1.2em',
                                        margin: '1rem',
                                    }}
                                >
                                    {`${orderDetails.shippingAddress.address},
                         ${orderDetails.shippingAddress.city},
                          ${orderDetails.shippingAddress.state} -
                          ${orderDetails.shippingAddress.postalCode}  `}
                                </strong>
                            </div>
                            {orderDetails.isDelivered ? (
                                <span className='deliveryStatus success'>
                                    Delivered
                                </span>
                            ) : (
                                <span className='deliveryStatus error'>
                                    Delivery Pending
                                </span>
                            )}
                        </section>
                    </div>
                )
            )}
        </>
    )
}

export default OrderDetailsScreen
