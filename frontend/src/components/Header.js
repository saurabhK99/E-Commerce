import React from 'react'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'

import DropDown from '../components/DropDown'

import './css/Header.css'
import AdminPanel from './AdminPanel'

const Header = () => {
    const user = useSelector((s) => s.userLogin)

    const { userInfo } = user

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

                    <li>{userInfo && userInfo.admin && <AdminPanel />}</li>
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
