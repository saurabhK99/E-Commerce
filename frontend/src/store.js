import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
    filterReducer,
    productAddReducer,
    productDetailsReducer,
    productListReducer,
    productRemoveReducer,
    productReviewReducer,
    productsGetListReducer,
} from './reducers/productReducers'

import { cartReducer } from './reducers/cartReducer'
import {
    userLoginReducer,
    userProfileReducer,
    userProfileUpdateReducer,
    userRemoveReducer,
    userRgistrationReducer,
    usersGetListReducer,
} from './reducers/userReducers'
import {
    orderCreateReducer,
    orderGetReducer,
    orderGetAllReducer,
    orderPayReducer,
    orderAdminGetAllReducer,
    orderDeliverReducer,
} from './reducers/orderReducers'

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
    orderCreateStatus: orderCreateReducer,
    orderPayStatus: orderPayReducer,
    order: orderGetReducer,
    orders: orderGetAllReducer,
    productsGetList: productsGetListReducer,
    usersGetList: usersGetListReducer,
    userRemoveStatus: userRemoveReducer,
    productRemoveStatus: productRemoveReducer,
    productAddStatus: productAddReducer,
    orderAdmin: orderAdminGetAllReducer,
    productReviewStatus: productReviewReducer,
    orderDeliverStatus: orderDeliverReducer,
    filter: filterReducer,
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
