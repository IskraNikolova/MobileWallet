import {
  UPDATE_UI,
  SET_ACTION,
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

function setAction ({ dispatch, commit }, { action }) {
  dispatch(OPEN_CHOICE_WALLET)
  commit(SET_ACTION, { action: action.split(' ')[0].toLowerCase() })
}

export default {
  [SET_ACTION]: setAction,
  [UPDATE_UI]: updateUi,
  [OPEN_CHOICE_WALLET]: openChoiceWallet,
  [CLOSE_CHOICE_WALLET]: closeChoiceWallet,
  [OPEN_RESTORE_WALLET]: openRestoreWallet,
  [CLOSE_RESTORE_WALLET]: closeRestoreWallet
}
