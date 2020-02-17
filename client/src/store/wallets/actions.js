import {
  SET_WALLETS,
  CREATE_WALLET
  // ADD_WALLET
} from './types'

import {
  INIT_COIN
} from './../app/types'

import { createAthWallet } from '../../modules/athNetwork'
import { addToAthTable, createAthTable } from '../../modules/dbManager'

import {
  encryptWallet
  // decryptWallet
} from '../../modules/crypto'

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

    if (!getters.myCoins[coin.abb]) {
      await initTable[coin.abb]({ coin })
      commit(INIT_COIN, coin.abb)
    }

    await addToTable[coin.abb]({ wallet, coin, password, name })

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
