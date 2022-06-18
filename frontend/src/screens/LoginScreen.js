import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { userLogin } from '../actions/userActions'
import Loading from '../components/Loading'
import Message from '../components/Message'

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const user = useSelector((s) => s.userLogin)

    const { loading, error, userInfo } = user

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [redirect, history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(userLogin(email, password))
    }

    return (
        <div className='userContainer'>
            <section className='userPageInfoContainer'>
                <img src="images/userLogin.png" alt="user-login" />
                <h2>Get access to your personal account</h2>
            </section>
            <section className='userInputDetailsContainer'>
                {loading && <Loading />}
                {error && <Message type='error'>{error}</Message>}
                <form className='userForm' onSubmit={submitHandler}>
                    <section className='inputWrap'>
                        <input
                            type='email'
                            className='userInput'
                            id='email'
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
                            id='pass'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label>Password</label>
                    </section>
                    <input
                        className='userActionButton'
                        type='submit'
                        value='Sign-In'
                    />
                </form>
                <Link className='switchLink' to='/register'>
                    <strong>New to E-COM? Join Us!</strong>
                </Link>
            </section>
        </div>
    )
}

export default LoginScreen
