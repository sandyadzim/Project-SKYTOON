import * as types from '../types'
import axios from 'axios'
import {API} from '../../host'

export const handleAddFav = (params) => ({
    type: types.ADD_FAV,
    payload: axios({
        method: 'POST',
        url: `${API}/user/${params.user_id}/webtoon/${params.webtoon_id}/favourite`,
        headers: {
            Authorization: params.token
        }
    })
})

export const handleDelFav = (params) => ({
    type: types.DEL_FAV,
    payload: axios({
        method: 'DELETE',
        url: `${API}/user/${params.user_id}/webtoon/${params.webtoon_id}/favourite/${params.favourite_id}`,
        headers: {
            Authorization: params.token
        }
    })
})

export const handleGetFav = (params) => ({
    type: types.GET_FAV,
    payload: axios({
        method: 'GET',
        url: `${API}/user/${params.user_id}/webtoons/favourite`,
        // headers: {
        //     Authorization: params.token
        // }
    })
})