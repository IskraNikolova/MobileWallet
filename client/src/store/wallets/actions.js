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
import { addToTable, getWallets } from '../../modules/dbManager'

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

const addToTableByCoin = {
  'ATH': async ({ wallet, coin, password, name }) => {
    const { iv, salt, encrypted } = encryptWallet(wallet.keystore, password)
    const address = wallet.address
    await addToTable(coin.abb, address, name, iv, salt, encrypted)
  },
  'AVA': async ({ wallet, coin, password, name }) => {
    alert('ava')
    // addToTable
    return {}
  }
}

async function createWallet ({ commit, getters }, { password, name, coin }) {
  const wallet = create[coin.abb]({ password, name })

  if (!getters.myCoins[coin.abb]) {
    commit(INIT_COIN, coin.abb)
  }

  await addToTableByCoin[coin.abb]({ wallet, coin, password, name })

  commit(ADD_WALLET, { coin: coin.abb, wallet: { address: wallet.address, name } })
}

function setWallets ({ commit, getters }) {
  Promise.all(getters.coins.map(c => getWallets(c.abb)))
    .then((result) => {
      result.forEach(coins => {
        const wallets = Object.values(coins)[0]
        const coin = Object.keys(coins)[0]

        if (wallets.length > 0) {
          commit(SET_WALLETS, { coin, wallets })
          commit(SET_USED_COIN, { coin: getters.coinByName(coin) })
        }
      })
    }).catch((err) => console.log(err))
}

export default {
  [CREATE_WALLET]: createWallet,
  [SET_WALLETS]: setWallets
}
