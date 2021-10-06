import React from 'react'
import { Link } from 'react-router-dom'

const AdminPanel = () => {
    return (
        <>
            <span className='headerLink dropDownHandler'>
                Admin Panel
                <div className='dropDownContainer admin'>
                    <Link className='dropDownLink' to='/admin/users'>
                        User Profiles
                    </Link>
                    <Link className='dropDownLink' to='/admin/products'>
                        Products
                    </Link>
                    <Link className='dropDownLink' to='/admin/orders'>
                        Orders
                    </Link>
                </div>
            </span>
        </>
    )
}

export default AdminPanel
