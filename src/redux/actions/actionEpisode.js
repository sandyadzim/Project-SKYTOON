import * as types from '../types'
import axios from 'axios'
import {API} from '../../host'

export const handleGetEpisode = (idWebtoon) => ({
    type: types.GET_EPISODE,
    payload: axios({
        method: 'GET',
        url: `${API}/webtoon/${idWebtoon}/episodes`,
        // headers: {
        //     Authorization: params
        // }
    })
})

export const handleAddEpisode = (params) => ({
    type: types.ADD_EPISODE,
    payload: axios({
        method: 'POST',
        url: `${API}/user/${params.user_id}/webtoon/${params.webtoon_id}/episode`,
        headers: {
            Authorization: params.token
        }
    })
})

export const handleUpdateEpisode = (params) => ({
    type: types.UPDATE_EPISODE,
    payload: axios({
        method: 'PUT',
        url: `${API}/${params.user_id}/webtoon/${params.webtoon_id}/episode/${params.episode_id}`,
        headers: {
            Authorization: params.token
        }
    })
})

export const handleDeleteEpisode = (params) => ({
    type: types.DELETE_EPISODE,
    payload: axios({
        method: 'DELETE',
        url: `${API}/${params.user_id}/webtoon/${params.webtoon_id}/episode/${params.episode_id}`,
        headers: {
            Authorization: params.token
        }
    })
})

export const handleGetImage = (params) => ({
    type: types.GET_IMAGE_EPISODE,
    payload: axios({
        method: 'GET',
        url: `https://skytoon-api.herokuapp.com/api/v1/user/${params.user_id}/webtoon/${params.webtoon_id}/episode/${params.episode_id}/images`,
        headers: {
            Authorization: params.token
        }
    })
})

