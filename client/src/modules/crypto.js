const CryptoJS = require('crypto-js')

// Encrypt
export const encryptKey = ({ data, password }) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), password)
  return ciphertext
}

// Decrypt
export const decryptKey = ({ ciphertext, key }) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key)
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  return decryptedData
}
