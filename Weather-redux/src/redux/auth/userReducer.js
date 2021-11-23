import {
    SET_CITY_USER,
    SET_COUNTRY_USER,
    SET_LOGIN_USER,
    ADD_LOCATION_USER,
    SET_CURRENT_LOCATION, ADD_LOCATION_FROM_STORAGE,

} from "../types";


const initialState= {
    isLogged: false,
    userName: null,
    selectedUserCountry: null,
    selectedUserCity: null,
    currentLocation: null,
    locations:[]

}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN_USER:
            return {
                ...state,
                isLogged: true,
                userName: action.payload,
            }
        case SET_COUNTRY_USER:
            return {
                ...state,
                selectedUserCountry: action.payload,
            }
        case SET_CITY_USER:
            return {
                ...state,
                selectedUserCity: action.payload,
            }
        case ADD_LOCATION_USER:
            return {
                ...state,
                locations: [...state.locations, {userCountry: state.selectedUserCountry, userCity: state.selectedUserCity}],
                selectedUserCountry: null,
                selectedUserCity: null,
            }
        case SET_CURRENT_LOCATION:
            return {
                ...state,
                currentLocation: action.payload,
            }
        case ADD_LOCATION_FROM_STORAGE:
            return {
                ...state,
                locations: action.payload,
            }
        default:
            return state;
    }
}