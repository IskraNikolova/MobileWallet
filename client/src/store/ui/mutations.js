import { deepMerge } from './../../../src/utils/commons'

import {
  UPDATE_UI,
  SET_ACTION } from './types'

const mutations = {
  [UPDATE_UI]: (state, data) => {
    const newState = deepMerge(state, data)
    Object.entries(newState).forEach(([key, value]) => {
      state[key] = value
    })
  },
  [SET_ACTION]: (state, { action }) => {
    state.action = action
  }
}

export default mutations
