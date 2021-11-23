import {
    GET_CITIES_SUCCESS,
    GET_CITIES_REQUEST,
    GET_CITIES_FAILURE,
} from "../types";


const initialState= {
    cities: [],
    isLoading: false,
    isError: null,
    errorMessage: null,
}

export const citiesReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_CITIES_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case GET_CITIES_SUCCESS:
            return {
                ...state,
                cities: action.payload,
                isLoading: false,
                isError: false,
                errorMessage: null,
            };
        case GET_CITIES_FAILURE:
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