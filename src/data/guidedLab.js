/** Active Guided Lab — single “How are you?” walkthrough (static demo, no API). */

export const GUIDED_LAB_META = {
  title: 'How are you?',
  subtitle: 'One chat message through tokens to the screen',
}

export const LAB_STEPS = [
  {
    title: '1. You type a message',
    headline: 'Begin with: “How are you?”',
    plain: 'You type ordinary words into the app. The language model has not answered yet—it first receives the text you sent.',
    input: 'The text: “How are you?”',
    output: 'A message ready for the model',
    flow: ['You', 'How are you?', 'AI app'],
    demo: ['How are you?'],
    whyHelps: 'Every LLM call starts as plain text you control—you can inspect exactly what was sent.',
    whatCanGoWrong: 'Extra hidden instructions in the app (system prompts) also reach the model, not just what you typed.',
  },
  {
    title: '2. Split text into tokens',
    headline: 'The model reads small text pieces.',
    plain: 'A tokenizer breaks your sentence into tokens. A token may be a whole word, part of a word, or punctuation.',
    input: '“How are you?”',
    output: 'A short sequence of tokens',
    flow: ['Sentence', 'Tokenizer', 'Tokens'],
    demo: ['How', ' are', ' you', '?'],
    whyHelps: 'Token limits and billing are counted in tokens—shorter phrasing can fit more context.',
    whatCanGoWrong: 'Rare words may split into many tokens, using context window faster than expected.',
  },
  {
    title: '3. Turn tokens into numbers',
    headline: 'Words become useful number patterns.',
    plain: 'Computers calculate with numbers, not words. Each token becomes a vector—a list of numbers representing meaning in context.',
    input: 'The token sequence',
    output: 'One vector for each token',
    flow: ['Tokens', 'Embeddings', 'Context'],
    demo: ['How → [0.18, …]', 'you → [−0.32, …]', '? → [0.07, …]'],
    whyHelps: 'Embeddings let the model compare and combine language mathematically across the whole prompt.',
    whatCanGoWrong: 'The same word in different sentences can get different vectors—meaning depends on surrounding context.',
  },
  {
    title: '4. Predict the response',
    headline: 'The model chooses one next token at a time.',
    plain: 'The model scores possible next tokens, picks one, then repeats. It generates—it does not look up one saved reply.',
    input: 'Tokens, vectors, and conversation context',
    output: 'A growing response, token by token',
    flow: ['Context', 'Next token', 'Repeat'],
    demo: ['I’m', ' doing', ' well', '…'],
    whyHelps: 'Streaming shows partial output early because tokens arrive one at a time—not all at once.',
    whatCanGoWrong: 'Higher randomness (temperature) can produce varied or off-topic continuations.',
  },
  {
    title: '5. Show the completed answer',
    headline: 'Tokens become readable text again.',
    plain: 'The app joins generated tokens and displays the response. Tokens may stream as they are produced.',
    input: 'Generated response tokens',
    output: '“I’m doing well—how can I help?”',
    flow: ['Tokens', 'Readable text', 'Your screen'],
    demo: ['I’m doing well—how can I help?'],
    whyHelps: 'You see the same pipeline in chat apps—useful when debugging prompts or context limits.',
    whatCanGoWrong: 'Fluent text does not guarantee factual accuracy; the model predicts likely language.',
  },
]

/*
 * TODO: Section-wise Quick Lab paused per product request (2026-08).
 * Preserved for future reuse — wire via QuickLabSectionSelect + getLabSelectorOptions.
 * Do not delete; uncomment exports below when re-enabling Course Map–aligned lab sections.
 *
 * import { AI_SECTIONS } from './appliedAICurriculum.js'
 * import { isBeginnerModule, moduleStatus } from '../utils/aiProgress.js'
 *
 * export const QUICK_LAB_META = { title: 'Quick Basics Lab', subtitle: '...' }
 * export const QUICK_LAB_BY_ID = { '00': { ... }, ... '04': { ... } }
 * export function getLabSelectorOptions(completed, nextModuleId) { ... }
 * export function recommendedLabModuleId(completed, nextModuleId) { ... }
 * See git history or QuickLabSectionSelect.jsx for full implementation.
 */
