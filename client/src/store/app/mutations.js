import {
  SET_COINS,
  SET_KEY,
  SET_LANGUAGE,
  SET_ENDPOINT,
  INIT_COIN,
  SET_USED_COIN
} from './types'

const mutations = {
  [SET_LANGUAGE]: (state, { language }) => {
    state.language = language
  },
  [SET_COINS]: (state, { coins }) => {
    state.coins = coins
  },
  [SET_ENDPOINT]: (state, { endpoint }) => {
    state.endpoint = endpoint
  },
  [INIT_COIN]: (state, abb) => {
    state.myCoins[abb] = true
  },
  [SET_KEY]: (state) => {
    state.hasKey = true
  },
  [SET_USED_COIN]: (state, { coin }) => {
    state.usedCoin = coin
  }
}

export default mutations
