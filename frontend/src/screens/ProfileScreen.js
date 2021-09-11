import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { userShowProfile, userUpdateProfile } from '../actions/userActions'

import Loading from '../components/Loading'
import Message from '../components/Message'

import './css/ProfileScreen.css'

const ProfileScreen = () => {
    const [uname, setUname] = useState()
    const [email, setEmail] = useState()

    const dispatch = useDispatch()

    const userProfile = useSelector((s) => s.userProfile)

    const { loading, error, profile } = userProfile

    useEffect(() => {
        if (!profile) dispatch(userShowProfile())
        else {
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
            } else {
                console.log('pass did not match!!!')
            }
        }
        dispatch(userUpdateProfile(updateInfo))
    }

    const profileStatus = useSelector((s) => s.userUpdateStatus)

    return (
        <>
            {loading && <Loading />}
            {error && <Message>{error}</Message>}
            <button
                className='toggleUpdateButton'
                onClick={updateContainerHandler}
            >
                Update Info
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

                <form className='userForm' onSubmit={updateFormHandler}>
                    <input
                        type='text'
                        value={uname}
                        onChange={(e) => setUname(e.target.value)}
                        placeholder='Full Name'
                    />
                    <input
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='E-Mail Address'
                    />
                    <input
                        type='password'
                        id='npass'
                        placeholder='New Password'
                    />
                    <input
                        type='password'
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
