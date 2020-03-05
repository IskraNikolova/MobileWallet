import * as db from './sqlManager'

const columns = {
  AVA: ['name', 'address'],
  ATH: ['address', 'name', 'iv', 'salt', 'encrypted', 'transactions']
}

export const addToTable = (coin, ...params) =>
  new Promise((resolve, reject) => {
    db.addItem(coin, columns[coin], [...params])
      .then((rs) => {
        resolve(rs)
      })
      .catch((err) => reject(err))
  })

/**
 * Init db table.
 * @param {string} coin
*/
export const createTable = (coin) =>
  new Promise((resolve, reject) => {
    db.createTable(coin, columns[coin])
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        console.log(err)
      })
  })

/**
 * GET Wallets.
 * @param {string} tableName
 * @param {string} columns
*/
export const getWallets = (tableName, columns) =>
  new Promise((resolve, reject) => {
    db.getData(tableName, columns)
      .then((resultSet) => {
        let res = []
        for (let x = 0; x < resultSet.rows.length; x++) {
          res.push({ address: resultSet.rows.item(x).address, name: resultSet.rows.item(x).name })
        }
        const result = {}
        result[tableName] = res
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
