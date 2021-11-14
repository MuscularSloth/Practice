import { 
    LOGOUT, 
    ADD_NEW_BARTER, 
    SAVE_BARTER, 
    DELETE_BARTER, 
    ADD_NEW_COMMENT,
    DELETE_COMMENT,
    GET_BARTERS_REQUEST,
    GET_BARTERS_SUCCESS,
    GET_BARTERS_FAILURE,
    GET_LOGIN_REQUEST,
    GET_LOGIN_SUCCESS,
    GET_LOGIN_FAILURE,
    SINGLE_BARTER_REQUEST,
    SINGLE_BARTER_FAILURE,
    COMMENT_FAILURE,
    COMMENT_REQUEST
} from './types.js';

export function loginUseRequest(){
    return {
        type: GET_LOGIN_REQUEST,
    }
}

export function loginUseSuccess(userData){
    return {
        type: GET_LOGIN_SUCCESS,
        payload: userData
    }
}

export function loginUseFailure(errorMessage){
    return {
        type: GET_LOGIN_FAILURE,
        payload: errorMessage,
    }
}

export function logoutUser(){
    return {
        type: LOGOUT
    }
}

export function getBartersRequestAction(){
    return {
        type: GET_BARTERS_REQUEST,
    }
}

export function getBartersSuccessAction(bartersData){
    return {
        type: GET_BARTERS_SUCCESS,
        payload: bartersData
    }
}

export function getBartersFailureAction(bartersData){
    return {
        type: GET_BARTERS_FAILURE,
    }
}

export function addNewBarterAction(newBarterData){
    return {
        type: ADD_NEW_BARTER,
        payload: newBarterData
    }
}

export function saveBarterAction(bartersData){
    return {
        type: SAVE_BARTER,
        payload: bartersData
    }
}

export function deleteBarterAction(bartersID){
    return {
        type: DELETE_BARTER,
        payload: bartersID
    }
}

export function barterRequestAction(){
    return {
        type: SINGLE_BARTER_REQUEST,
    }
}

export function barterFailureAction(errorMessage){
    return {
        type: SINGLE_BARTER_FAILURE,
        payload: errorMessage,
    }
}


export function addNewCommentAction(newBarterData){
    return {
        type: ADD_NEW_COMMENT,
        payload: newBarterData
    }
}


export function deleteCommentAction(bartersID){
    return {
        type: DELETE_COMMENT,
        payload: bartersID
    }
}

export function commentRequestAction(){
    return {
        type: COMMENT_REQUEST,
    }
}

export function commentFailureAction(errorMessage){
    return {
        type: COMMENT_FAILURE,
        payload: errorMessage,
    }
}