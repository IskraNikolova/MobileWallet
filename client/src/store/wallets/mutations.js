import Vue from 'vue'

import {
  ADD_WALLET,
  SET_WALLETS
} from './types'

const mutations = {
  [ADD_WALLET]: (state, { wallet, coin }) => {
    if (!state.wallets[coin]) Vue.set(state.wallets, coin, [])

    state.wallets[coin].push(wallet)
  },
  [SET_WALLETS]: (state, { coin, addresses }) => {
    state.wallets[coin] = addresses
  }
}

export default mutations
