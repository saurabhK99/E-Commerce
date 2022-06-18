import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import OrderItem from '../components/OrderItem'
import Shipping from '../components/Shipping'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { createOrder, payOrder } from '../actions/orderActions'

import './css/OrderSummaryScreen.css'
import { faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons'

const OrderSummaryScreen = ({ history }) => {
    const dispatch = useDispatch()

    const cartItems = useSelector((s) => s.cart.cartItems)
    const userInfo = useSelector((s) => s.userLogin.userInfo)
    const orderInfo = useSelector((s) => s.orderCreateStatus.orderInfo)
    const payStatus = useSelector((s) => s.orderPayStatus.status)

    const [itemsPrice, setItemsPrice] = useState(0)
    const [taxPrice, setTaxPrice] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [orderCreated, setOrderCreated] = useState(false)

    useEffect(() => {
        let itemsTotal = cartItems
            .reduce((acc, item) => acc + item.price * item.qty, 0)
            .toFixed(0)

        setItemsPrice(itemsTotal)

        let taxTotal = ((itemsTotal * 2) / 100).toFixed(0)

        setTaxPrice(taxTotal)

        let total = Number(Number(itemsTotal) + Number(taxTotal))

        setTotalPrice(total)

        if (orderCreated) {
            const orderBtn = document.querySelector('.orderActionButton')
            const payBtn = document.querySelector('.orderPayButton')

            payBtn.classList.remove('disableCurrent')
            orderBtn.classList.add('disableCurrent')
        }

        if (payStatus) {
            history.push('/profile')
        }
    }, [cartItems, history, payStatus, orderCreated])

    const placeOrderHandler = (e) => {
        e.preventDefault()

        const orderBody = {
            orderItems: cartItems,
            user: userInfo._id,
            shippingAddress: userInfo.shippingAddress,
            amount: totalPrice * 100,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: {
                description: 'shopped with E-Commerce!',
            },
        }

        setOrderCreated(true)

        dispatch(createOrder(orderBody))
    }

    const payHandler = (e) => {
        e.preventDefault()

        var razorpayObject = new window.Razorpay({
            key: 'rzp_test_JaAmveBrrhzK1D',
            amount: totalPrice * 100,
            currency: 'INR',
            name: 'E-Commerce',
            description: 'E-Commerce Website',
            order_id: orderInfo.id,
            handler: function (response) {
                console.log(response)
                dispatch(
                    payOrder({
                        paymentResponse: response,
                        id: orderInfo.orderId,
                        order_id: orderInfo.id,
                    })
                )
            },
            prefill: {
                contact: '9876543210',
                name: userInfo.name,
                email: userInfo.email,
            },
            notes: {
                desc: 'Purchased from E-Commerce Website',
            },
            theme: {
                color: '#2300a3',
            },
        })
        console.log(razorpayObject)

        razorpayObject.on('payment.failed', function (response) {
            alert('This step of Payment Failed')
        })

        razorpayObject.open()
    }

    return (
        <div className='orderContainer'>
            <section className='orderItems'>
                <h4 style={{ color:'gray', boxShadow: '0 1px 0 rgb(0,0,0,0.2)', margin: '1em'}}>ITEMS</h4>
                {cartItems.map((i) => (
                    <OrderItem key={i.product} item={i} />
                ))}
                <Shipping />
            </section>

            <section className='totalPriceContainer'>
                <h4
                    style={{
                        color: 'gray',
                        boxShadow: '0 1px 0px rgb(0,0,0,0.2)',
                        marginBottom: '1em',
                        textTransform: 'uppercase',
                    }}
                >
                    Price Details
                </h4>
                <span className='totalPriceContainerSpan'>
                    <strong>Items Price</strong>
                    <span>&#8377;{itemsPrice}</span>
                </span>

                <span className='totalPriceContainerSpan'>
                    <strong>GST</strong>
                    <span>&#8377;{taxPrice}</span>
                </span>

                <span className='totalPriceContainerSpan'>
                    <strong>Total</strong>
                    <strong>&#8377;{totalPrice.toFixed(2)}</strong>
                </span>

                <button
                    onClick={placeOrderHandler}
                    className='orderActionButton'
                >
                    <FontAwesomeIcon icon={faMoneyBillAlt} /> &nbsp;Place Order
                </button>

                <button
                    style={{ alignSelf: 'center', width: '95%' }}
                    onClick={payHandler}
                    className=' disableCurrent orderPayButton'
                >
                    PAY WITH RAZORPAY
                </button>
            </section>
        </div>
    )
}

export default OrderSummaryScreen
