import axios from 'axios'

import {
    LATEST_PRODUCT_LIST_FAIL,
    LATEST_PRODUCT_LIST_REQUEST,
    LATEST_PRODUCT_LIST_SUCCESS,
    PRODUCT_ADD_FAIL,
    PRODUCT_ADD_REQUEST,
    PRODUCT_ADD_SUCCESS,
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
    PRODUCT_REVIEW_FAIL,
    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_SUCCESS,
} from '../constants/productConstants'

export const listLatestProducts = () => async (dispatch) => {
    try {
        dispatch({ type: LATEST_PRODUCT_LIST_REQUEST })
        const { data } = await axios.get('/api/products/latest')
        dispatch({ type: LATEST_PRODUCT_LIST_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: LATEST_PRODUCT_LIST_FAIL, paylaod: err.message })
    }
}

export const listProducts =
    (page = '1', filter = '') =>
    async (dispatch) => {
        try {
            dispatch({ type: PRODUCT_LIST_REQUEST })
            const { data } = await axios.get(
                `/api/products?page=${page}&filter=${filter}`
            )
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

export const addProduct = (productDetails) => async (dispatch, getState) => {
    const token =
        getState().userLogin.userInfo && getState().userLogin.userInfo.token

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    }
    try {
        dispatch({ type: PRODUCT_ADD_REQUEST })
        const { data } = await axios.post(
            '/api/products/admin',
            productDetails,
            config
        )
        dispatch({ type: PRODUCT_ADD_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: PRODUCT_ADD_FAIL, payload: err.message })
    }
}

export const addReview =
    (productId, reviewBody) => async (dispatch, getState) => {
        const token =
            getState().userLogin.userInfo && getState().userLogin.userInfo.token

        dispatch({ type: PRODUCT_REVIEW_REQUEST })

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.put(
            '/api/products/review',
            { productId, review: reviewBody },
            config
        )
        dispatch({ type: PRODUCT_REVIEW_SUCCESS, payload: data })

        try {
        } catch (err) {
            dispatch({
                type: PRODUCT_REVIEW_FAIL,
                payload: err.response ? err.response.data.error : err.message,
            })
        }
    }
