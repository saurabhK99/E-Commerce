import React from 'react'

import { Link } from 'react-router-dom'

import './css/UserOrderedItem.css'

const UserOrderedItem = ({ orders }) => {
    return (
        <div className='orderedItemContainer'>
            <strong style={{ fontSize: '2em' }}>ORDERS</strong>
            <div className='shadow'>
                <table style={{ borderSpacing: '3em 1em' }}>
                    <thead>
                        <tr>
                            <th>
                                <h3>Order Id</h3>
                            </th>
                            <th>
                                <h3>Delivery</h3>
                            </th>
                            <th>
                                <h3>Payment</h3>
                            </th>
                            <th>
                                <h3>More Info.</h3>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>
                                        {item.isDelivered ? (
                                            <span>Delivered</span>
                                        ) : (
                                            <span>Pending</span>
                                        )}
                                    </td>
                                    <td>Paid</td>
                                    <td>
                                        <Link to={`/order/${item._id}`}>
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserOrderedItem
