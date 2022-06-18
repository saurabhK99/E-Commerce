import React from 'react'

import './css/OrderItem.css'

const OrderItem = ({ item }) => {
    return (
        <div className='itemContainer'>
            <img
                className='orderItemImage'
                src={item.image}
                alt='product-img'
            />
            <span className='orderItemSpecContainer'>
                <h4>{item.name}</h4>
                <h4>
                    {item.qty} X {item.price} = &#8377;
                    {(item.qty * item.price).toFixed(0)}
                </h4>
            </span>
        </div>
    )
}

export default OrderItem
