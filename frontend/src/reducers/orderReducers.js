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
    ORDER_PAY_REQUEST,
    ORDER_PAY_FAIL,
    ORDER_PAY_SUCCESS,
    ORDER_ADMIN_GET_ALL_REQUEST,
    ORDER_ADMIN_GET_ALL_SUCCESS,
    ORDER_ADMIN_GET_ALL_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_REMOVE_REQUEST,
    ORDER_REMOVE_SUCCESS,
    ORDER_REMOVE_FAIL,
} from '../constants/orderConstants'

export const orderCreateReducer = (state = { orderInfo: {} }, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true }

        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                orderInfo: action.payload,
            }

        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return { ...state }
    }
}

export const orderPayReducer = (state = { status: null }, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return { loading: true }

        case ORDER_PAY_SUCCESS:
            return { loading: false, status: action.payload }

        case ORDER_PAY_FAIL:
            return { loading: false, error: action.payload }

        default:
            return { ...state }
    }
}

export const orderGetReducer = (state = { orderDetails: {} }, action) => {
    switch (action.type) {
        case ORDER_GET_REQUEST:
            return { loading: true }

        case ORDER_GET_SUCCESS:
            return { loading: false, orderDetails: action.payload }

        case ORDER_GET_FAIL:
            return { loading: false, error: action.payload }

        default:
            return { ...state }
    }
}

export const orderGetAllReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_GET_ALL_REQUEST:
            return { loading: true, ...state }

        case ORDER_GET_ALL_SUCCESS:
            return { loading: false, orders: action.payload }

        case ORDER_GET_ALL_FAIL:
            return { loading: false, error: action.payload, ...state }

        default:
            return { ...state }
    }
}

export const orderAdminGetAllReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_ADMIN_GET_ALL_REQUEST:
            return { loading: true }

        case ORDER_ADMIN_GET_ALL_SUCCESS:
            return { loading: false, orders: action.payload }

        case ORDER_ADMIN_GET_ALL_FAIL:
            return { loading: false, error: action.payload }

        default:
            return { ...state }
    }
}

export const orderDeliverReducer = (state = { status: {} }, action) => {
    switch (action.type) {
        case ORDER_DELIVER_REQUEST:
            return { loading: true }

        case ORDER_DELIVER_SUCCESS:
            return { loading: false, status: action.payload }

        case ORDER_DELIVER_FAIL:
            return { loading: false, status: action.payload }

        default:
            return { ...state }
    }
}

export const orderRemoveReducer = (state = { status: {} }, action) => {
    switch (action.type) {
        case ORDER_REMOVE_REQUEST:
            return { loading: true }

        case ORDER_REMOVE_SUCCESS:
            return { loading: false, status: action.payload }

        case ORDER_REMOVE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return { ...state }
    }
}