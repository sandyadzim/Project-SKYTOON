import * as types from '../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    fav: [],
    addFav: [],
    delFav:[]
}

export default function reducerFav(state = initialState, action){
    switch (action.type){
        case `${types.GET_FAV}_PENDING`:
            return {
                ...state,
                isLoading: true,
            }
        case `${types.GET_FAV}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                fav: action.payload.data
            }
        case `${types.GET_FAV}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        
        //ADD FAVOURITE
        case `${types.ADD_FAV}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.ADD_FAV}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                addFav: action.payload.data
            }
        case `${types.ADD_FAV}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        //DELETE FAVOURITE
        case `${types.DEL_FAV}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.DEL_FAV}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                delFav: action.payload.data
            }
        case `${types.DEL_FAV}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        
        default:
        return state;
    }
}