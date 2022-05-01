import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons'

import { userLogout } from '../actions/userActions'

import { useDispatch } from 'react-redux'

import './css/DropDown.css'

const DropDown = ({ userInfo, response }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [containerName, setContainerName] = useState(
        response ? 'dropDownClickContainer disableCurrent' : 'dropDownContainer'
    )

    const logoutHandler = () => {
        dispatch(userLogout())
        history.push('/')
    }

    const userClickHandler = () => {
        const elements = document.querySelectorAll('.user')
        let elem

        if (elements && elements[1]) elem = elements[1].classList

        if (elem && elem.contains('dropDownClickContainer')) {
            if (elem.contains('disableCurrent'))
                setContainerName('dropDownClickContainer')
            else setContainerName('dropDownClickContainer disableCurrent')
        }
    }

    return (
        <>
            <span
                className='headerLink dropDownHandler'
                onClick={userClickHandler}
            >
                {userInfo.name}

                <div className={`${containerName} user`}>
                    <Link className='dropDownLink' to='/profile'>
                        <FontAwesomeIcon
                            className='dropDownIcon'
                            icon={faUserCircle}
                        />
                    </Link>
                    <span className='dropDownLink' onClick={logoutHandler}>
                        <FontAwesomeIcon
                            className='dropDownIcon'
                            icon={faSignOutAlt}
                        />
                    </span>
                </div>
            </span>
        </>
    )
}

export default DropDown
