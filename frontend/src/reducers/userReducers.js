import {
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_PROFILE_FAIL,
    USER_PROFILE_LOGOUT,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_UPDATE_FAIL,
    USER_PROFILE_UPDATE_REQUEST,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_REGISTRATION_FAIL,
    USER_REGISTRATION_REQUEST,
    USER_REGISTRATION_SUCCESS,
    USER_REMOVE_FAIL,
    USER_REMOVE_REQUEST,
    USER_REMOVE_SUCCESS,
} from '../constants/userConstants'

export const userRgistrationReducer = (state = { status: {} }, action) => {
    switch (action.type) {
        case USER_REGISTRATION_REQUEST:
            return { ...state }

        case USER_REGISTRATION_SUCCESS:
            return { status: action.payload }

        case USER_REGISTRATION_FAIL:
            return { error: action.payload }

        default:
            return { ...state }
    }
}

export const userLoginReducer = (state = { userInfo: {} }, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true, ...state }

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return { userInfo: null }

        default:
            return { ...state }
    }
}

export const userProfileReducer = (state = { profile: null }, action) => {
    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return { loading: true }

        case USER_PROFILE_SUCCESS:
            return { loading: false, profile: action.payload }

        case USER_PROFILE_FAIL:
            return { loading: false, error: action.payload }

        case USER_PROFILE_LOGOUT:
            return { profile: null }

        default:
            return { ...state }
    }
}

export const userProfileUpdateReducer = (state = { status: null }, action) => {
    switch (action.type) {
        case USER_PROFILE_UPDATE_REQUEST:
            return { loading: true }

        case USER_PROFILE_UPDATE_SUCCESS:
            return { loading: false, status: action.payload }

        case USER_PROFILE_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return { ...state }
    }
}

export const usersGetListReducer = (state = { usersList: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true }

        case USER_LIST_SUCCESS:
            return { loading: false, usersList: action.payload }

        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return { ...state }
    }
}

export const userRemoveReducer = (state = { status: {} }, action) => {
    switch (action.type) {
        case USER_REMOVE_REQUEST:
            return { loading: true }

        case USER_REMOVE_SUCCESS:
            return { loading: false, status: action.payload }

        case USER_REMOVE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return { ...state }
    }
}
