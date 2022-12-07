/* eslint-disable default-case */
import {
  STAFF_UPDATE_FAIL,
  STAFF_UPDATE_RESET,
  STAFF_UPDATE_SUCCESS,
} from "../Constants/StaffConstants";
import {
  STAFF_CREATE_FAIL,
  STAFF_CREATE_REQUEST,
  STAFF_CREATE_RESET,
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
  STAFF_UPDATE_REQUEST,
} from "../Constants/StaffConstants";

export const staffListReducer = (state = { staffs: [] }, action) => {
  switch (action.type) {
    case STAFF_LIST_REQUEST:
      return { loading: true, staffs: [] };

    case STAFF_LIST_SUCCESS:
      return { loading: false, staffs: action.payload };
    case STAFF_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const staffDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case STAFF_DELETE_REQUEST:
      return { loading: true };

    case STAFF_DELETE_SUCCESS:
      return { loading: false, success: true };
    case STAFF_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const staffCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STAFF_CREATE_REQUEST:
      return { loading: true };

    case STAFF_CREATE_SUCCESS:
      return { loading: false, success: true, staff: action.payload };
    case STAFF_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case STAFF_CREATE_RESET:
      return { success: false };
    default:
      return state;
  }
};

export const staffEditReducer = (state = { staff: {} }, action) => {
  switch (action.type) {
    case STAFF_EDIT_REQUEST:
      return { ...state, loading: true };
    case STAFF_EDIT_SUCCESS:
      return { loading: false, staff: action.payload };
    case STAFF_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const staffUpdateReducer = (state = { staff: {} }, action) => {
  switch (action.type) {
    case STAFF_UPDATE_REQUEST:
      return { loading: true };
    case STAFF_UPDATE_SUCCESS:
      return { loading: false, success: true, staff: action.payload };
    case STAFF_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case STAFF_UPDATE_RESET:
      return { staff: {} };
    default:
      return state;
  }
};
