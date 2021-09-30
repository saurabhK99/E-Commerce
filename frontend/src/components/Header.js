import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faSearch } from '@fortawesome/free-solid-svg-icons'

import DropDown from '../components/DropDown'

import './css/Header.css'
import AdminPanel from './AdminPanel'
import { listProducts } from '../actions/productActions'

const Header = () => {
    const [filter, setFilter] = useState('')

    const dispatch = useDispatch()

    const user = useSelector((s) => s.userLogin)

    const { userInfo } = user

    const searchHandler = () => {
        dispatch(listProducts(filter))
    }

    return (
        <>
            <div className='headerContainer'>
                <Link to='/'>
                    <h2 className='headerH1'>E-Commerce</h2>
                </Link>
                <ul className='headerUl'>
                    <li className='headerSearchBox'>
                        <input
                            className='searchBoxInput'
                            type='text'
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                        <button
                            className='searchBoxButton'
                            onClick={searchHandler}
                        >
                            <FontAwesomeIcon
                                icon={faSearch}
                                style={{
                                    color: 'whitesmoke',
                                    fontSize: '1.5em',
                                }}
                            />
                        </button>
                    </li>
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
