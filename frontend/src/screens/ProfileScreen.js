import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {
    userShowProfile,
    userUpdateProfile,
    userLogout,
} from '../actions/userActions'

import { getAllOrder } from '../actions/orderActions'

import Message from '../components/Message'
import UserOrderedItem from '../components/UserOrderedItem'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'


import './css/ProfileScreen.css'

const ProfileScreen = () => {
    const [uname, setUname] = useState()
    const [email, setEmail] = useState()

    const history = useHistory()
    const dispatch = useDispatch()

    const userProfile = useSelector((s) => s.userProfile)
    const orders = useSelector((s) => s.orders.orders)
    const profileStatus = useSelector((s) => s.userUpdateStatus)

    const { profile } = userProfile

    useEffect(() => {
        if (!profile) {
            dispatch(userShowProfile())
            dispatch(getAllOrder())
        } else {
            setUname(profile.name)
            setEmail(profile.email)
        }
    }, [dispatch, profile])

    const updateContainerHandler = () => {
        const list = document.querySelector('.userProfileContainer')
        if (document.querySelector('.updateDisabled')) {
            list.classList.remove('updateDisabled')
        } else list.classList.add('updateDisabled')
    }

    const updateFormHandler = (e) => {
        e.preventDefault()

        let updateInfo = { name: uname, email }

        let npass = document.getElementById('npass').value
        let cpass = document.getElementById('cpass').value

        if (npass && cpass) {
            if (npass === cpass) {
                updateInfo = { ...updateInfo, password: npass }
                dispatch(userUpdateProfile(updateInfo))
            } else {
                alert('Password did not matched!')
            }
        }
    }

    const logoutHandler = () => {
        dispatch(userLogout())
        history.push("/")
    }

    return (
        <>
            <UserOrderedItem orders={orders} />

            <button
                className='orderScreenButton'
                style={{left:"0"}}
                onClick={updateContainerHandler}
            >
                Update Info
            </button>

            <button className='orderScreenButton' onClick={logoutHandler}>
                <FontAwesomeIcon icon={faSignOutAlt} />
            </button>

            <div className='userContainer userProfileContainer updateDisabled'>
                {profileStatus.status && (
                    <Message className='floatingMessage' type='success'>
                        {profileStatus.status.success}
                    </Message>
                )}
                {profileStatus.error && (
                    <Message className='floatingMessage' type='error'>
                        {profileStatus.error.error}
                    </Message>
                )}

                <form
                    className='userForm userProfileForm'
                    onSubmit={updateFormHandler}
                >
                    <input
                        type='text'
                        className='userInput'
                        value={uname}
                        onChange={(e) => setUname(e.target.value)}
                        placeholder='Full Name'
                    />
                    <input
                        type='email'
                        className='userInput'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='E-Mail Address'
                    />
                    <input
                        type='password'
                        className='userInput'
                        id='npass'
                        placeholder='New Password'
                    />
                    <input
                        type='password'
                        className='userInput'
                        id='cpass'
                        placeholder='Confirm Password'
                    />
                    <button className='userActionButton' type='submit'>
                        Update
                    </button>
                </form>
            </div>
        </>
    )
}

export default ProfileScreen
