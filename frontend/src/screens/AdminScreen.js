import React from 'react'
import { Link } from 'react-router-dom'

import './css/adminScreen.css'

const AdminScreen = () => {
    const {name} = JSON.parse(localStorage['userInfo'])

    return (
        <div className='adminContainer'>
            <section className='adminGreeting'>
                <img src="images/admin.png" alt="admin" />
                <h1>holla! {name}</h1>
            </section>
            <section className='adminControlContainer'>
                <Link className='adminControlLink' to='/admin/orders'>
                    All Orders
                </Link>
                <Link className='adminControlLink' to='/admin/products'>
                    All Products
                </Link>
                <Link className='adminControlLink' to='/admin/users'>
                    All Users
                </Link>
            </section>
        </div>
    )
}

export default AdminScreen
