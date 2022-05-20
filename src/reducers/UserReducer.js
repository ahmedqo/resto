import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,
    FORGOT_PASSWORD_REQUEST,
    RESET_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_RESET,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,
    REMOVE_USER_DETAILS,
} from "../constants/UserConst";

export const UsersReducer = (state = { users: [] }, { type, payload }) => {
    switch (type) {
        case ALL_USERS_REQUEST:
            return {
                ...state,
                userLoading: true,
            };
        case ALL_USERS_SUCCESS:
            return {
                ...state,
                userLoading: false,
                users: payload,
            };
        case ALL_USERS_FAIL:
            return {
                ...state,
                userLoading: false,
                error: payload,
            };
        default:
            return state;
    }
};

export const UserReducer = (state = { user: {} }, { type, payload }) => {
    switch (type) {
        case LOGIN_USER_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                userLoading: true,
                isAuthenticated: false,
            };
        case LOGIN_USER_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                userLoading: false,
                isAuthenticated: true,
                user: payload,
            };
        case LOGOUT_USER_SUCCESS:
            return {
                userLoading: false,
                user: null,
                isAuthenticated: false,
            };
        case LOGIN_USER_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                userLoading: false,
                isAuthenticated: false,
                user: null,
                error: payload,
            };
        case LOAD_USER_FAIL:
            return {
                userLoading: false,
                isAuthenticated: false,
                user: null,
                error: payload,
            };
        case LOGOUT_USER_FAIL:
            return {
                ...state,
                userLoading: false,
                error: payload,
            };
        default:
            return state;
    }
};

export const UserDetailsReducer = (state = { user: {} }, { type, payload }) => {
    switch (type) {
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                userLoading: true,
            };
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                userLoading: false,
                user: payload,
            };
        case USER_DETAILS_FAIL:
            return {
                ...state,
                userLoading: false,
                error: payload,
            };
        case REMOVE_USER_DETAILS:
            return {
                ...state,
                user: {},
            };
        default:
            return state;
    }
};

export const ProfileReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                userLoading: true,
            };
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                userLoading: false,
                isUpdated: payload,
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                userLoading: false,
                isDeleted: payload,
            };
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
                userLoading: false,
                error: payload,
            };
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
        case UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        default:
            return state;
    }
};

export const ForgotReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                userLoading: true,
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                userLoading: false,
                message: payload,
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                userLoading: false,
                success: payload,
            };
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                userLoading: false,
                error: payload,
            };
        default:
            return state;
    }
};