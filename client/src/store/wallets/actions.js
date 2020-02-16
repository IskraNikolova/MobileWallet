import {
  SET_WALLETS,
  CREATE_WALLET
  // ADD_WALLET
} from './types'

import {
  INIT_COIN
} from './../app/types'

import { createAthWallet } from '../../modules/athNetwork'

import {
  encryptWallet,
  decryptWallet
} from '../../modules/crypto'

import * as db from '../../modules/sqlManager'

const create = {
  'ATH': ({ password }) => {
    // todo try catch
    const account = createAthWallet(password)
    return account
  },
  'AVA': ({ password, name }) => {
    alert('ava')
    return {}
  }
}

const initTable = {
  'ATH': ({ wallet, coin, password, name }) => {
    try {
      const { iv, salt, encrypted } = encryptWallet(wallet.keystore, password)
      const address = wallet.address
      db.openDB()
        .then((res) => {
          db.createTable(coin.abb, ['address', 'name', 'iv', 'salt', 'encrypted', 'transactions'])
            .then((response) => {
              db.addItem(coin.abb,
                ['address', 'name', 'iv', 'salt', 'encrypted', 'transactions'],
                [address, name, iv, salt, encrypted, []])
                .then((rs) => {
                  console.log(rs)
                  db.closeDB()
                    .then((resclose) => console.log(resclose))
                    .catch((err) => console.log(err))
                })
                .catch((err) => {
                  console.log(err)
                })
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (err) {
      console.log(err)
    }
  },
  'AVA': ({ wallet, coin }) => {
    alert('ava')
    return {}
  }
}

const addToTable = {
  'ATH': ({ wallet, coin, password, name }) => {
    try {
      const { iv, salt, encrypted } = encryptWallet(wallet.keystore, password)
      const address = wallet.address
      db.openDB()
        .then((res) => {
          db.addItem(coin.abb,
            ['address', 'name', 'iv', 'salt', 'encrypted', 'transactions'],
            [address, name, iv, salt, encrypted, []])
            .then((rs) => {
              db.getData(coin.abb)
                .then((resultSet) => {
                  for (var x = 0; x < resultSet.rows.length; x++) {
                    let i = resultSet.rows.item(x)
                    console.log(i)
                    // db.removeItem(coin.abb, 'address', i.address)
                    try {
                      console.log(decryptWallet(i.encrypted, password, i.iv, i.salt))
                    } catch (err) {
                      console.log(err)
                    }
                  }
                })
                .catch((err) => {
                  console.log(err)
                })
            })
            .catch((err) => {
              console.log(err)
            })
        })
    } catch (err) {
      console.log(err)
    }
  },
  'AVA': ({ wallet, coin }) => {
    alert('ava')
    return {}
  }
}

function createWallet ({ commit, getters }, { password, name, coin }) {
  try {
    const wallet = create[coin.abb]({ password, name })

    if (!getters.myCoins[coin.abb]) {
      initTable[coin.abb]({ wallet, coin, password, name })
      commit(INIT_COIN, coin.abb)
    } else {
      addToTable[coin.abb]({ wallet, coin, password, name })
    }

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
