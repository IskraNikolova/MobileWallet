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

  if (!getters.hasWallets) {
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
