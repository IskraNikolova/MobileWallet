export function wallets (state) {
  return state.wallets
}

export function hasWallets (state) {
  return Object.keys(state.wallets).length
}

export function wallet (state) {
  return state.wallet
}
