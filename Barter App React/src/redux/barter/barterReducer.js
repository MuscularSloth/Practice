import { 
    ADD_NEW_BARTER, 
    DELETE_BARTER, 
    SAVE_BARTER,
    ADD_NEW_COMMENT, 
    DELETE_COMMENT,
    GET_BARTERS_REQUEST,
    GET_BARTERS_SUCCESS,
    GET_BARTERS_FAILURE,
    SINGLE_BARTER_REQUEST,
    SINGLE_BARTER_FAILURE,
    COMMENT_REQUEST,
    COMMENT_FAILURE
 } from "../types";

const initialState= {
    barters: [],
    isLoading: false,
    isError: false,
    errorMessage: null,
}


export const barterReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BARTERS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case GET_BARTERS_SUCCESS:
            return {
                ...state,
                barters: action.payload,
                isLoading: false,
            };
        case GET_BARTERS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };


        case ADD_NEW_BARTER:
            return {
                ...state,
                barters: [action.payload, ...state.barters],
                isLoading: false,
            };
        case SAVE_BARTER:
            return {
                ...state,
                barters:[...state.barters].map(el => el.id === action.payload.id ? {...el, barter: action.payload.barter, learn: action.payload.learn, teach: action.payload.teach} : {...el}),
                isLoading: false,
            }
        case DELETE_BARTER:
            return {...state,
                barters:[...state.barters].filter((el) => el.id !== action.payload),
                isLoading: false,
            };
        case SINGLE_BARTER_REQUEST:
            return {...state,
                isLoading: true,
                isError: false,
                errorMessage: null,
            };   
            
        case SINGLE_BARTER_FAILURE:
            return {...state,
                isLoading: false,
                isError: true,
                errorMessage: action.payload,
            };


        case ADD_NEW_COMMENT:
            let newAfterAddCommentBarters = [...state.barters].map((singleBarter) => {
                    if(singleBarter.id === action.payload.barter.id){
                        let newComments = [action.payload,...singleBarter.comments]
                        return {...singleBarter, comments: newComments}
                    }else return singleBarter 
                })

            return {
                ...state,
                barters: newAfterAddCommentBarters,
                isLoading: false,
            }
        case DELETE_COMMENT:
            let newAfterDeleteCommentBarters = [...state.barters].map((singleBarter) => {
                    if(singleBarter.id === action.payload.barterID){
                        let newComments = singleBarter.comments.filter(comment => comment.id !== action.payload.commentID)
                        return {...singleBarter, comments: newComments}
                    }
                    else return singleBarter
                })

            return {...state,
                barters: newAfterDeleteCommentBarters,
                isLoading: false,
            }
        case COMMENT_REQUEST:
            return {...state,
                isLoading: true,
                isError: false,
                errorMessage: null,
            };   
            
        case COMMENT_FAILURE:
            return {...state,
                isLoading: false,
                isError: true,
                errorMessage: action.payload,
            };    
        default:
            return state;
    }
}