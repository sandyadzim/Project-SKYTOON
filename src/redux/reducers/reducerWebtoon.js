import * as types from '../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    webtoon : [],
    webtoonUser: [],
    title: [],
    favorite:[]
}

export default function reduceWebtoon(state = initialState, action){
    switch (action.type){

        //GET WEBTOON
        case `${types.GET_WEBTOON}_PENDING`:
        return {
            ...state,
            isLoading:true
        }
        case `${types.GET_WEBTOON}_FULFILLED`:
        return {
            ...state,
            isLoading: false,
            isSuccess: true,
            webtoon: action.payload.data
        }
        case `${types.GET_WEBTOON}_REJECTED`:
        return {
            ...state,
            isLoading: false,
            isError: true
        }

        //Get User Webtoon
        case `${types.GET_USER_WEBTOON}_PENDING`:
        return {
            ...state,
            isLoading: true
        }
        case `${types.GET_USER_WEBTOON}_FULFILLED`:
        return {
            ...state,
            isLoading: false,
            isSuccess: true,
            webtoonUser: action.payload.data
        }
        case `${types.GET_USER_WEBTOON}_REJECTED`:
        return {
            ...state,
            isLoading: false,
            isError: true
        }

        //GET Title
        case `${types.GET_TITLE}_PENDING`:
        return {
            ...state
        }
        case `${types.GET_TITLE}_FULFILLED`:
        return {
            ...state,
            title: action.payload.data
        }
        case `${types.GET_TITLE}_REJECTED`:
        return {
            ...state
        }

        //Get Favorite
        case `${types.GET_FAVORITE}_PENDING`:
        return {
            ...state
        }
        case `${types.GET_FAVORITE}_FULFILLED`:
        return {
            ...state,
            favorite: action.payload.data
        }
        case `${types.GET_FAVORITE}_REJECTED`:
        return {
            ...state
        }
        default:
        return state;
    }
}