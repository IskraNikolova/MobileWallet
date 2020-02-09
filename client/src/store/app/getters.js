export function key (state) {
  return state.key
}

export function constants (state) {
  return state.constants
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
