import {
  SET_WALLETS,
  CREATE_WALLET,
  ADD_WALLET
} from './types'

function createWallet ({ commit }, { wallet, coin }) {
  // todo
  commit(ADD_WALLET, { wallet, coin })
}

function setWallets ({ commit, getters }) {
}

export default {
  [CREATE_WALLET]: createWallet,
  [SET_WALLETS]: setWallets
}
