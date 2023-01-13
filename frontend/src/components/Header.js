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
    faHome,
    faUserEdit,
} from '@fortawesome/free-solid-svg-icons'

import DropDown from '../components/DropDown'

import './css/Header.css'
import AdminPanel from './AdminPanel'
import { listProducts } from '../actions/productActions'

const Header = () => {
    const [filter, setFilter] = useState('')
    const [ico, setIco] = useState(faTimes)

    const dispatch = useDispatch()

    const user = useSelector((s) => s.userLogin)

    const { userInfo } = user

    const searchHandler = () => {
        dispatch(listProducts(1, filter))
        dispatch({ type: 'PRODUCT_APPLY_FILTER', payload: filter })
    }

    const menuDropDownHandler = () => {
        const header = document.querySelector('.headerUl').classList

        if (ico === faBars) {
            setIco(faTimes)
            header.remove('disableCurrent')
        } else {
            setIco(faBars)
            header.add('disableCurrent')
        }
    }

    return (
        <>
            <div className='headerContainer'>
                <Link to='/' className='mainLogo'>
                    <img src='images/mainLogo.png' alt='e-com' />
                </Link>
                <span className='headerSearchBox'>
                    <input
                        className='searchBoxInput'
                        type='text'
                        placeholder='Search E-Commerce'
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <button className='searchBoxButton' onClick={searchHandler}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </span>
                <ul className='headerUl'>
                    <li>
                        <Link className='headerLink' to='/cart'>
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </Link>
                    </li>

                    <li>
                        {userInfo && userInfo.admin && (
                            <Link className='headerLink' to='/admin'>
                                <FontAwesomeIcon icon={faUserEdit} />
                            </Link>
                        )}
                    </li>

                    <li>
                        {!userInfo && (
                            <Link className='headerLink' to='/login'>
                                <FontAwesomeIcon icon={faSignInAlt} />
                            </Link>
                        )}
                        {userInfo && (
                            <Link className='headerLink' to='/profile'>
                                {userInfo.name.split(' ')[0]}{' '}
                            </Link>
                        )}
                    </li>
                </ul>
                <span className='menuDropDownButton'>
                    <FontAwesomeIcon onClick={menuDropDownHandler} icon={ico} />
                </span>

                <div className='dropDownFloatingContainer'>
                    <span>
                        <Link className='headerLink' to='/'>
                            <FontAwesomeIcon icon={faHome} />
                        </Link>
                    </span>
                    <span>
                        <Link className='headerLink' to='/cart'>
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </Link>
                    </span>

                    <span>
                        {!userInfo && (
                            <Link className='headerLink' to='/login'>
                                <FontAwesomeIcon icon={faSignInAlt} />
                            </Link>
                        )}
                    </span>
                    <span>{userInfo && userInfo.admin && <AdminPanel />}</span>
                    <span>{userInfo && <DropDown />}</span>
                </div>
            </div>
        </>
    )
}

export default Header
