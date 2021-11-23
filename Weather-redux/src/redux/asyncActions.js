import axios from "axios";
import {
    failureUserCityAction,
    failureUserCountryAction, failureWeatherCityAction,
    requestUserCityAction,
    requestUserCountryAction, requestWeatherCityAction, successUserCityAction,
    successUserCountryAction, successWeatherCityAction
} from "./actions"


export const getCountriesAsyncAction = () => {
    return (dispatch) => {
        dispatch(requestUserCountryAction())
        axios.get('https://countriesnow.space/api/v0.1/countries/flag/images').then(
            success => {
                // console.log(success.data.data);
                dispatch(successUserCountryAction(success.data.data));
            },
            error => {
                if (error.response) {
                    console.log('error.response.data', error.msg);
                    dispatch(failureUserCountryAction(error.msg));
                } else if (error.request) {
                    console.log('error.request', error.request);
                } else {
                    console.log('error.message', error.message);
                }
            }
        )
    }
}

export const getCitiesAsyncAction = (country) => {
    return (dispatch) => {
        dispatch(requestUserCityAction())
        axios.post('https://countriesnow.space/api/v0.1/countries/cities',{
            "country": country
        }).then(
            success => {
                 console.log(success);
                dispatch(successUserCityAction(success.data.data));
            },
            error => {
                if (error.response) {
                    console.log('error.response.data', error.msg);
                    dispatch(failureUserCityAction(error.msg));
                } else if (error.request) {
                    console.log('error.request', error.request);
                } else {
                    console.log('error.message', error.message);
                }
            }
        )
    }
}

export const getWeatherAsyncAction = (city) => {
    const weatherAPI = '0910584c091954684fef0fb1be731980';
    return (dispatch) => {
        console.log('getWeatherAsyncAction city >> ', city)
        dispatch(requestWeatherCityAction())
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPI}`).then(
            success => {
                console.log(success);
                dispatch(successWeatherCityAction(success));
            },
            error => {
                if (error.response) {
                    console.log('error', error);
                    dispatch(failureWeatherCityAction(error));
                } else if (error.request) {
                    console.log('error.request', error.request);
                } else {
                    console.log('error.message', error.message);
                }
            }
        )
    }
}