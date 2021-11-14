import axios from "axios";
import { 
    getBartersSuccessAction, 
    getBartersRequestAction, 
    getBartersFailureAction, 
    loginUseRequest, 
    loginUseSuccess, 
    loginUseFailure, 
    addNewBarterAction, 
    barterRequestAction, 
    barterFailureAction, 
    deleteBarterAction,
    saveBarterAction, 
    deleteCommentAction,
    addNewCommentAction,
    commentRequestAction,
    commentFailureAction
    } from "./actions";

export const getBarters = () => {
    return (dispatch) => {
        dispatch(getBartersRequestAction())
        axios.get('http://localhost:4000/api/barter').then(
            success => {
                // console.log(success);
                dispatch(getBartersSuccessAction(success.data.items));
            },
            error => {
                if (error.response) {
                    console.log('error.response.data', error.response.data);
                    dispatch(getBartersFailureAction());
                } else if (error.request) {
                    console.log('error.request', error.request);
                } else {
                    console.log('error.message', error.message);
                }
            }
        )
    }
}

export const loginUserAsyncAction = (userLoginData) => {
    return (dispatch) => {
        dispatch(loginUseRequest());
        axios.post('http://localhost:4000/login', userLoginData).then(
            success => {
                // console.log(success)
                const userRecievedInfo = success.data;
                dispatch(loginUseSuccess(userRecievedInfo));
                window.localStorage.setItem('token', userRecievedInfo.token);
                
            },
            error => {
                
                if (error.response) {
                    console.log('error.response.data', error.response.data);
                    dispatch(loginUseFailure(error.response.data.message));
                } else if (error.request) {
                    console.log('error.request', error.request);
                } else {
                    console.log('error.message', error.message);
                }
            }
        )
    }
}

export const registerUserAsyncAction = (userRegData) => {
    return (dispatch) => {
        dispatch(loginUseRequest());
        axios.post('http://localhost:4000/register', userRegData).then(
            success => {
                console.log(success)
                dispatch(loginUserAsyncAction(userRegData))
            },
            error => {
                
                if (error.response) {
                    console.log('error.response.data', error.response.data);
                    dispatch(loginUseFailure(error.response.data.message));
                  } else if (error.request) {
                    console.log('error.request', error.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('error.message', error.message);
                  }
            }
        )
    }
}

export const reloginUserAsyncAction = () => {
    return (dispatch) => {
            const userToken = window.localStorage.getItem('token');

            if(userToken){
            dispatch(loginUseRequest());
            axios.get(`http://localhost:4000/auth/checkLogin`,
            {headers:{ "Authorization": `Bearer ${userToken}`}}).then(
                success => {
                    // console.log('checkIfUserLoggedBefore success >> ', success);
                    const userRecievedInfo = success.data;
                    userRecievedInfo.token = userToken;
                    dispatch(loginUseSuccess(userRecievedInfo));
                },
                error => {
                    if (error.response) {
                        console.log('error.response.data', error.response.data);
                        dispatch(loginUseFailure());
                    } else if (error.request) {
                        console.log('error.request', error.request);
                    } else {
                        console.log('error.message', error.message);
                    }
                }
            )
        }
    }
}

export const addBarterAsyncAction = (barterData, userToken) => {
    return (dispatch) => {
        dispatch(barterRequestAction())
        axios.post('http://localhost:4000/api/barter', 
                    {learn: barterData.wantlearn, teach: barterData.canteach, barter: barterData.description}, 
                    {headers:{ "Authorization": `Bearer ${userToken}`}}).then(
            success => {
                // console.log('addNewBarterAction >> ', success);
                dispatch(addNewBarterAction(success.data))
            },
            error => {
                if (error.response) {
                    console.log('error.response.data', error.response.data);
                    dispatch(barterFailureAction(error.response.data.message))
                } else if (error.request) {
                    console.log('error.request', error.request);
                } else {
                    console.log('error.message', error.message);
                }
            }
        )
    }
}

export const deleteBarterAsyncAction = (barterID, userToken) => {
    return (dispatch) => {
        dispatch(barterRequestAction())
        axios.delete(`http://localhost:4000/api/barter/${barterID}`,
        {headers:{ "Authorization": `Bearer ${userToken}`}}).then(
            success => {
                console.log(success)
                dispatch(deleteBarterAction(success.data.id))
            },
            error => {
                if (error.response) {
                    console.log('error.response.data', error.response.data);
                    dispatch(barterFailureAction(error.response.data.message))
                } else if (error.request) {
                    console.log('error.request', error.request);
                } else {
                    console.log('error.message', error.message);
                }
            }
        )
    }
}

export const saveBarterAsyncAction = (barterData, userToken) => {
    return (dispatch) => {
        dispatch(barterRequestAction())
        axios.put(`http://localhost:4000/api/barter/${barterData.id}`,
        {
            "barter": barterData.barter,
            "learn": barterData.learn,
            "teach": barterData.teach
        },{headers:{ "Authorization": `Bearer ${userToken}`}}).then(
            success => {
                console.log(success)
                dispatch(saveBarterAction(success.data))
            },
            error => {
                if (error.response) {
                    console.log('error.response.data', error.response.data);
                    dispatch(barterFailureAction(error.response.data.message))
                } else if (error.request) {
                    console.log('error.request', error.request);
                } else {
                    console.log('error.message', error.message);
                }
            }
        )
    }
}

export const addCommentAsyncAction = (barterID, newComment, userToken) => {
    return (dispatch) => {
        dispatch(commentRequestAction());
        axios.post(`http://localhost:4000/api/comment/barter/${barterID}`,
            {"comment": newComment},
            {headers:{ "Authorization": `Bearer ${userToken}`}}).then(
                success => {
                    console.log('newComment success >> ',success);
                    dispatch(addNewCommentAction(success.data));
                },
                error => {
                    if (error.response) {
                        console.log('error.response.data', error.response.data);
                        dispatch(commentFailureAction(error.response.data.message))
                    } else if (error.request) {
                        console.log('error.request', error.request);
                    } else {
                        console.log('error.message', error.message);
                    }
                }
            )
    }
}

export const deleteCommentAsyncAction = (barterID, singleCommentID, userToken) => {
    return (dispatch) => {
        dispatch(commentRequestAction());
        axios.delete(`http://localhost:4000/api/comment/${singleCommentID}`,
        {headers:{ "Authorization": `Bearer ${userToken}`}}).then(
            success => {
                console.log('deleteCommentAction', success);
                dispatch(deleteCommentAction({commentID: singleCommentID, barterID: barterID}));
            },
            error => {
                if (error.response) {
                    console.log('error.response.data', error.response.data);
                    dispatch(commentFailureAction(error.response.data.message))
                } else if (error.request) {
                    console.log('error.request', error.request);
                } else {
                    console.log('error.message', error.message);
                }
            }
        )
    }
}