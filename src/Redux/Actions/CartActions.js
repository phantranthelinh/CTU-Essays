import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../Constants/CartConstants";
import {
  USER_LOGIN_SUCCESS,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../Constants/UserContstants";
import {URL} from "../Url"
//ADD TO CART

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`${URL}/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.salePrice,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
//REMOVE FROM CART

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//SAVE SHIPPING ADDRESS

export const saveShippingAddress =
  ({ address }) =>
  async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Context-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `${URL}/api/customers/${userInfo._id}`,
      { address },
      config
    );
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: address });
  };
//SAVE PAYMENT METHOD

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
