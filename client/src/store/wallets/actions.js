import {
  SET_WALLETS,
  CREATE_WALLET
  // ADD_WALLET
} from './types'

import { createAthWallet } from '../../modules/athNetwork'

const temp = {
  'ath': ({ password, name }) => {
    const account = createAthWallet(password)
    console.log(account)
    return {}
  },
  'ava': ({ password, name, coin }) => {
    alert('ava')
    return {}
  }
}

function createWallet ({ commit }, { password, name, coin }) {
  try {
    const wallet = temp[coin.abb.toLowerCase()]({ password, name, coin })
    console.log(wallet)
    // commit(ADD_WALLET, { wallet, coin })
  } catch (err) {
    console.log(err)
  }
}

function setWallets ({ commit, getters }) {
}

export default {
  [CREATE_WALLET]: createWallet,
  [SET_WALLETS]: setWallets
}
