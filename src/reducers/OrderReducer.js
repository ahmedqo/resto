import {
    NEW_ORDER_REQUEST,
    NEW_ORDER_SUCCESS,
    NEW_ORDER_FAIL,
    MY_ORDERS_FAIL,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_REQUEST,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    DELETE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    DELETE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_FAIL,
    UPDATE_ORDER_RESET,
    DELETE_ORDER_RESET,
} from "../constants/OrderConst";

export const MyOrdersReducer = (state = { orders: [] }, { type, payload }) => {
    switch (type) {
        case MY_ORDERS_REQUEST:
            return {
                orderLoading: true,
            };
        case MY_ORDERS_SUCCESS:
            return {
                orderLoading: false,
                orders: payload,
            };
        case MY_ORDERS_FAIL:
            return {
                orderLoading: false,
                error: payload,
            };
        default:
            return state;
    }
};

export const OrdersReducer = (state = { orders: [] }, { type, payload }) => {
    switch (type) {
        case ALL_ORDERS_REQUEST:
            return {
                orderLoading: true,
            };
        case ALL_ORDERS_SUCCESS:
            return {
                orderLoading: false,
                orders: payload,
            };
        case ALL_ORDERS_FAIL:
            return {
                orderLoading: false,
                error: payload,
            };
        default:
            return state;
    }
};

export const OrderReducer = (state = { order: {} }, { type, payload }) => {
    switch (type) {
        case ORDER_DETAILS_REQUEST:
            return {
                orderLoading: true,
            };
        case ORDER_DETAILS_SUCCESS:
            return {
                orderLoading: false,
                order: payload,
            };
        case ORDER_DETAILS_FAIL:
            return {
                orderLoading: false,
                error: payload,
            };
        default:
            return state;
    }
};

export const CreateOrderReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case NEW_ORDER_REQUEST:
            return {
                ...state,
                orderLoading: true,
            };
        case NEW_ORDER_SUCCESS:
            return {
                orderLoading: false,
                order: payload,
            };
        case NEW_ORDER_FAIL:
            return {
                orderLoading: false,
                error: payload,
            };
        default:
            return state;
    }
};

export const UpdateOrderReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case UPDATE_ORDER_REQUEST:
            return {
                ...state,
                orderLoading: true,
            };
        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                orderLoading: false,
                isUpdated: payload,
            };
        case UPDATE_ORDER_FAIL:
            return {
                ...state,
                orderLoading: false,
                error: payload,
            };
        case UPDATE_ORDER_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        default:
            return state;
    }
};

export const DeleteOrderReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case DELETE_ORDER_REQUEST:
            return {
                ...state,
                orderLoading: true,
            };
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                orderLoading: false,
                isDeleted: payload,
            };
        case DELETE_ORDER_FAIL:
            return {
                ...state,
                orderLoading: false,
                error: payload,
            };
        case DELETE_ORDER_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        default:
            return state;
    }
};