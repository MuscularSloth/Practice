import {
    SET_LOGIN_USER,
    SET_COUNTRY_USER,
    SET_CITY_USER,
    GET_COUNTRIES_REQUEST,
    GET_COUNTRIES_SUCCESS,
    GET_COUNTRIES_FAILURE,
    GET_CITIES_REQUEST,
    GET_CITIES_SUCCESS,
    GET_CITIES_FAILURE,
    ADD_LOCATION_USER,
    SET_CURRENT_LOCATION,
    ADD_LOCATION_FROM_STORAGE, GET_WEATHER_REQUEST, GET_WEATHER_SUCCESS, GET_WEATHER_FAILURE,

} from "../redux/types";

export function setUserNameAction(username) {
    return{
        type: SET_LOGIN_USER,
        payload: username
    }
}

export function setUserCountryAction(usercountry) {
    return{
        type: SET_COUNTRY_USER,
        payload: usercountry
    }
}

export function setUserCityAction(usercity) {
    return{
        type: SET_CITY_USER,
        payload: usercity
    }
}

export function successUserCountryAction(usercountry) {
    return{
        type: GET_COUNTRIES_SUCCESS,
        payload: usercountry,
    }
}

export function successUserCityAction(usercity) {
    return{
        type: GET_CITIES_SUCCESS,
        payload: usercity,
    }
}

export function requestUserCountryAction() {
    return{
        type: GET_COUNTRIES_REQUEST,
    }
}

export function requestUserCityAction() {
    return{
        type: GET_CITIES_REQUEST,
    }
}

export function failureUserCountryAction(error) {
    return{
        type: GET_COUNTRIES_FAILURE,
        payload: error,
    }
}

export function failureUserCityAction(error) {
    return{
        type: GET_CITIES_FAILURE,
        payload: error,
    }
}

export function addLocationAction() {
    return{
        type: ADD_LOCATION_USER,
    }
}

export function addLocationFormStorageAction(locations) {
    return{
        type: ADD_LOCATION_FROM_STORAGE,
        payload: locations,
    }
}

export function setCurrentLocationAction(locationID) {
    return{
        type: SET_CURRENT_LOCATION,
        payload: locationID,
    }
}

export function requestWeatherCityAction() {
    return{
        type: GET_WEATHER_REQUEST,
    }
}

export function successWeatherCityAction(locationID) {
    return{
        type: GET_WEATHER_SUCCESS,
        payload: locationID,
    }
}

export function failureWeatherCityAction(locationID) {
    return{
        type: GET_WEATHER_FAILURE,
        payload: locationID,
    }
}


