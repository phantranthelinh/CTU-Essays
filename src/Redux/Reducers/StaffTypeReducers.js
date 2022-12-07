/* eslint-disable default-case */
import { STAFF_TYPE_UPDATE_FAIL, STAFF_TYPE_UPDATE_RESET, STAFF_TYPE_UPDATE_SUCCESS } from "./../Constants/StaffTypeConstants";
import {

  STAFF_TYPE_CREATE_FAIL,
  STAFF_TYPE_CREATE_REQUEST,
  STAFF_TYPE_CREATE_RESET,
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
  STAFF_TYPE_UPDATE_REQUEST,
} from "./../Constants/StaffTypeConstants";

export const staffTypeListReducer = (state = { staffTypes: [] }, action) => {
  switch (action.type) {
    case STAFF_TYPE_LIST_REQUEST:
      return { loading: true, staffTypes: [] };

    case STAFF_TYPE_LIST_SUCCESS:
      return { loading: false, staffTypes: action.payload };
    case STAFF_TYPE_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const staffTypeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case STAFF_TYPE_DELETE_REQUEST:
      return { loading: true };

    case STAFF_TYPE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case STAFF_TYPE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const staffTypeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STAFF_TYPE_CREATE_REQUEST:
      return { loading: true };

    case STAFF_TYPE_CREATE_SUCCESS:
      return { loading: false, success: true, staffTypes: action.payload };
    case STAFF_TYPE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case STAFF_TYPE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const staffTypeEditReducer = (state = {staffType: {}}, action) => {
  switch (action.type) {
    case STAFF_TYPE_EDIT_REQUEST:
      return {...state,  loading: true };
    case STAFF_TYPE_EDIT_SUCCESS:
      return { loading: false,  staffType: action.payload };
    case STAFF_TYPE_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const staffTypeUpdateReducer = (state = {staffType:{}}, action) => {
  switch (action.type) {
    case STAFF_TYPE_UPDATE_REQUEST:
      return { loading: true };
    case STAFF_TYPE_UPDATE_SUCCESS:
      return { loading: false, success: true , staffType : action.payload };;
    case STAFF_TYPE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
      case STAFF_TYPE_UPDATE_RESET:
        return { staffType:{} };
    default:
      return state;
  }
};