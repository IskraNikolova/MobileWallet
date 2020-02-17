import router from '../../router'

import config from '../../modules/config'
import { initializeNetwork } from '../../modules/athNetwork'
import { secureStore, initSecureStore } from '../../modules/secureStore'
import { getDerivedKey, getRandomHex } from '../../modules/crypto'

import {
  INIT_APP,
  SET_KEY,
  VALIDATE_KEY,
  SET_COINS,
  SET_ACTION
} from './types'

import {
  OPEN_CHOICE_WALLET
} from './../ui/types'

async function initApp ({ commit, getters }) {
  commit(SET_COINS, { coins: config.coins })

  initializeNetwork(getters.endpoint)
  await initSecureStore()

  if (!getters.hasWallets) {
    router.push('/init')
  }
}

async function setKey ({ commit }, { key }) {
  const salt = getRandomHex()
  const derivedKey = getDerivedKey(key, salt)
  await secureStore.set('key', JSON.stringify({ salt, derivedKey }))

  commit(SET_KEY)
}

async function validateKey ({ getters }, { key }) {
  const encrypted = await secureStore.get('key')
  const { salt, derivedKey } = JSON.parse(encrypted)

  return derivedKey === getDerivedKey(key, salt)
}

function setAction ({ dispatch, commit }, { action }) {
  dispatch(OPEN_CHOICE_WALLET)
  commit(SET_ACTION, { action: action.split(' ')[0].toLowerCase() })
}

export default {
  [SET_KEY]: setKey,
  [INIT_APP]: initApp,
  [SET_ACTION]: setAction,
  [VALIDATE_KEY]: validateKey
}
