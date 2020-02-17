import {
  SET_KEY,
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
    state.myCoins[abb] = true
  },
  [SET_KEY]: (state) => {
    state.hasKey = true
  }
}

export default mutations
