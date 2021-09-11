import axios from 'axios'
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    USER_PROFILE_LOGOUT,
    USER_PROFILE_UPDATE_REQUEST,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_UPDATE_FAIL,
    USER_REGISTRATION_REQUEST,
    USER_REGISTRATION_SUCCESS,
    USER_REGISTRATION_FAIL,
} from '../constants/userConstants'

export const userRegistration = (registerBody) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        dispatch({
            type: USER_REGISTRATION_REQUEST,
        })

        const { data } = await axios.post('/api/users', registerBody, config)

        dispatch({
            type: USER_REGISTRATION_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: USER_REGISTRATION_FAIL,
            payload: err.response ? err.response.data.error : err.message,
        })
    }
}

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

export const userLogout = () => async (dispatch, setState) => {
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_PROFILE_LOGOUT })
    localStorage.removeItem('userInfo')
}

export const userShowProfile = () => async (dispatch, getState) => {
    const token =
        getState().userLogin.userInfo && getState().userLogin.userInfo.token

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    try {
        dispatch({ type: USER_PROFILE_REQUEST })

        const { data } = await axios.get('/api/users/profile', config)

        dispatch({ type: USER_PROFILE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: err.message,
        })
    }
}

export const userUpdateProfile = (updateBody) => async (dispatch, getState) => {
    const token =
        getState().userLogin.userInfo && getState().userLogin.userInfo.token

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    try {
        dispatch({ type: USER_PROFILE_UPDATE_REQUEST })

        const { data } = await axios.put(
            '/api/users/profile',
            updateBody,
            config
        )

        dispatch({ type: USER_PROFILE_UPDATE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({
            type: USER_PROFILE_UPDATE_FAIL,
            payload: err.response ? err.response.data.error : err.message,
        })
    }
}
