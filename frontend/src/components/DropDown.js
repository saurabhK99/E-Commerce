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

    const dropDownHandler = () => {
        const list = document.querySelector('.dropDownContainer')
        if (document.querySelector('.dropDownDisabled'))
            list.classList.remove('dropDownDisabled')
        else list.classList.add('dropDownDisabled')
    }

    return (
        <>
            <span className='headerLink' onClick={dropDownHandler}>
                {userInfo.name}
            </span>
            <div className='dropDownContainer dropDownDisabled'>
                <Link className='dropDownLink' to='/profile'>
                    Profile
                </Link>
                <span className='logout' onClick={logoutHandler}>
                    Logout
                </span>
            </div>
        </>
    )
}

export default DropDown
