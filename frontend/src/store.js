import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
    productDetailsReducer,
    productListReducer,
} from './reducers/productReducers'

import { cartReducer } from './reducers/cartReducer'
import {
    userLoginReducer,
    userProfileReducer,
    userProfileUpdateReducer,
    userRgistrationReducer,
} from './reducers/userReducers'

const cartItemFromStorage = localStorage['cartItems']
    ? JSON.parse(localStorage['cartItems'])
    : []

const userInfoFromStorage = localStorage['userInfo']
    ? JSON.parse(localStorage['userInfo'])
    : null

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userProfile: userProfileReducer,
    userUpdateStatus: userProfileUpdateReducer,
    userRegisterStatus: userRgistrationReducer,
})

const initialState = {
    cart: { cartItems: cartItemFromStorage },
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
