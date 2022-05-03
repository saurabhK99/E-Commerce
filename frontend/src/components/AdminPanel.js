import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faUserEdit, faBars } from '@fortawesome/free-solid-svg-icons'

const AdminPanel = ({ response, setIcon }) => {
    const [containerName, setContainerName] = useState(
        response ? 'dropDownClickContainer disableCurrent' : 'dropDownContainer'
    )

    const adminClickHandler = () => {
        const elements = document.querySelectorAll('.admin')

        let elem
        if(elements && elements[1]) elem = elements[1].classList

        if (elem && elem.contains('dropDownClickContainer')) {
            if (elem.contains('disableCurrent'))
                setContainerName('dropDownClickContainer')
            else {
                setContainerName('dropDownClickContainer disableCurrent')
                setIcon(faBars)
            }
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
                    <Link className='dropDownLink' to='/admin/users' onClick={adminClickHandler}>
                        User Profiles
                    </Link>
                    <Link className='dropDownLink' to='/admin/products' onClick={adminClickHandler}>
                        Products
                    </Link>
                    <Link className='dropDownLink' to='/admin/orders' onClick={adminClickHandler}>
                        Orders
                    </Link>
                </div>
            </span>
        </>
    )
}

export default AdminPanel
