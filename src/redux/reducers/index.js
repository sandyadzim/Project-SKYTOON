import { combineReducers } from 'redux'
import { createNavigationReducer } from 'react-navigation-redux-helpers'

import SwitchNav from '../../navigation/SwitchNav'
import reducerLogin from './../reducers/reducerLogin'
import reducerRegister from './../reducers/reducerRegister'
import reducerWebtoon from './reducerWebtoon'
import reducerEpisode from './reducerEpisode'
import reducerPage from './reducerPage'
import reducerFav from './reducerFav'

const reduceRouter = createNavigationReducer(SwitchNav)

const appReducer = combineReducers({
    router: reduceRouter,
    login: reducerLogin,
    register: reducerRegister,
    webtoon : reducerWebtoon,
    episode: reducerEpisode,
    page: reducerPage,
    fav: reducerFav
})

export default appReducer