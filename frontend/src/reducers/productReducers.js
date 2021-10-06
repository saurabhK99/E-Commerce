import {
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
    PRODUCT_APPLY_FILTER,
} from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, ...state }

        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages,
            }

        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productDetailsReducer = (state = { product: [] }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }

        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }

        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productsGetListReducer = (
    state = { productsList: [] },
    action
) => {
    switch (action.type) {
        case PRODUCT_GET_LIST_REQUEST:
            return { loading: true, ...state }

        case PRODUCT_GET_LIST_SUCCESS:
            return { loading: false, productsList: action.payload }

        case PRODUCT_GET_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productRemoveReducer = (state = { status: {} }, action) => {
    switch (action.type) {
        case PRODUCT_REMOVE_REQUEST:
            return { loading: true, ...state }

        case PRODUCT_REMOVE_SUCCESS:
            return { loading: false, status: action.payload }

        case PRODUCT_REMOVE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productAddReducer = (state = { status: {} }, action) => {
    switch (action.type) {
        case PRODUCT_ADD_REQUEST:
            return { loading: true, ...state }

        case PRODUCT_ADD_SUCCESS:
            return { loading: false, status: action.payload }

        case PRODUCT_ADD_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productReviewReducer = (state = { status: {} }, action) => {
    switch (action.type) {
        case PRODUCT_REVIEW_REQUEST:
            return { loading: true }

        case PRODUCT_REVIEW_SUCCESS:
            return { loading: false, status: action.payload }

        case PRODUCT_REVIEW_FAIL:
            return { loading: false, error: action.payload }

        default:
            return { ...state }
    }
}

export const filterReducer = (state = { filter: {} }, action) => {
    switch (action.type) {
        case PRODUCT_APPLY_FILTER:
            return { filter: action.payload }

        default:
            return { ...state }
    }
}
