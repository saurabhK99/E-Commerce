import React from 'react'
import { Link } from 'react-router-dom'

const AdminPanel = () => {
    return (
        <>
            <span className='headerLink dropDownHandler'>
                Admin Panel
                <div className='dropDownContainer'>
                    <Link className='dropDownLink' to='/admin/users'>
                        User Profiles
                    </Link>
                    <Link className='dropDownLink' to='/admin/products'>
                        Products
                    </Link>
                </div>
            </span>
        </>
    )
}

export default AdminPanel
