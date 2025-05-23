import axios from "axios";

import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

// Get All Products
export const getProduct = (keyword="",currentPage=1,price=[0,250000],category,ratings=0) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    // let link=`https://backend-9-ngeu.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}`;
    let link = `https://backend-9-ngeu.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
    if (category) {
      link = `https://backend-9-ngeu.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
    }

   const { data } = await axios.get(link, { withCredentials: true });

    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

   const { data } = await axios.get("https://backend-9-ngeu.onrender.com/api/v1/admin/products", {
  withCredentials: true,
});


    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};


    const { data } = await axios.post(
      `https://backend-9-ngeu.onrender.com/api/v1/admin/products/new`,
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};


    const { data } = await axios.put(
      `https://backend-9-ngeu.onrender.com/api/v1/admin/products/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// // Delete Product
// import axios from 'axios';
// import {
//   DELETE_PRODUCT_REQUEST,
//   DELETE_PRODUCT_SUCCESS,
//   DELETE_PRODUCT_FAIL,
// } from '../constants/productConstants';

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

   const { data } = await axios.delete(
  `https://backend-9-ngeu.onrender.com/api/v1/admin/products/${id}`,
  { withCredentials: true }
);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    console.error("Error deleting product:", error); // Basic error logging

    // Enhanced error handling
    let errorMessage = "An error occurred";
    if (error.response) {
      console.error("Server responded with:", error.response);
      errorMessage = error.response.data.message || errorMessage;
    } else if (error.request) {
      console.error("No response received:", error.request);
      errorMessage = "No response received from the server";
    } else {
      console.error("Error setting up request:", error.message);
      errorMessage = error.message;
    }

    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: errorMessage,
    });
  }
};


// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(
  `https://backend-9-ngeu.onrender.com/api/v1/products/${id}`,
  { withCredentials: true }
);


    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};


    const { data } = await axios.put(`https://backend-9-ngeu.onrender.com/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

   const { data } = await axios.get(
  `https://backend-9-ngeu.onrender.com/api/v1/reviews?id=${id}`,
  { withCredentials: true }
);


    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

   const { data } = await axios.delete(
  `https://backend-9-ngeu.onrender.com/api/v1/reviews?id=${reviewId}&productId=${productId}`,
  { withCredentials: true }
);


    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
