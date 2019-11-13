import * as types from '../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess:false,
    page: []
}

export default function reducePage(state = initialState, action){
    switch (action.type){
        // GET Page
        case `${types.GET_PAGE}_PENDING`:
        return {
            ...state,
            isLoading:true
        }
        case `${types.GET_PAGE}_FULFILLED`:
        return {
            ...state,
            isLoading:false,
            isSuccess:true,
            page: action.payload.data
        }
        case `${types.GET_PAGE}_REJECTED`:
        return {
            ...state,
            isLoading: false,
            isError: true
        }
        default:
        return state
    }
}