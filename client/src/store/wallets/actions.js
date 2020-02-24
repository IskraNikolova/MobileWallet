import {
  ADD_WALLET,
  SET_WALLETS,
  CREATE_WALLET
} from './types'

import {
  INIT_COIN,
  SET_USED_COIN
} from './../app/types'

import { encryptWallet } from '../../modules/crypto'
import { createAthWallet } from '../../modules/athNetwork'
import { addToAthTable, getWallets } from '../../modules/dbManager'

const create = {
  'ATH': ({ password }) => {
    const account = createAthWallet(password)
    return account
  },
  'AVA': ({ password, name }) => {
    alert('ava')
    return {}
  }
}

const addToTable = {
  'ATH': async ({ wallet, coin, password, name }) => {
    const { iv, salt, encrypted } = encryptWallet(wallet.keystore, password)
    const address = wallet.address

    await addToAthTable(coin.abb, address, name, { iv, salt, encrypted })
  },
  'AVA': async ({ wallet, coin, password, name }) => {
    alert('ava')
    return {}
  }
}

async function createWallet ({ commit, getters }, { password, name, coin }) {
  try {
    const wallet = create[coin.abb]({ password, name })

    if (!getters.myCoins[coin.abb]) {
      commit(INIT_COIN, coin.abb)
    }

    await addToTable[coin.abb]({ wallet, coin, password, name })

    commit(ADD_WALLET, { coin: coin.abb, wallet: { address: wallet.address, name } })

    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

async function setWallets ({ commit, getters }) {
  let coins = getters.coins.map(c => c.abb)

  for (let i = 0; i < coins.length; i++) {
    try {
      let result = await getWallets(coins[i])
      if (result.length > 0) {
        commit(SET_WALLETS, { coin: coins[i], wallets: result })
        commit(SET_USED_COIN, { coin: getters.coinByName(coins[i]) })
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export default {
  [CREATE_WALLET]: createWallet,
  [SET_WALLETS]: setWallets
}
