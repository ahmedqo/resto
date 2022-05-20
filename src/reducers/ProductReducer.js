import {
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
} from "../constants/ProductConst";

export const ProductsReducer = (state = { products: [] }, { type, payload }) => {
    switch (type) {
        case ALL_PRODUCTS_REQUEST:
            return {
                productLoading: true,
                products: [],
            };
        case ALL_PRODUCTS_SUCCESS:
            return {
                productLoading: false,
                products: payload,
            };
        case ALL_PRODUCTS_FAIL:
            return {
                productLoading: false,
                error: payload,
            };
        default:
            return state;
    }
};

export const ProductReducer = (state = { product: {} }, { type, payload }) => {
    switch (type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                productLoading: true,
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                productLoading: false,
                product: payload,
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                productLoading: false,
                error: payload,
            };
        default:
            return state;
    }
};