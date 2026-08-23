import { BEGINNER_MODULE_IDS } from '../utils/aiProgress.js'

export const AI_TRACKS = [
  {
    id: 'foundations',
    title: 'Foundations',
    sectionIds: ['00', '01', '02', '03'],
  },
  {
    id: 'inside-llms',
    title: 'Inside LLMs',
    sectionIds: ['04', '05'],
  },
  {
    id: 'building-apps',
    title: 'Building AI applications',
    sectionIds: ['06', '07', '08'],
  },
  {
    id: 'agents-production',
    title: 'Agents & production',
    sectionIds: ['09', '10'],
  },
]

export const AI_SECTIONS = [
  { id: '00', step: '00', title: 'Before AI: tiny foundations', built: true },
  { id: '01', step: '01', title: 'AI map & Python refresh', built: true },
  { id: '02', step: '02', title: 'Classical machine learning', built: true },
  { id: '03', step: '03', title: 'Neural networks & deep learning', built: true },
  { id: '04', step: '04', title: 'LLM foundations', built: true },
  { id: '05', step: '05', title: 'Training & adapting models', built: false },
  { id: '06', step: '06', title: 'RAG & vector search', built: false },
  { id: '07', step: '07', title: 'Context engineering & memory', built: false },
  { id: '08', step: '08', title: 'Tools, function calling & MCP', built: false },
  { id: '09', step: '09', title: 'Agents & workflows', built: false },
  { id: '10', step: '10', title: 'Evaluation, safety & production', built: false },
]

export const sectionById = Object.fromEntries(AI_SECTIONS.map((s) => [s.id, s]))

export function isSectionBuilt(id) {
  return BEGINNER_MODULE_IDS.includes(id) || sectionById[id]?.built === true
}

export const LAB_BY_LEVEL = {
  beginner: {
    title: 'How are you?',
    subtitle: 'One chat message through tokens to the screen',
    available: true,
  },
  intermediate: {
    title: 'Intermediate lab',
    subtitle: 'Coming next — switch to Beginner to study modules 00–04',
    available: false,
  },
  advanced: {
    title: 'Advanced lab',
    subtitle: 'Coming next — switch to Beginner to study modules 00–04',
    available: false,
  },
}
