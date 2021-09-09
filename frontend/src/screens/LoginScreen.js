import React, { useState, useEffect } from 'react'
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
        <>
            User Login
            {loading && <Loading />}
            {error && <Message>{error}</Message>}
            <form onSubmit={submitHandler}>
                <input
                    type='text'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='email'>E-Mail: </label>
                <input
                    type='text'
                    id='pass'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor='pass'>Password: </label>
                <input type='submit' value='Login' />
            </form>
        </>
    )
}

export default LoginScreen
