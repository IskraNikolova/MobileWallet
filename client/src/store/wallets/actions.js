import { Notify } from 'quasar'

import {
  ADD_WALLET,
  CREATE_WALLET
} from './types'

import {
  INIT_COIN
} from './../app/types'

import { encryptWallet } from '../../modules/crypto'
import { createAthWallet } from '../../modules/athNetwork'
import { addToAthTable, createAthTable } from '../../modules/dbManager'

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

    commit(ADD_WALLET, { coin: coin.abb, wallet: wallet.address })

    return true
  } catch (err) {
    Notify.create(err.message)
    return false
  }
}

export default {
  [CREATE_WALLET]: createWallet
}
