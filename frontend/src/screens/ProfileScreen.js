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
        history.push('/')
    }

    return (
        <>
            <button
                className='userActionButton'
                style={{marginRight:'1em', padding:'0.5em', borderRadius:'0'}}
                onClick={updateContainerHandler}
            >
                Update Info
            </button>

            <button className='userActionButton' style={{borderRadius:'0', padding:'0.5em'}} onClick={logoutHandler}>
                <FontAwesomeIcon icon={faSignOutAlt} />
            </button>

            <UserOrderedItem orders={orders} />

            <div className='userContainer userProfileContainer updateDisabled'>
                <section className='userPageInfoContainer'>
                    <img src='images/admin.png' alt='user-login' />
                    <h2>Change the personal details here</h2>
                </section>
                <section className='userInputDetailsContainer'>
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
                        <section className='inputWrap'>
                            <input
                                type='text'
                                className='userInput'
                                value={uname}
                                onChange={(e) => setUname(e.target.value)}
                                required
                            />
                            <label>Full Name</label>
                        </section>

                        <section className='inputWrap'>
                            <input
                                type='email'
                                className='userInput'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label>Email</label>
                        </section>

                        <section className='inputWrap'>
                            <input
                                type='password'
                                className='userInput'
                                id='npass'
                                required
                            />
                            <label>Password</label>
                        </section>

                        <section className='inputWrap'>
                            <input
                                type='password'
                                className='userInput'
                                id='cpass'
                                required
                            />
                            <label>Confirm Passowrd</label>
                        </section>
                        <button className='userActionButton' type='submit'>
                            Update
                        </button>
                    </form>
                </section>
            </div>
        </>
    )
}

export default ProfileScreen
