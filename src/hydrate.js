import { term } from './data/glossary.js'

export function fill(str, company, level) {
  if (!str) return ''
  return str
    .replaceAll('{asset}', company.asset)
    .replaceAll('{verb}', company.verb)
    .replaceAll('{name}', company.name)
    .replaceAll('{cdn}', term('cdn', level))
    .replaceAll('{api}', term('api', level))
    .replaceAll('{cache}', term('cache', level))
    .replaceAll('{queue}', term('queue', level))
    .replaceAll('{db}', term('db', level))
    .replaceAll('{blob}', term('blob', level))
    .replaceAll('{workers}', term('workers', level))
    .replaceAll('{auth}', term('auth', level))
}

export function hydrateQuestion(raw, template, company, level) {
  const ids = [raw.correct, ...raw.distractors]
  const choices = ids
    .map((id) => ({
      id,
      text: fill(template.labels[id], company, level),
      correct: id === raw.correct,
      tutorReply: fill(template.replies[id], company, level),
    }))
    .sort((a, b) => ((raw.seed + a.id.charCodeAt(0)) % 97) - ((raw.seed + b.id.charCodeAt(0)) % 97))
  return {
    id: raw.id,
    prompt: fill(template.prompts[raw.variant], company, level),
    choices,
  }
}
