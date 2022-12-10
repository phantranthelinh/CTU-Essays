import { applyMiddleware, combineReducers, createStore } from "redux"

import thunk from "redux-thunk"

import { composeWithDevTools } from "redux-devtools-extension"
import { cartReducer } from "./Reducers/CartReducers"
import { orderCancelReducer, orderCreateReducer, orderDetailsReducer, orderListMyReducer } from "./Reducers/OrderReducers"
import {
  productCreateReviewReducer,
  productDetailsReducer,
  productListReducer,
  productReviewsReducer
} from "./Reducers/ProductReducers"
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer
} from "./Reducers/UserReducers"

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productReviews: productReviewsReducer,
  createReview: productCreateReviewReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderCancel: orderCancelReducer,
  orderListMy: orderListMyReducer,

})

const cartItemFromLocalStorage = localStorage.getItem("cartItem")
  ? JSON.parse(localStorage.getItem("cartItem"))
  : []

//LOGIN
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null
//SHIPPING ADDRESS
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {}
const initialState = {
  cart: {
    cartItems: cartItemFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
  },
  userLogin: {
    userInfo: userInfoFromLocalStorage,
  },
}
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
