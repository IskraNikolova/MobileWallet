import router from '../../router'
import config from '../../modules/config'
import { decryptKey } from '../../modules/crypto'

import {
  INIT_APP,
  SET_KEY,
  SET_COINS,
  SET_CONSTANTS,
  SET_ACTION
} from './types'

import {
  OPEN_CHOICE_WALLET
} from './../ui/types'

function initApp ({ commit, dispatch, getters }) {
  commit(SET_COINS, { coins: config.coins })
  if (!getters.hasWallets) {
    dispatch(SET_CONSTANTS)
    router.push('/init')
  }
}

function setKey ({ commit, getters }, { key }) {
  if (Object.keys(getters.wallets).length < 1) {
    commit(SET_KEY, { key })
    return
  }
  return new Promise((resolve, reject) => {
    try {
      let address = Object.keys(getters.wallets[0])[0]
      decryptKey({ ciphertext: getters.wallets[0][`${address}`], key })

      commit(SET_KEY, { key })
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

function setConstants ({ commit, getters }) {
  const constants = require(`./../../statics/languages/${getters.language}`)
  commit(SET_CONSTANTS, { constants })
}

function setAction ({ dispatch, commit, getters }, { action }) {
  dispatch(OPEN_CHOICE_WALLET)
  commit(SET_ACTION, { action: action.split(' ')[0].toLowerCase() })
}

export default {
  [INIT_APP]: initApp,
  [SET_KEY]: setKey,
  [SET_CONSTANTS]: setConstants,
  [SET_ACTION]: setAction
}
