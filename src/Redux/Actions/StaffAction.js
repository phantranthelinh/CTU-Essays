import axios from "axios";
import {
  STAFF_CREATE_FAIL,
  STAFF_CREATE_REQUEST,
  STAFF_CREATE_SUCCESS,
  STAFF_DELETE_FAIL,
  STAFF_DELETE_REQUEST,
  STAFF_DELETE_SUCCESS,
  STAFF_EDIT_FAIL,
  STAFF_EDIT_REQUEST,
  STAFF_EDIT_SUCCESS,
  STAFF_LIST_FAIL,
  STAFF_LIST_REQUEST,
  STAFF_LIST_SUCCESS,
  STAFF_UPDATE_FAIL,
  STAFF_UPDATE_REQUEST,
  STAFF_UPDATE_SUCCESS,
} from "./../Constants/StaffConstants";
import { logout } from "./UserActions";

//STAFF LIST
export const listStaff = () => async (dispatch, getState) => {
  try {
    dispatch({ type: STAFF_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/staffs/`, config);
    dispatch({ type: STAFF_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: STAFF_LIST_FAIL,
      payload: message,
    });
  }
};

//DELETE STAFF
export const deleteStaff = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: STAFF_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/staffs/${id}`, config);
    dispatch({ type: STAFF_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: STAFF_DELETE_FAIL,
      payload: message,
    });
  }
};

//CREATE STAFF
export const createStaff =
  (name, email, password, staffType) => async (dispatch, getState) => {
    try {
      dispatch({ type: STAFF_CREATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/staffs/`,
        { name, email, password, staffType },
        config
      );
      dispatch({ type: STAFF_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: STAFF_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const editStaff = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: STAFF_EDIT_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/staffs/${id}`, config);
    dispatch({ type: STAFF_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: STAFF_EDIT_FAIL,
      payload: message,
    });
  }
};

export const updateStaff = (staff) => async (dispatch, getState) => {
  try {
    dispatch({ type: STAFF_UPDATE_REQUEST });
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
      `/api/staffs/${staff.id}`,
      staff,
      config
    );
    dispatch({ type: STAFF_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: STAFF_UPDATE_FAIL,
      payload: message,
    });
  }
};
