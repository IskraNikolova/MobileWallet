import {
  UPDATE_UI,
  OPEN_CHOICE_WALLET,
  CLOSE_CHOICE_WALLET,
  OPEN_RESTORE_WALLET,
  CLOSE_RESTORE_WALLET
} from './types'

const updateUi = ({ commit }, data) => {
  commit(UPDATE_UI, data)
}

const openChoiceWallet = ({ commit }) => {
  commit(UPDATE_UI, { choiceWalletMenu: { isOpen: true } })
}

const closeChoiceWallet = ({ commit }) => {
  commit(UPDATE_UI, { choiceWalletMenu: { isOpen: false } })
}

const openRestoreWallet = ({ commit, getters }, { abb }) => {
  let restoreWallet = getters.ui.restoreWallet
  restoreWallet[abb] = { isOpen: true }
  commit(UPDATE_UI, { restoreWallet })
}

const closeRestoreWallet = ({ commit, getters }, { abb }) => {
  let restoreWallet = getters.ui.restoreWallet
  restoreWallet[abb] = { isOpen: false }
  commit(UPDATE_UI, { restoreWallet })
}

export default {
  [UPDATE_UI]: updateUi,
  [OPEN_CHOICE_WALLET]: openChoiceWallet,
  [CLOSE_CHOICE_WALLET]: closeChoiceWallet,
  [OPEN_RESTORE_WALLET]: openRestoreWallet,
  [CLOSE_RESTORE_WALLET]: closeRestoreWallet
}
