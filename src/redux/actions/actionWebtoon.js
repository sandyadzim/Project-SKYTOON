import * as types from '../types'
import axios from 'axios'
import {API} from '../../host'

export const handleGetWebtoon = () => ({
    type: types.GET_WEBTOON,
    payload: axios({
        method: 'GET',
        url: `${API}/webtoons`,
    })

})

export const handleGetUserWebtoon = (params) => ({
    type: types.GET_USER_WEBTOON,
    payload: axios({
        method: 'GET',
        url: `${API}/user/${params.user_id}/webtoons`,
        headers: {
            Authorization: params.token
        }
    })
})

export const handleAddUserWebtoon = (params) => ({
    type: types.ADD_USER_WEBTOON,
    payload: axios({
        method: 'POST',
        url: `https://skytoon-api.herokuapp.com/api/v1/user/${params.userId}/webtoon`,
        headers: {
            Authorization: params.token
        }
    })
})

export const handleUpdateUserWebtoon = (params) => ({
    type: types.UPDATE_USER_WEBTOON,
    payload: axios({
        method: 'PUT',
        url: `https://skytoon-api.herokuapp.com/api/v1/user/${params.userId}/webtoon/${params.webtoonId}`,
        headers: {
            Authorization: params.token
        }
    })
})

export const handleDeleteUserWebtoon = (params) => ({
    type: types.DELETE_USER_WEBTOON,
    payload: axios({
        method: 'DELETE',
        url: `https://skytoon-api.herokuapp.com/api/v1/user/${params.userId}/webtoon/${params.webtoonId}`,
        headers: {
            Authorization: params.token
        }
    })
})

export const handleTitle = () => ({
    type: types.GET_TITLE,
    payload: axios({
        method: 'GET',
        url: 'https://skytoon-api.herokuapp.com/api/v1/webtoons/:title',
    })
})

export const handleFavorite = (params) => ({
    type: types.GET_FAVORITE,
    payload: axios({
        method: 'GET',
        url: `https://skytoon-api.herokuapp.com/api/v1/webtoons/${params.id}`,
        headers: {
            Authorization: params.token
        }
    })
})