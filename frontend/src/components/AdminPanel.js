import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faUserEdit } from '@fortawesome/free-solid-svg-icons'

const AdminPanel = ({ response }) => {
    const [containerName, setContainerName] = useState(
        response ? 'dropDownClickContainer disableCurrent' : 'dropDownContainer'
    )

    const adminClickHandler = () => {
        const elements = document.querySelectorAll('.admin')

        let elem = elements[1].classList

        if (elem.contains('dropDownClickContainer')) {
            if (elem.contains('disableCurrent'))
                setContainerName('dropDownClickContainer')
            else setContainerName('dropDownClickContainer disableCurrent')
        }
    }

    return (
        <>
            <span className='headerLink dropDownHandler'>
                <FontAwesomeIcon
                    onClick={adminClickHandler}
                    icon={faUserEdit}
                />

                <div className={`${containerName} admin`}>
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
