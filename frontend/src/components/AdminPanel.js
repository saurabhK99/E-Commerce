import React from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'

const AdminPanel = () => {
    return (
        <>
            <Link to='/admin' className='headerLink'>
                <FontAwesomeIcon icon={faUserEdit} />
            </Link>
        </>
    )
}

export default AdminPanel
