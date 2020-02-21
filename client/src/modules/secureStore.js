import { Notify } from 'quasar'

let secureStorePlugin

export const initSecureStore = () => new Promise((resolve, reject) => {
  if (!window.cordova) return resolve()
  if (secureStorePlugin) return resolve()
  secureStorePlugin = new cordova.plugins.SecureStorage(
    () => resolve(),
    error => {
      Notify.create({
        message: 'Screen lock is disabled',
        detail: 'Please enable the screen lock on your device. This app cannot operate securely without it.',
        timeout: 0,
        actions: [{
          icon: 'check',
          handler: () => {
            secureStorePlugin.secureDevice(
              () => {
                initSecureStore()
              },
              () => {
                initSecureStore()
              }
            )
          }
        }]
      })
      reject(error)
    },
    'PirlChat'
  )
})

const browserStoragePrefix = 'ss:'
const browserStorage = {
  set: async (key, value) => new Promise((resolve, reject) => {
    localStorage.setItem(browserStoragePrefix + key, value)
    resolve()
  }),
  get: async key => new Promise((resolve, reject) => {
    resolve(localStorage.getItem(browserStoragePrefix + key))
  }),
  remove: async key => new Promise((resolve, reject) => {
    localStorage.removeItem(browserStoragePrefix + key)
    resolve()
  })
}

const cordovaStorage = {
  set: (key, value) => new Promise((resolve, reject) => {
    secureStorePlugin.set(() => resolve(), error => reject(error), key, value)
  }),
  get: key => new Promise((resolve, reject) => {
    secureStorePlugin.get(value => resolve(value), error => {
      if (error.message.match(/not (be )?found/i)) resolve()
      reject(error)
    }, key)
  }),
  remove: key => new Promise((resolve, reject) => {
    secureStorePlugin.remove(() => resolve(), error => reject(error), key)
  })
}

export const secureStore = {
  set: window.cordova ? cordovaStorage.set : browserStorage.set,
  get: window.cordova ? cordovaStorage.get : browserStorage.get,
  remove: window.cordova ? cordovaStorage.remove : browserStorage.remove
}
