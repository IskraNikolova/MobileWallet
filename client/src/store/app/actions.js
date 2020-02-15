import router from '../../router'

import config from '../../modules/config'
// import { decryptKey } from '../../modules/crypto'
// import { initDb } from '../../modules/fileManager'
import { initializeNetwork } from '../../modules/athNetwork'
import { secureStore } from '../../modules/secureStore'
// import * as db from '../../modules/sqlManager'

import {
  INIT_APP,
  SET_KEY,
  SET_COINS,
  SET_ACTION
} from './types'

import {
  OPEN_CHOICE_WALLET
} from './../ui/types'

async function initApp ({ commit, dispatch, getters }) {
  commit(SET_COINS, { coins: config.coins })
  // TODO move to other action
  initializeNetwork(getters.endpoint)
  // await db.openDB()
  // db.createTable('tableTest45', ['age', 'name'])
  //   .then((res) => console.log)
  //   .catch((err) => console.error(err))
  // let query = `SELECT * FROM tableTest45;`
  // db.executeSQL(query)
  //   .then((rs) => {
  //   })
  //   .catch((err) => console.log(err))

  // db.addItem('tableTest45', ['age', 'name'], ['9', '?'])
  //   .then((res) => {
  //     console.log(res)
  //     db.getDataWhere('tableTest45', ['age', 'name'], 'age', '9')
  //       .then((rs) => {
  //         for (var x = 0; x < rs.rows.length; x++) {
  //           console.log(rs.rows.item(x))
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })

  if (!getters.hasWallets) {
    // initDb()
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err))
    // db.openDB()
    //   .then((res) => {
    //     db.addItem('test90', '4', 'isis')
    //       .then((res2) => {
    //         db.closeDB()
    //         console.log(res2)
    //       })
    //       .catch((err) => {
    //         console.log(err)
    //         db.closeDB()
    //       })
    //     db.getData('test90', 'id', 1, 'id', 'name')
    //       .then((res2) => {
    //         // db.closeDB()
    //         console.log(res2)
    //       })
    //       .catch((err) => {
    //         console.log(err)
    //         // db.closeDB()
    //       })
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    router.push('/init')
  }
}

async function setKey ({ getters }, { key }) {
  if (Object.keys(getters.wallets).length < 1) {
    await secureStore.set('key', key)
    return
  }

  try {
    // let address = Object.keys(getters.wallets[0])[0]
    // decryptKey({ ciphertext: getters.wallets[0][`${address}`], key })
    await secureStore.set('key', key)
    return true
  } catch (err) {
    return false
  }
}

function setAction ({ dispatch, commit }, { action }) {
  dispatch(OPEN_CHOICE_WALLET)
  commit(SET_ACTION, { action: action.split(' ')[0].toLowerCase() })
}

export default {
  [INIT_APP]: initApp,
  [SET_KEY]: setKey,
  [SET_ACTION]: setAction
}
