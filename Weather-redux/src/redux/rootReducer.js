import { combineReducers } from "redux";
import { userReducer } from './auth/userReducer'
import { countriesReducer } from './location/countriesReducer'
import { citiesReducer } from './location/citiesReducer'
import { weatherReducer } from './weather/weatherReducer'

export const rootReducer = combineReducers({
    userReducer,
    countriesReducer,
    citiesReducer,
    weatherReducer,
});