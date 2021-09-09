import axios from 'axios'
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
} from '../constants/userConstants'

export const userLogin = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })

        const { data } = await axios.post(
            '/api/users/login',
            { email, password },
            config
        )
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })
        localStorage['userInfo'] = JSON.stringify(data)
    } catch (err) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: err.response ? err.response.data.error : err.message,
        })
    }
}

export const userLogout = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT })
    localStorage.removeItem('userInfo')
}
