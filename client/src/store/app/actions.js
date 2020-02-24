import router from '../../router'

import config from '../../modules/config'
import { initializeNetwork } from '../../modules/athNetwork'
import { secureStore, initSecureStore } from '../../modules/secureStore'
import { getDerivedKey, getRandomHex } from '../../modules/crypto'
import { createTable } from '../../modules/dbManager'

import {
  INIT_APP,
  SET_KEY,
  VALIDATE_KEY,
  SET_COINS
} from './types'

import {
  SET_WALLETS
} from './../wallets/types'

async function initApp ({ commit, dispatch, getters }) {
  commit(SET_COINS, { coins: config.coins })

  getters.coins.forEach(async coin => {
    try {
      await createTable(coin.abb)
    } catch (err) {
      console.log(err)
    }
  })

  initializeNetwork(getters.endpoint)
  await initSecureStore()
  // await secureStore.remove('key')
  await dispatch(SET_WALLETS)

  if (getters.hasWallets < 1) {
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

export default {
  [SET_KEY]: setKey,
  [INIT_APP]: initApp,
  [VALIDATE_KEY]: validateKey
}
