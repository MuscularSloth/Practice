import { combineReducers } from "redux";
import { userReducer } from './auth/userReducer'
import { barterReducer } from './barter/barterReducer'

export const rootReducer = combineReducers({
    userReducer,
    barterReducer,
});