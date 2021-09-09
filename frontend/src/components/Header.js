import React from 'react'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import { userLogout } from '../actions/userActions'

import DropDown from '../components/DropDown'

import './css/Header.css'

const Header = () => {
    const dispatch = useDispatch()
    const user = useSelector((s) => s.userLogin)

    const { userInfo } = user

    const logoutHandler = () => {
        dispatch(userLogout())
    }

    return (
        <>
            <div className='headerContainer'>
                <Link to='/'>
                    <h2 className='headerH1'>E-Commerce</h2>
                </Link>
                <ul className='headerUl'>
                    <li>
                        <Link className='headerLink' to='/cart'>
                            Cart
                        </Link>
                    </li>

                    <li>
                        {!userInfo && (
                            <Link className='headerLink' to='/login'>
                                Login
                            </Link>
                        )}
                        {userInfo && <DropDown userInfo={userInfo} />}
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Header
