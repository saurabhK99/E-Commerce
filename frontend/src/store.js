import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
    productDetailsReducer,
    productListReducer,
} from './reducers/productReducers'

import { cartReducer } from './reducers/cartReducer'

const cartItemFromStorage = localStorage['cartItems']
    ? JSON.parse(localStorage['cartItems'])
    : []

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
})

const initialState = {
    cart: { cartItems: cartItemFromStorage },
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
