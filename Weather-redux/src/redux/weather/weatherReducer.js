import {
    GET_WEATHER_SUCCESS,
    GET_WEATHER_REQUEST,
    GET_WEATHER_FAILURE,
} from "../types";


const initialState= {
    weather: [],
    isLoading: false,
    isError: null,
    errorMessage: null,
}

export const weatherReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_WEATHER_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case GET_WEATHER_SUCCESS:
            return {
                ...state,
                weather: action.payload,
                isLoading: false,
                isError: false,
                errorMessage: null,
            };
        case GET_WEATHER_FAILURE:
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