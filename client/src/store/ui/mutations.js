// import merge from 'deepmerge'

import { UPDATE_UI } from './types'

const mutations = {
  [UPDATE_UI]: (state, data) => {
    const newState = state // merge(state, data)
    Object.entries(newState).forEach(([key, value]) => {
      state[key] = value
    })
  }
}

export default mutations
