const DB = 'db'
const WALLETS = 'wallets'

export const initDb = () => {
  return new Promise((resolve, reject) => {
    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, (rootDirEntry) => {
      rootDirEntry.getDirectory(DB, { create: true }, (dirEntry) => {
        dirEntry.getDirectory(WALLETS, { create: true }, (subDirEntry) => {
          resolve(subDirEntry)
        })
      })
    }, (err) => reject(err))
  })
}
