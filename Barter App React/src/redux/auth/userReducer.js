import { GET_LOGIN_REQUEST, GET_LOGIN_SUCCESS, GET_LOGIN_FAILURE, LOGOUT } from "../types";


const initialState= {
        isLoading: false,
        isError: false,
        errorMessage: null,
        isLogged: false,
        userID: null,
        userName: null,
        userCreated: null,
        userToken: null,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_LOGIN_SUCCESS:
            return {
                ...state, 
                isError: false,
                errorMessage: null,
                isLoading: false,
                isLogged: true,
                userID: action.payload.id,
                userName: action.payload.username,
                userCreated: action.payload.created,
                userToken: action.payload.token,
            } 
        case GET_LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                isLogged: false,
                isError: true,
                errorMessage: action.payload
            }   
        case LOGOUT:
            return {
                ...state, 
                isLogged: false,
                userID: null,
                userName: null,
                userCreated: null,
                userToken: null,
            };          
        default:
            return state;
    }
}