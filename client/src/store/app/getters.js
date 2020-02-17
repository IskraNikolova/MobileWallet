export function constants (state) {
  return require(`./../../statics/languages/${state.language}`)
}

export function endpoint (state) {
  return state.endpoint
}

export function language (state) {
  return state.language
}

export function coins (state) {
  return state.coins
}

export function coinByName (state) {
  return name => state.coins.find(c => c.name === name)
}

export function action (state) {
  return state.action
}

export function myCoins (state) {
  return state.myCoins
}

export function hasKey (state) {
  return state.hasKey
}
