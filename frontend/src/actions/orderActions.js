import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_GET_ALL_FAIL,
    ORDER_GET_ALL_REQUEST,
    ORDER_GET_ALL_SUCCESS,
    ORDER_GET_FAIL,
    ORDER_GET_REQUEST,
    ORDER_GET_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_ADMIN_GET_ALL_REQUEST,
    ORDER_ADMIN_GET_ALL_SUCCESS,
    ORDER_ADMIN_GET_ALL_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
} from '../constants/orderConstants'

import axios from 'axios'

export const createOrder = (orderBody) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST })

    const token =
        getState().userLogin.userInfo && getState().userLogin.userInfo.token

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }
    try {
        const { data } = await axios.post('/api/orders', orderBody, config)

        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: err.response ? err.response.data.error : err.message,
        })
    }
}

export const payOrder = (paymentBody) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST })

    const token =
        getState().userLogin.userInfo && getState().userLogin.userInfo.token

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }

    try {
        const { data } = await axios.put('/api/orders', paymentBody, config)

        console.log(data)

        dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
    } catch (err) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: err.response ? err.response.data.error : err.message,
        })
    }
}

export const getOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_GET_REQUEST })

    const token =
        getState().userLogin.userInfo && getState().userLogin.userInfo.token

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    try {
        const { data } = await axios.get(`/api/orders/${orderId}`, config)

        dispatch({ type: ORDER_GET_SUCCESS, payload: data })
    } catch (err) {
        dispatch({
            type: ORDER_GET_FAIL,
            error: err.response ? err.response.data.error : err.message,
        })
    }
}

export const getAllOrder = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_GET_ALL_REQUEST })

    const token =
        getState().userLogin.userInfo && getState().userLogin.userInfo.token

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    try {
        const { data } = await axios.get(`/api/orders`, config)

        dispatch({ type: ORDER_GET_ALL_SUCCESS, payload: data })
    } catch (err) {
        dispatch({
            type: ORDER_GET_ALL_FAIL,
            error: err.response ? err.response.data.error : err.message,
        })
    }
}

export const getAllAdminOrders = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_ADMIN_GET_ALL_REQUEST })

    const token =
        getState().userLogin.userInfo && getState().userLogin.userInfo.token

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    try {
        const { data } = await axios.get(`/api/orders/admin`, config)

        dispatch({ type: ORDER_ADMIN_GET_ALL_SUCCESS, payload: data })
    } catch (err) {
        dispatch({
            type: ORDER_ADMIN_GET_ALL_FAIL,
            error: err.response ? err.response.data.error : err.message,
        })
    }
}

export const orderSetDelivered = (id) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DELIVER_REQUEST })

    const token =
        getState().userLogin.userInfo && getState().userLogin.userInfo.token

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    }
    try {
        const { data } = await axios.put(`/api/orders/admin`, { id }, config)

        dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data })
    } catch (err) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            error: err.response ? err.response.data.error : err.message,
        })
    }
}
