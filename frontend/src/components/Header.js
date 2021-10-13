import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
    faSearch,
    faBars,
    faTimes,
    faShoppingCart,
    faSignInAlt,
} from '@fortawesome/free-solid-svg-icons'

import DropDown from '../components/DropDown'

import './css/Header.css'
import AdminPanel from './AdminPanel'
import { listProducts } from '../actions/productActions'

const Header = () => {
    const [filter, setFilter] = useState('')
    const [ico, setIco] = useState(faBars)

    const dispatch = useDispatch()

    const user = useSelector((s) => s.userLogin)

    const { userInfo } = user

    const searchHandler = () => {
        dispatch(listProducts(1, filter))
        dispatch({ type: 'PRODUCT_APPLY_FILTER', payload: filter })
    }

    const menuDropDownHandler = () => {
        if (ico === faBars) {
            setIco(faTimes)
        } else setIco(faBars)
    }

    return (
        <>
            <div className='headerContainer'>
                <Link to='/' className='mainLogo'>
                    <img src='logo/mainLogo.png' alt='website logo' />
                </Link>
                <span className='headerSearchBox'>
                    <input
                        className='searchBoxInput'
                        type='text'
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <button className='searchBoxButton' onClick={searchHandler}>
                        <FontAwesomeIcon
                            icon={faSearch}
                            style={{
                                color: 'whitesmoke',
                                fontSize: '1.5em',
                            }}
                        />
                    </button>
                </span>
                <ul className='headerUl'>
                    <li className='responsiveLi'>
                        <Link className='headerLink' to='/cart'>
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </Link>
                    </li>

                    <li className='responsiveLi'>
                        {userInfo && userInfo.admin && <AdminPanel />}
                    </li>
                    <li className='responsiveLi'>
                        {!userInfo && (
                            <Link className='headerLink' to='/login'>
                                <FontAwesomeIcon icon={faSignInAlt} />
                            </Link>
                        )}
                        {userInfo && <DropDown userInfo={userInfo} />}
                    </li>
                </ul>
                <span>
                    <FontAwesomeIcon
                        className='menuDropDownButton'
                        onClick={menuDropDownHandler}
                        icon={ico}
                    />
                </span>
                <div className='dropDownFloatingContainer'>
                    <span>
                        {ico === faTimes && (
                            <Link className='headerLink' to='/cart'>
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </Link>
                        )}
                    </span>
                    <span>
                        {ico === faTimes && userInfo && userInfo.admin && (
                            <AdminPanel response='click' />
                        )}
                    </span>
                    <span>
                        {ico === faTimes && userInfo && (
                            <DropDown response='click' userInfo={userInfo} />
                        )}
                    </span>
                </div>
            </div>
        </>
    )
}

export default Header
