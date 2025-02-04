import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    DELETE_ORDERS_REQUEST,
    DELETE_ORDERS_SUCCESS,
    DELETE_ORDERS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDERS_REQUEST,
    UPDATE_ORDERS_SUCCESS,
    UPDATE_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS
} from "../constants/orderConstants";
import axios from "axios";

//create Order
export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch(
            {
                type: CREATE_ORDER_REQUEST
            }
        );
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post("/api/order/newOrder",order,config);
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

//My Orders
export const myOrders = () => async (dispatch) => {
    try {
        dispatch(
            {
                type: MY_ORDERS_REQUEST
            }
        );
        
        const { data } = await axios.get("/api/order/me");
        dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders});
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

//Get all Orders (admin)
export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch(
            {
                type: ALL_ORDERS_REQUEST
            }
        );
        
        const { data } = await axios.get("/api/order/admin/orders");
        dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders});
    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

//Update Order
export const updateOrder = (id,order) => async (dispatch) => {
    try {
        dispatch(
            {
                type: UPDATE_ORDERS_REQUEST
            }
        );
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(`/api/order/admin/${id}`,order,config);
        dispatch({ type: UPDATE_ORDERS_SUCCESS, payload: data.success});
    } catch (error) {
        dispatch({
            type: UPDATE_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

//Delete Order
export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch(
            {
                type: DELETE_ORDERS_REQUEST
            }
        );
        const { data } = await axios.delete(`/api/order/admin/${id}`);
        dispatch({ type: DELETE_ORDERS_SUCCESS, payload: data.success});
    } catch (error) {
        dispatch({
            type: DELETE_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

//Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch(
            {
                type: ORDER_DETAILS_REQUEST
            }
        );
        
        const { data } = await axios.get(`/api/order/${id}`);
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order});
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

//clearing errors
export const clearErrors = () => async (dispatch) =>{
    dispatch({type: CLEAR_ERRORS });
}