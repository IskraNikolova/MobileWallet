import {
  SET_KEY,
  SET_COINS,
  SET_CONSTANTS,
  SET_LANGUAGE,
  SET_ACTION,
  SET_ENDPOINT
} from './types'

const mutations = {
  [SET_KEY]: (state, { key }) => {
    state.key = key
  },
  [SET_CONSTANTS]: (state, { constants }) => {
    state.constants = constants
  },
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
  }
}

export default mutations
