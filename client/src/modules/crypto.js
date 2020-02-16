const crypto = require('crypto')
const algorithm = 'aes-192-cbc'

/**
 * Encrypt keystore
 * @param {string} keystore
 * @param {string} password
*/
export const encryptWallet = (keystore, password) => {
  const salt = crypto.randomBytes(24).toString('hex')
  const key = crypto.pbkdf2Sync(password, salt, 1000, 24, 'sha512')
  const iv = Buffer.from(crypto.randomBytes(16), 'hex')
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(keystore, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return { iv: iv.toString('hex'), salt, encrypted }
}

/**
 * Decrypt keystore
 * @param {string} encrypted
 * @param {string} password
 * @param {string} iv
 * @param {string} salt
*/
export const decryptWallet = (encrypted, password, iv, salt) => {
  const key = crypto.pbkdf2Sync(password, salt, 1000, 24, 'sha512')
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'))
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

export const getRandomHex = () => crypto.randomBytes(20).toString('hex')
