const CryptoJS = require('crypto-js')
const crypto = require('crypto')
console.log(crypto)
// const algorithm = 'aes256'

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

crypto.randomBytes(256).toString('hex')
// export const encrypt = (key, pass) => {
//   const secret =
//   const iv = Buffer.from(crypto.randomBytes(256).toString(), 'hex')
//   const cipher = crypto.createCipheriv(algorithm, secret, iv)
//   let encrypted = cipher.update(key, 'utf8', 'hex')
//   encrypted += cipher.final('hex')
//   return encrypted
// }

// const decryptionSecrets = {}
// export const decrypt = (encryptedMessage, publicKey) => {
//   const iv = Buffer.from(publicKey.substr(0, 32), 'hex')
//   decryptionSecrets[publicKey] = decryptionSecrets[publicKey] || computeSecret(Buffer.from(publicKey, 'hex'))
//   const decipher = crypto.createDecipheriv(algorithm, decryptionSecrets[publicKey], iv)
//   let decrypted = decipher.update(encryptedMessage, 'hex', 'utf8')
//   decrypted += decipher.final('utf8')
//   return decrypted
// }

// export const getRandomHex = () => crypto.randomBytes(20).toString('hex')

// /**
//  * Compute a secret key for messages encryption/decryption
//  * @param {Buffer} publicKeyBuffer
//  */
// const computeSecret = publicKeyBuffer => {
//   const ecdh = crypto.createECDH('secp256k1')
//   ecdh.generateKeys()
//   ecdh.setPrivateKey(getPrivateKeyBuffer())
//   return ecdh.computeSecret(publicKeyBuffer)
// }
