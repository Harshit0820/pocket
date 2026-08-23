export const EXPERIENCE_LEVELS = [
  {
    id: 'starter',
    title: 'Just starting',
    blurb: 'Simple words. Same maps and questions.',
  },
  {
    id: 'interview',
    title: 'Interview prep',
    blurb: 'Interview language, with a quick meaning for each term.',
  },
  {
    id: 'backend',
    title: 'I work in backend',
    blurb: 'Short and sharp — tradeoffs, not tutorials.',
  },
]

/** 3 questions per gate (4 on later layers). */
export function questionsForGate(_levelId, stageIndex) {
  return stageIndex >= 3 ? 5 : 4
}

export const TERMS = {
  cdn: {
    starter: 'a nearby copy of popular files',
    interview: 'a CDN (nearby cache of files)',
    backend: 'an edge CDN',
  },
  api: {
    starter: 'the app’s front door on the server',
    interview: 'an API gateway',
    backend: 'the API / edge gateway',
  },
  cache: {
    starter: 'a fast memory shelf for hot data',
    interview: 'a cache (fast memory in front of the database)',
    backend: 'a hot cache',
  },
  queue: {
    starter: 'a waiting line for work',
    interview: 'a message queue',
    backend: 'an async queue',
  },
  db: {
    starter: 'the long-term records',
    interview: 'the primary database',
    backend: 'the system of record',
  },
  blob: {
    starter: 'a warehouse for big files',
    interview: 'object storage',
    backend: 'blob / object storage',
  },
  workers: {
    starter: 'background helpers',
    interview: 'worker services',
    backend: 'async workers',
  },
  auth: {
    starter: 'the “who are you?” check',
    interview: 'auth / session service',
    backend: 'authn',
  },
}

export function term(key, level) {
  return TERMS[key]?.[level] || TERMS[key]?.interview || key
}
