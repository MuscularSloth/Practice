import {
    GET_COUNTRIES_SUCCESS,
    GET_COUNTRIES_REQUEST,
    GET_COUNTRIES_FAILURE,
} from "../types";


const initialState= {
    countries: [],
    isLoading: false,
    isError: null,
    errorMessage: null,
}

export const countriesReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_COUNTRIES_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case GET_COUNTRIES_SUCCESS:
            return {
                ...state,
                countries: [...action.payload],
                isLoading: false,
                isError: false,
                errorMessage: null,
                isLoaded: true,
            };
        case GET_COUNTRIES_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.payload,
            };


        default:
            return state;
    }
}