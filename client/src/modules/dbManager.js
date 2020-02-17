import * as db from './sqlManager'

const athColumns = ['address', 'name', 'iv', 'salt', 'encrypted', 'transactions']

/**
 * Add new wallet to ATH table.
 * @param {string} coin
 * @param {string} address
 * @param {string} name
 * @param {Object} { iv, salt, encrypted }
*/
export const addToAthTable = (coin, address, name, { iv, salt, encrypted }) =>
  new Promise((resolve, reject) => {
    db.addItem(coin, athColumns, [address, name, iv, salt, encrypted, []])
      .then((rs) => {
        resolve(rs)
      })
      .catch((err) => reject(err))
  })

/**
 * Init ATH table.
 * @param {string} coin
*/
export const createAthTable = (coin) =>
  new Promise((resolve, reject) => {
    db.createTable(coin, athColumns)
      .then((response) => {
        resolve(response)
      })
      .catch((err) => reject(err))
  })
