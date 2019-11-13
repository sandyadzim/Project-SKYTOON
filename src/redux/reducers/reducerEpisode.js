import * as types from '../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    episode:[],
    addEps: [],
    updateEps: [],
    image: []
}

export default function reduceEpisode(state = initialState, action){
    switch (action.type){

        //GET Episode
        case `${types.GET_EPISODE}_PENDING`:
        return {
            ...state,
            isLoading:true
        }
        case `${types.GET_EPISODE}_FULFILLED`:
        return {
            ...state,
            isLoading:false,
            isSuccess:true,
            episode: action.payload.data
        }
        case `${types.GET_EPISODE}_REJECTED`:
        return {
            ...state,
            isLoading:false,
            isError:true
        }

        //GET Image
        case `${types.GET_IMAGE_EPISODE}_PENDING`:
        return {
            ...state
        }
        case `${types.GET_IMAGE_EPISODE}_FULFILLED`:
        return {
            ...state,
            image: action.payload.data
        }
        case `${types.GET_IMAGE_EPISODE}_REJECTED`:
        return {
            ...state
        }

        //ADD Episode
        case `${types.ADD_EPISODE}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.ADD_EPISODE}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                addEps: action.payload.data
            }
        case `${types.ADD_EPISODE}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        
        //Update Eps
        case `${types.UPDATE_EPISODE}_PENDING`:
            return {
                ...state,
                isLoading: true
            }
        case `${types.UPDATE_EPISODE}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                updateEps: action.payload.data
            }
        case `${types.UPDATE_EPISODE}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        default:
        return state;
    }
}