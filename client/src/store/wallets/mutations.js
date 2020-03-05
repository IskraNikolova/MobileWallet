import Vue from 'vue'

import {
  ADD_WALLET,
  SET_WALLETS,
  SET_DETAILS_WALLET
} from './types'

const mutations = {
  [ADD_WALLET]: (state, { wallet, coin }) => {
    if (!state.wallets[coin]) Vue.set(state.wallets, coin, [])

    state.wallets[coin].push(wallet)
  },
  [SET_WALLETS]: (state, { coin, wallets }) => {
    state.wallets[coin] = wallets
  },
  [SET_DETAILS_WALLET]: (state, { wallet }) => {
    state.wallet = wallet
  }
}

export default mutations
