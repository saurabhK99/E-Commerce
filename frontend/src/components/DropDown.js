import React from 'react'
import { Link } from 'react-router-dom'

import './css/DropDown.css'

const DropDown = () => {
    return (
        <>
            <Link
                to='/profile'
                style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1.2rem',
                }}
            >
                {localStorage.getItem('userInfo')
                    ? JSON.parse(localStorage.getItem('userInfo')).name.split(
                          ' '
                      )[0]
                    : ''}
            </Link>
        </>
    )
}

export default DropDown
