import axios from "axios";
import {
  STAFF_TYPE_CREATE_FAIL,
  STAFF_TYPE_CREATE_REQUEST,
  STAFF_TYPE_CREATE_SUCCESS,
  STAFF_TYPE_DELETE_FAIL,
  STAFF_TYPE_DELETE_REQUEST,
  STAFF_TYPE_DELETE_SUCCESS,
  STAFF_TYPE_EDIT_FAIL,
  STAFF_TYPE_EDIT_REQUEST,
  STAFF_TYPE_EDIT_SUCCESS,
  STAFF_TYPE_LIST_FAIL,
  STAFF_TYPE_LIST_REQUEST,
  STAFF_TYPE_LIST_SUCCESS,
  STAFF_TYPE_UPDATE_FAIL,
  STAFF_TYPE_UPDATE_REQUEST,
  STAFF_TYPE_UPDATE_SUCCESS,
} from "./../Constants/StaffTypeConstants";
import { logout } from "./UserActions";
import {URL} from "../Url"
//STAFF LIST
export const listStaffType = () => async (dispatch, getState) => {
  try {
    dispatch({ type: STAFF_TYPE_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${URL}/api/stafftypes/`, config);
    dispatch({ type: STAFF_TYPE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: STAFF_TYPE_LIST_FAIL,
      payload: message,
    });
  }
};

//DELETE STAFF
export const deleteStaffType = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: STAFF_TYPE_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`${URL}/api/stafftypes/${id}`, config);
    dispatch({ type: STAFF_TYPE_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: STAFF_TYPE_DELETE_FAIL,
      payload: message,
    });
  }
};

//CREATE STAFF
export const createStaffType = (name) => async (dispatch, getState) => {
  try {
    dispatch({ type: STAFF_TYPE_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `${URL}/api/stafftypes/`,
      { name},
      config
    );
    dispatch({ type: STAFF_TYPE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: STAFF_TYPE_CREATE_FAIL,
      payload: message,
    });
  }
};

export const editStaffType = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: STAFF_TYPE_EDIT_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${URL}/api/stafftypes/${id}`, config);
    dispatch({ type: STAFF_TYPE_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: STAFF_TYPE_EDIT_FAIL,
      payload: message,
    });
  }
};

export const updateStaffType = (staff) => async (dispatch, getState) => {
  try {
    dispatch({ type: STAFF_TYPE_UPDATE_REQUEST });
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
      `${URL}/api/stafftypes/${staff.id}`,
      staff,
      config
    );
    dispatch({ type: STAFF_TYPE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: STAFF_TYPE_UPDATE_FAIL,
      payload: message,
    });
  }
};
