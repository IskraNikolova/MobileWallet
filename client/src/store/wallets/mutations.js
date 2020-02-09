import {
  SET_WALLETS,
  ADD_WALLET
} from './types'

const mutations = {
  [SET_WALLETS]: (state, { wallets }) => {
    state.wallets = wallets
  },
  [ADD_WALLET]: (state, { wallet, coin }) => {
    state.wallets[coin].push(wallet)
  }
}

export default mutations
