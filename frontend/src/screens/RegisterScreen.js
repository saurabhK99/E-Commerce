import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { userRegistration } from '../actions/userActions'

import Message from '../components/Message'

import './css/userScreens.css'

const RegisterScreen = () => {
    const [uname, setUname] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const dispatch = useDispatch()

    const registerStatus = useSelector((s) => s.userRegisterStatus)

    const { status, error } = registerStatus

    const submitHandler = (e) => {
        e.preventDefault()

        if (uname && email && password) {
            dispatch(
                userRegistration({
                    name: uname,
                    email,
                    password,
                })
            )
        }
    }

    return (
        <div className='userContainer'>
            <section className='userPageInfoContainer'>
                <img src='images/userLogin.png' alt='user-login' />
                <h2>Welcome! we hope you'd like us</h2>
            </section>
            <section className='userInputDetailsContainer'>
                {status && status.success && (
                    <Message type='success'>{status.success}</Message>
                )}
                {error && error.error && (
                    <Message type='error'>{error.error}</Message>
                )}
                <form className='userForm' onSubmit={submitHandler}>
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
                        <label>email</label>
                    </section>

                    <section className='inputWrap'>
                        <input
                            type='password'
                            className='userInput'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label>Password</label>
                    </section>

                    <input
                        type='submit'
                        className='userActionButton'
                        value='SignUp'
                    />
                </form>
                <Link className='switchLink' to='/login'>
                    Existing User? SignIn
                </Link>
            </section>
        </div>
    )
}

export default RegisterScreen
