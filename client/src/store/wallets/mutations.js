import Vue from 'vue'

import {
  ADD_WALLET
} from './types'

const mutations = {
  [ADD_WALLET]: (state, { wallet, coin }) => {
    if (!state.wallets[coin]) Vue.set(state.wallets, coin, [])

    state.wallets[coin].push(wallet)
  }
}

export default mutations
