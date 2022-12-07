import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_LIST_REVIEW_REQUEST,
  PRODUCT_LIST_REVIEW_SUCCESS,
  PRODUCT_LIST_REVIEW_FAIL,
  PRODUCT_LIST_REVIEW_RESET,
  PRODUCT_DELETE_REVIEW_REQUEST,
  PRODUCT_DELETE_REVIEW_SUCCESS,
  PRODUCT_DELETE_REVIEW_FAIL,
} from "../Constants/ProductConstants";

//PRODUCT LIST

export const productListReducer = (state = { products: [] }, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        pages: action.payload.pages,
        page: action.payload.page,
        products: action.payload.products,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//SINGLE PRODUCT

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//CREATE REVIEW
export const productCreateReviewReducer = (state = {}, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

//LIST REVIEW REDUCER
export const productReviewsReducer = (state = { reviews: []}, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case PRODUCT_LIST_REVIEW_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_LIST_REVIEW_SUCCESS:
      return { loading: false, success: true , reviews: action.payload };
    case PRODUCT_LIST_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_LIST_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
//DELETE REVIEW
export const deleteReviewsReducer = (state = {}, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case PRODUCT_DELETE_REVIEW_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DELETE_REVIEW_SUCCESS:
      return { loading: false, success: true , message: action.payload };
    case PRODUCT_DELETE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
  
    default:
      return state;
  }
};

