import {
  SET_KEY,
  SET_COINS,
  SET_CONSTANTS,
  SET_LANGUAGE,
  SET_ACTION

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
  }
}

export default mutations
