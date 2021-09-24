import axios from 'axios'

import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_GET_LIST_FAIL,
    PRODUCT_GET_LIST_REQUEST,
    PRODUCT_GET_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_REMOVE_FAIL,
    PRODUCT_REMOVE_REQUEST,
    PRODUCT_REMOVE_SUCCESS,
} from '../constants/productConstants'

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await axios.get('/api/products')
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: err.message })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: err.message })
    }
}

export const getProductslist = () => async (dispatch, getState) => {
    const token =
        getState().userLogin.userInfo && getState().userLogin.userInfo.token

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    try {
        dispatch({ type: PRODUCT_GET_LIST_REQUEST })
        const { data } = await axios.get('/api/products/admin', config)

        dispatch({ type: PRODUCT_GET_LIST_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: PRODUCT_GET_LIST_FAIL, payload: err.message })
    }
}

export const removeProduct = (productId) => async (dispatch, getState) => {
    const token =
        getState().userLogin.userInfo && getState().userLogin.userInfo.token

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            id: productId,
        },
    }
    try {
        dispatch({ type: PRODUCT_REMOVE_REQUEST })
        const { data } = await axios.delete('/api/products/admin', config)
        dispatch({ type: PRODUCT_REMOVE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: PRODUCT_REMOVE_FAIL, payload: err.message })
    }
}
