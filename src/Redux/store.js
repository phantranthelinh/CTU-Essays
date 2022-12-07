import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import { userListReducer, userLoginReducer } from "./Reducers/UserReducers";
import {
  productDeleteReducer,
  productListReducer,
  productCreateReducer,
  productEditReducer,
  productUpdateReducer,
} from "./Reducers/ProductReducers";
import {
  orderDeliveredReducer,
  orderDetailsReducer,
  orderListReducer,
} from "./Reducers/OrderReducers";
import {
  staffTypeCreateReducer,
  staffTypeDeleteReducer,
  staffTypeEditReducer,
  staffTypeListReducer,
  staffTypeUpdateReducer,
} from "./Reducers/StaffTypeReducers";
import {
  staffDeleteReducer,
  staffListReducer,
  staffCreateReducer,
  staffEditReducer,
  staffUpdateReducer,
} from "./Reducers/StaffReducers";

const reducer = combineReducers({
  //USESR REDUCERS
  userLogin: userLoginReducer,
  userList: userListReducer,

  //PRODUCT  REDUCERS
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productUpdate: productUpdateReducer,

  //STAFF TYPE REDUCERS
  staffTypeList: staffTypeListReducer,
  staffTypeDelete: staffTypeDeleteReducer,
  staffTypeCreate: staffTypeCreateReducer,
  staffTypeEdit: staffTypeEditReducer,
  staffTypeUpdate: staffTypeUpdateReducer,

  //STAFF REDUCERS
  staffList: staffListReducer,
  staffDelete: staffDeleteReducer,
  staffCreate: staffCreateReducer,
  staffEdit: staffEditReducer,
  staffUpdate: staffUpdateReducer,

  //ORDER REDUCERS
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  orderDelivered: orderDeliveredReducer,
});

//LOGIN
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const middleware = [thunk];

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
