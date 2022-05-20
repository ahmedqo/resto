import {
    ALL_CUISINES_FAIL,
    ALL_CUISINES_REQUEST,
    ALL_CUISINES_SUCCESS,
    CUISINE_DETAILS_REQUEST,
    CUISINE_DETAILS_SUCCESS,
    CUISINE_DETAILS_FAIL,
    NEW_CUISINE_REQUEST,
    NEW_CUISINE_SUCCESS,
    NEW_CUISINE_FAIL,
    UPDATE_CUISINE_REQUEST,
    UPDATE_CUISINE_SUCCESS,
    UPDATE_CUISINE_RESET,
    UPDATE_CUISINE_FAIL,
    DELETE_CUISINE_REQUEST,
    DELETE_CUISINE_SUCCESS,
    DELETE_CUISINE_RESET,
    DELETE_CUISINE_FAIL,
} from "../constants/CuisineConst";

export const CuisinesReducer = (state = { cuisines: [] }, { type, payload }) => {
    switch (type) {
        case ALL_CUISINES_REQUEST:
            return {
                cuisineLoading: true,
                cuisines: [],
            };
        case ALL_CUISINES_SUCCESS:
            return {
                cuisineLoading: false,
                cuisines: payload,
            };
        case ALL_CUISINES_FAIL:
            return {
                cuisineLoading: false,
                error: payload,
            };
        default:
            return state;
    }
};

export const CuisineReducer = (state = { cuisine: {} }, { type, payload }) => {
    switch (type) {
        case CUISINE_DETAILS_REQUEST:
            return {
                ...state,
                cuisineLoading: true,
            };
        case CUISINE_DETAILS_SUCCESS:
            return {
                cuisineLoading: false,
                cuisine: payload,
            };
        case CUISINE_DETAILS_FAIL:
            return {
                cuisineLoading: false,
                error: payload,
            };
        default:
            return state;
    }
};

export const CreateCuisineReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case NEW_CUISINE_REQUEST:
            return {
                ...state,
                cuisineLoading: true,
            };
        case NEW_CUISINE_SUCCESS:
            return {
                cuisineLoading: false,
                cuisine: payload,
            };
        case NEW_CUISINE_FAIL:
            return {
                cuisineLoading: false,
                error: payload,
            };
        default:
            return state;
    }
};

export const UpdateCuisineReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case UPDATE_CUISINE_REQUEST:
            return {
                ...state,
                cuisineLoading: true,
            };
        case UPDATE_CUISINE_SUCCESS:
            return {
                ...state,
                cuisineLoading: false,
                isUpdated: payload,
            };
        case UPDATE_CUISINE_FAIL:
            return {
                ...state,
                cuisineLoading: false,
                error: payload,
            };
        case UPDATE_CUISINE_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        default:
            return state;
    }
};

export const DeleteCuisineReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case DELETE_CUISINE_REQUEST:
            return {
                ...state,
                cuisineLoading: true,
            };
        case DELETE_CUISINE_SUCCESS:
            return {
                ...state,
                cuisineLoading: false,
                isDeleted: payload,
            };
        case DELETE_CUISINE_FAIL:
            return {
                ...state,
                cuisineLoading: false,
                error: payload,
            };
        case DELETE_CUISINE_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        default:
            return state;
    }
};