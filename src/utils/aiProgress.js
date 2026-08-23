export const BEGINNER_MODULE_IDS = ['00', '01', '02', '03', '04']

export function normalizeAiProgress(raw) {
  const completed =
    raw?.completed && typeof raw.completed === 'object' && !Array.isArray(raw.completed)
      ? raw.completed
      : {}
  return { completed }
}

export function isBeginnerModule(id) {
  return BEGINNER_MODULE_IDS.includes(id)
}

export function isModuleBuilt(id) {
  return isBeginnerModule(id)
}

export function isModuleUnlocked(id, completed) {
  if (id === '00') return true
  const prev = String(Number(id) - 1).padStart(2, '0')
  if (isBeginnerModule(id)) return Boolean(completed[prev])
  return isBeginnerModule(prev) ? Boolean(completed[prev]) : false
}

export function moduleStatus(id, completed) {
  if (completed[id]) return 'completed'
  if (!isModuleBuilt(id)) return 'preview'
  if (isModuleUnlocked(id, completed)) return 'available'
  return 'locked'
}

export function isBeginnerCourseComplete(completed) {
  return BEGINNER_MODULE_IDS.every((id) => Boolean(completed[id]))
}

export function nextBeginnerModule(completed) {
  return BEGINNER_MODULE_IDS.find((id) => !completed[id]) || null
}
