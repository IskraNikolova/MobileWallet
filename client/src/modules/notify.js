import { Notify } from 'quasar'

// todo refactor
export const notify = {
  createPositive (classes, message) {
    Notify.create({
      position: 'center',
      icon: 'done',
      timeout: 600,
      classes,
      message
    })
  },
  createError (classes, message) {
    Notify.create({
      position: 'center',
      timeout: 18500,
      icon: 'error_outline',
      classes,
      message,
      actions: [{ icon: 'close', color: 'white' }]
    })
  }
}
