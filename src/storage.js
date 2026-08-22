const KEY = 'pocket-state-v2'

export function loadState() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {}
  } catch {
    return {}
  }
}

export function saveState(patch) {
  const next = { ...loadState(), ...patch }
  localStorage.setItem(KEY, JSON.stringify(next))
  return next
}
