import config from '../../modules/config'

export default function () {
  return {
    choiceWalletMenu: { isOpen: false },
    restoreWallet: config.coins.reduce((result, coin) => {
      const key = coin.abb.toLowerCase()
      result[key] = { isOpen: false, abb: key }
      return result
    }, {})
  }
}
