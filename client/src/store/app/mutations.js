import {
  SET_COINS,
  SET_LANGUAGE,
  SET_ACTION,
  SET_ENDPOINT,
  INIT_COIN
} from './types'

const mutations = {
  [SET_LANGUAGE]: (state, { language }) => {
    state.language = language
  },
  [SET_COINS]: (state, { coins }) => {
    state.coins = coins
  },
  [SET_ACTION]: (state, { action }) => {
    state.action = action
  },
  [SET_ENDPOINT]: (state, { endpoint }) => {
    state.endpoint = endpoint
  },
  [INIT_COIN]: (state, abb) => {
    console.log(abb)
    state.myCoins[abb] = true
  }
}

export default mutations
