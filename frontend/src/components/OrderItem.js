import React from 'react'

import './css/OrderItem.css'

const OrderItem = ({ item }) => {
    return (
        <div className='itemContainer'>
            <img
                style={{ height: '8em', borderRadius: '5px' }}
                src={item.image}
                alt='product-img'
            />
            <strong>{item.name}</strong>
            <strong>
                {item.qty} X {item.price} = {(item.qty * item.price).toFixed(0)}
            </strong>
        </div>
    )
}

export default OrderItem
