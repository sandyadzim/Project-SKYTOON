import * as types from '../types'
import axios from 'axios'
import {API} from '../../host'

export const handleGetPage = (idWebtoon, idEpisode) => ({
    type: types.GET_PAGE,
    payload: axios({
        method: 'GET',
        url: `${API}/webtoon/${idWebtoon}/episode/${idEpisode}`,
    })
})

export const handleAddPage = (params) => ({
    type: types.ADD_PAGE,
    payload: `https://skytoon-api.herokuapp.com/api/v1/user/${params.userId}/webtoon/${params.webtoonId}/episode/${params.episodeId}/image`,
    headers: {
        Authorization: params.token
    }
})

export const handleDeletePage = (params) => ({
    type: types.DELETE_PAGE,
    payload: `https://skytoon-api.herokuapp.com/api/v1/user/${params.userId}/webtoon/${params.webtoonId}/episode/${params.episodeId}/image/${params.imageId}`,
    headers: {
        Authorization: params.token
    }
})