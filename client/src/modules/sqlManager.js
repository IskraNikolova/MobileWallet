const DB_NAME = 'walletDb.db'
var db

/**
 * Call the openDatabase() function to get started,
 * passing in the name and location for the database.
*/
export const openDB = () => new Promise((resolve, reject) => {
  document.addEventListener('deviceready', onDeviceReady, false)

  // Cordova is ready
  function onDeviceReady () {
    db = (window.cordova.platformId === 'browser')
      ? window.openDatabase(DB_NAME, '1.0', 'Data', 2 * 1024 * 1024)
      : window.sqlitePlugin.openDatabase(
        { name: DB_NAME, location: 'default' },
        (res) => resolve(res),
        (err) => reject(err)
      )
  }
})

/**
 * Create a table with columns. If the table already exists,
 * this SQL statement opens the table.
 * @param {string} tableName
 * @param {Array} columnsNames
 * @returns {Promise}
*/
export const createTable = (tableName, columnsNames) =>
  new Promise((resolve, reject) => {
    let query = `CREATE TABLE ${tableName} (${columnsNames.join(', ')})`

    executeSQL(query)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })

/**
 * Add a row to the database using the INSERT INTO SQL statement.
 * @param {string} tableName
 * @param {Array} toColumns
 * @param {Array} columnsValues
 * @returns {Promise}
*/
export const addItem = (tableName, toColumns, columnsValues) =>
  new Promise((resolve, reject) => {
    // build string for placeholder like ( ?, ?, ? ) - repeat '?' toColumns.length
    let stringQuery = new Array(toColumns.length).fill('?').join(', ')

    let query = `INSERT INTO ${tableName} (${toColumns.join(', ')}) VALUES (${stringQuery})`

    executeSQL(query, columnsValues)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })

/**
 * Read from the database using a SELECT statement.
 * Include a WHERE condition to match the resultSet to the passed in
 * 'selectorColumnName' with 'selectorColumnValue'.
 * Get result from resultSet.rows.item
 *  for(var x = 0; x < resultSet.rows.length; x++) {
      console.log(resultSet.rows.item(x))
    }
 * @param {string} tableName
 * @param {Array} columns
 * @param {string} selectorColumnName
 * @param {string} selectorColumnValue
 * @returns {Promise}
*/
export const getDataWhere = (tableName, columns, selectorColumnName, selectorColumnValue) =>
  new Promise((resolve, reject) => {
    let query = `SELECT ${columns.join(', ')} FROM ${tableName} WHERE ${selectorColumnName} = ?`

    executeSQL(query, [selectorColumnValue])
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })

export const getData = (tableName) =>
  new Promise((resolve, reject) => {
    let query = `SELECT * FROM ${tableName}`

    executeSQL(query)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })

/**
 * Remove a row from the database that matches the passed in 'column' with 'value'.
 * @param {string} tableName
 * @param {string} column
 * @param {string} selectorColumnValue
 * @returns {Promise}
*/
export const removeItem = (tableName, column, value) =>
  new Promise((resolve, reject) => {
    let query = `DELETE FROM ${tableName} WHERE ${column} = ?`

    executeSQL(query, [value])
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })

/**
 * Update rows in the database for records that match the passed in selector.
 * In this form, the statement will update multiple rows if the selector are not unique.
 * @param {string} tableName
 * @param {string} column
 * @param {string} selector
 * @param {Array} newValues
 * @returns {Promise}
*/
export const updateItem = (tableName, column, selector, newValues) =>
  new Promise((resolve, reject) => {
    let query = `UPDATE ${tableName} SET ${column} = ? WHERE ${selector} = ?`

    executeSQL(query, newValues)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })

/**
 * Execute SQL requests
 * @param {string} query
 * @param {Array} values
 * @returns {Promise}
*/
export const executeSQL = (query, values = []) =>
  new Promise((resolve, reject) => {
    if (!Array.isArray(values)) return

    openDB().then(() => {
      db.transaction(
        statementCallback,
        callError,
        () => closeDB()
      )
    })

    function statementCallback (tx) {
      tx.executeSql(
        query,
        values,
        (tx, rs) => resolve(rs),
        (tx, error) => reject(error)
      )
    }

    function callError (error) {
      closeDB()
      reject(error)
    }
  })

/**
 * When you are finished with your transactions, close the database.
 * Call closeDB within the transaction success or failure callbacks
 * (rather than the callbacks for executeSql()).
*/
export const closeDB = () => {
  db.close(function () {
    console.log('DB closed!')
  }, function (error) {
    console.log('Error closing DB:' + error.message)
  })
}
