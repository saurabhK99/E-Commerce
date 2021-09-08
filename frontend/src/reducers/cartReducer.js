import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const isItemPresent = state.cartItems.find(
                (e) => e.product === item.product
            )

            if (isItemPresent) {
                return {
                    cartItems: state.cartItems.map((e) =>
                        e.product === item.product ? item : e
                    ),
                }
            } else {
                return { cartItems: [...state.cartItems, item] }
            }

        case CART_REMOVE_ITEM:
            const productId = action.id
            const newState = state.cartItems.filter(
                (e) => e.product !== productId
            )
            return { cartItems: newState }

        default:
            return state
    }
}
