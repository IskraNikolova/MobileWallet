import Web3 from 'web3'
const bip39 = require('bip39')
import Tx from 'ethereumjs-tx'
const walletEth = require('ethereumjs-wallet')

import config from './config'
import { decryptWallet } from './crypto'
const constants = require(`./../statics/languages/en`)

let web3
var provider

export const initializeNetwork = endpoint => {
  if (web3) return

  provider = new Web3.providers.WebsocketProvider(`wss://${endpoint.value}`)
  web3 = new Web3(provider)
}

export const changeProvider = endpoint => {
  const provider = new Web3
    .providers
    .WebsocketProvider(`wss://${endpoint}`)
  web3.setProvider(provider)
}

/**
 * Validate connection with endpoint
 * @param {string} endpoint
*/
export const validateEndpointConnectivity = async endpoint => {
  try {
    const provider = new Web3
      .providers
      .WebsocketProvider(`wss://${endpoint}`)

    provider.on('error', () => {
      provider.connection.close()
      return false
    })

    const w3 = new Web3(provider)
    const isListening = await w3.eth.net.isListening()

    provider
      .connection
      .close()

    return isListening
  } catch (error) {
    return false
  }
}

export const prepareTransaction = async ({ sendObj, password, key }) => {
  isValidAddress(sendObj.to)

  const validateAmount = await haveEnougToSend({
    address: sendObj.from,
    amount: sendObj.value,
    gas: sendObj.gas
  })

  if (!validateAmount) {
    throw new Error(constants._notEnoughError)
  }

  const gasPrice = await web3.eth.getGasPrice()
  const transactionCount = await web3.eth.getTransactionCount(sendObj.from, 'pending')

  const rawTx = {
    from: sendObj.from,
    to: sendObj.to,
    chainId: config.chainId,
    nonce: parseInt(transactionCount),
    gasPrice: web3.utils.numberToHex(gasPrice),
    gasLimit: web3.utils.numberToHex(web3.utils.toWei(sendObj.gas.toString(), 'Gwei')),
    value: web3.utils.numberToHex(web3.utils.toWei(sendObj.value))
  }

  const keyObj = (sendObj.from).substring(2)
  // todo take iv and salt
  const encrypted = sendObj.encryptWallet[`${keyObj}`]
  const iv = ''
  const salt = ''
  const keystore = decryptWallet({ encrypted, password: key, iv, salt })
  const pk = getPrivateKey({ keystore, password })

  const tx = new Tx(rawTx)
  tx.sign(Buffer.from(pk, 'hex'))

  return tx.serialize()
}

export const sendTransaction = async ({ sendObj, password, key }) => {
  const serializedTx = await prepareTransaction({ sendObj, password, key })

  return new Promise((resolve, reject) => {
    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), (error, hash) => {
      if (error) reject(error)
      resolve(hash)
    })
  })
}

export const getPrivateKey = ({ keystore, password }) => {
  let myWallet = walletEth.fromV3(keystore, password)

  return myWallet
    .getPrivateKey()
    .toString('hex')
}

export const getMnemonic = ({ keystore, password }) => {
  const pk = getPrivateKey({ keystore, password })

  return bip39.entropyToMnemonic(pk)
}

export const getCurrentBalance = async address => {
  try {
    const wei = await web3.eth.getBalance(address)
    return {
      wei,
      ath: web3.utils.fromWei(wei, 'ether')
    }
  } catch (error) {
    return { wei: '0', ath: '0' }
  }
}

export const createAthWallet = password => {
  let pk = web3.utils.randomHex(32)
  let newAccount = web3.eth.accounts.privateKeyToAccount(pk)
  let address = newAccount.address
  let date = (new Date(Date.now())).toJSON()

  return ({
    address,
    keystore: JSON.stringify(newAccount.encrypt(password)),
    keyFileName: `UTC--${date.replace(/:/g, '-')}--${address.substr(2)}`
  })
}

export const recoveryWallet = ({ recoveryPhrase, password }) => {
  return new Promise((resolve, reject) => {
    let pk = bip39.mnemonicToEntropy(recoveryPhrase)
    const bufPk = Buffer.from(pk, 'hex')
    const wallet = walletEth.fromPrivateKey(bufPk)

    const address = wallet.getAddress().toString('hex')

    resolve({
      keyFileName: `UTC--${new Date().toISOString().replace(/[:]/g, '-')}--${address}`,
      keystore: JSON.stringify(wallet.toV3(password, { n: 1024 })),
      address
    })
  })
}

export const isValidAddress = address => {
  return web3.utils.toChecksumAddress(address)
}

export const haveEnougToSend = async ({ address, amount, gas }) => {
  let balance = await getCurrentBalance(address)

  return balance.ath >= parseFloat(amount) + parseFloat(gas)
}

export const getNumberToHexValue = value => {
  return web3.utils.numberToHex(web3.utils.toWei(value))
}

export const fromWei = value => {
  return web3.utils.fromWei(value, 'ether')
}
