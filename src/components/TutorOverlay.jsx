import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function TutorOverlay({
  open,
  question,
  index,
  total,
  onAnswer,
  onCloseReady,
  waiting,
  onCloseQuiz,
  onLeaveLesson,
}) {
  const [picked, setPicked] = useState(null)
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    setPicked(null)
    setFeedback(null)
  }, [question?.id])

  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') onCloseQuiz()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onCloseQuiz])

  if (!open || !question) return null

  function choose(c) {
    if (picked) return
    setPicked(c.id)
    setFeedback(c)
    if (c.correct) {
      setFeedback(c)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40 flex flex-col justify-end pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          type="button"
          aria-label="Close questions"
          className="flex-1 min-h-[32dvh] pointer-events-auto bg-transparent"
          onClick={onCloseQuiz}
        />
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pointer-events-auto w-full sm:max-w-lg sm:mx-auto max-h-[52dvh] overflow-y-auto rounded-t-3xl border border-white/15 bg-[#0b1220]/95 p-5 pb-8 shadow-[0_-8px_40px_rgba(0,0,0,0.45)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-white/20 sm:hidden" />
          <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
            <span>Tutor</span>
            <div className="flex items-center gap-3">
              <span>
                {index + 1} / {total}
              </span>
              <button
                type="button"
                onClick={onCloseQuiz}
                className="h-8 w-8 rounded-full border border-white/15 text-white text-lg leading-none grid place-items-center"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>
          <div className="rounded-2xl bg-white/8 border border-white/10 p-4 mb-4">
            <p className="text-[15px] leading-relaxed text-slate-100">{question.prompt}</p>
          </div>
          <div className="flex flex-col gap-2">
            {question.choices.map((c) => {
              const selected = picked === c.id
              const show = picked && selected
              return (
                <button
                  key={c.id}
                  onClick={() => choose(c)}
                  className={`text-left rounded-2xl border px-4 py-3 text-sm ${
                    show && c.correct
                      ? 'border-teal-300 bg-teal-300/15'
                      : show && !c.correct
                        ? 'border-amber-300 bg-amber-300/10'
                        : 'border-white/10 bg-white/5'
                  }`}
                >
                  {c.text}
                </button>
              )
            })}
          </div>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 rounded-2xl p-4 text-sm ${
                feedback.correct ? 'bg-teal-300/10 text-teal-100' : 'bg-amber-300/10 text-amber-100'
              }`}
            >
              {feedback.tutorReply}
              {!feedback.correct && (
                <button className="block mt-2 text-white underline" onClick={() => { setPicked(null); setFeedback(null) }}>
                  Try again
                </button>
              )}
              {feedback.correct && !waiting && (
                <button
                  type="button"
                  onClick={() => onAnswer(true)}
                  className="mt-3 w-full rounded-full bg-teal-300 text-slate-900 font-semibold py-2.5"
                >
                  {index < total - 1 ? 'Next question' : 'Continue'}
                </button>
              )}
            </motion.div>
          )}
          {waiting && (
            <button onClick={onCloseReady} className="mt-4 w-full rounded-full bg-teal-300 text-slate-900 font-semibold py-3">
              See the next pieces
            </button>
          )}
          <div className="mt-5 flex items-center justify-between text-sm">
            <button type="button" onClick={onCloseQuiz} className="text-slate-400">
              Close for now
            </button>
            <button type="button" onClick={onLeaveLesson} className="text-amber-200">
              Leave lesson
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
