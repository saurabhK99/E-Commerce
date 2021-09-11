import React from 'react'
import { Link } from 'react-router-dom'

import { userLogout } from '../actions/userActions'

import { useDispatch } from 'react-redux'

import './css/DropDown.css'

const DropDown = ({ userInfo }) => {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(userLogout())
    }

    return (
        <>
            <span className='headerLink dropDownHandler'>
                {userInfo.name}

                <div className='dropDownContainer'>
                    <Link className='dropDownLink' to='/profile'>
                        Profile
                    </Link>
                    <span className='logout' onClick={logoutHandler}>
                        Logout
                    </span>
                </div>
            </span>
        </>
    )
}

export default DropDown
