import {
  ADD_WALLET,
  SET_WALLETS,
  CREATE_WALLET
} from './types'

import {
  INIT_COIN
} from './../app/types'

import { encryptWallet } from '../../modules/crypto'
import { createAthWallet } from '../../modules/athNetwork'
import { addToAthTable, createAthTable, getWallets } from '../../modules/dbManager'

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

const initTable = {
  'ATH': async ({ coin }) => {
    await createAthTable(coin.abb)
  },
  'AVA': async ({ coin }) => {
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

    if (getters.myCoins[coin.abb]) {
      await initTable[coin.abb]({ coin })
      commit(INIT_COIN, coin.abb)
    }
    commit(INIT_COIN, coin.abb)
    await addToTable[coin.abb]({ wallet, coin, password, name })

    commit(ADD_WALLET, { coin: coin.abb, wallet: wallet.address })

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
      if (getters.myCoins[coins[i]]) {
        let result = await getWallets(coins[i])
        if (getters.wallets[coins[i]].length !== result.length) {
          commit(SET_WALLETS, { coin: coins[i], addresses: result })
        }
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
