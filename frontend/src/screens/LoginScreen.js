import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

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
            <span className='userPageHeading'>
                <FontAwesomeIcon icon={faUser} />
            </span>
            {loading && <Loading />}
            {error && <Message type='error'>{error}</Message>}
            <form className='userForm' onSubmit={submitHandler}>
                <input
                    type='text'
                    className='userInput'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='E-Mail Address'
                />

                <input
                    type='password'
                    className='userInput'
                    id='pass'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                />
                <input
                    className='userActionButton'
                    type='submit'
                    value='SignIn'
                />
            </form>
            <Link className='switchLink' to='/register'>
                New User? SignUp
            </Link>
        </div>
    )
}

export default LoginScreen
