import * as types from '../types'
import axios from 'axios'

export const handleRegister = (name, email, password) => ({
    type: types.REGISTER,
    payload: axios({
        method: 'POST',
        url: 'https://skytoon-api.herokuapp.com/api/v1/register',
        data: {
            name,
            email,
            password
        }
    })
})