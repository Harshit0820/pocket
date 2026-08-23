import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { getBeginnerModule } from '../../data/beginnerModules.js'
import { ModuleInteraction } from './ModuleInteractions.jsx'
import {
  NavBackButton,
  NavRestartButton,
  NavTitle,
  PocketNavBar,
} from '../PocketNav.jsx'
import {
  T_BODY,
  T_BODY_SM,
  T_BTN,
  T_BTN_OPTION,
  T_LABEL,
  T_META,
  T_PAGE_TITLE,
} from '../../ui/typography.js'

function PhaseDots({ phaseIndex, total }) {
  return (
    <div className="flex gap-1.5" aria-hidden>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all ${
            i === phaseIndex ? 'w-5 bg-violet-300' : i < phaseIndex ? 'w-1.5 bg-violet-300/50' : 'w-1.5 bg-white/15'
          }`}
        />
      ))}
    </div>
  )
}

function PhaseAside({ children }) {
  if (!children) return null
  return (
    <div className="mt-4 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3">
      <p className={`${T_BODY_SM} text-slate-400`}>
        <span className="font-medium text-violet-200/90">Remember: </span>
        {children}
      </p>
    </div>
  )
}

function phaseAside(phase) {
  if (phase.type === 'objective' || phase.type === 'learn' || phase.type === 'experiment') {
    return phase.data.aside || null
  }
  return null
}

function QuizPanel({ questions, onComplete, resetKey }) {
  const [qIndex, setQIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const q = questions[qIndex]

  function pick(i) {
    if (picked !== null) return
    setPicked(i)
  }

  function next() {
    if (qIndex < questions.length - 1) {
      setQIndex((i) => i + 1)
      setPicked(null)
    } else {
      onComplete()
    }
  }

  return (
    <div key={resetKey} className="space-y-5">
      <p className={T_META}>Check {qIndex + 1} of {questions.length}</p>
      <p className={`${T_BODY} font-medium text-slate-100`}>{q.q}</p>
      <div className="space-y-2.5">
        {q.choices.map((choice, i) => {
          const isPicked = picked === i
          const isCorrect = i === q.correct
          let cls = 'border-white/10 bg-white/[0.03] text-slate-200'
          if (picked !== null) {
            if (isCorrect) cls = 'border-teal-300/40 bg-teal-300/10 text-teal-100'
            else if (isPicked) cls = 'border-amber-300/30 bg-amber-300/10 text-amber-100'
            else cls = 'border-white/8 bg-white/[0.02] text-slate-500'
          }
          return (
            <button
              key={choice}
              type="button"
              onClick={() => pick(i)}
              className={`w-full rounded-xl border px-4 py-3.5 text-left transition ${T_BTN_OPTION} ${cls}`}
            >
              {choice}
            </button>
          )
        })}
      </div>
      {picked !== null && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <p className={T_BODY_SM}>{q.feedback}</p>
          <button type="button" onClick={next} className={`mt-4 w-full rounded-full bg-violet-300 py-3 ${T_BTN} text-slate-950`}>
            {qIndex < questions.length - 1 ? 'Next question' : 'See recap'}
          </button>
        </motion.div>
      )}
    </div>
  )
}

const PHASE_CARD_MIN_H =
  'min-h-[calc(100dvh-9.75rem)] sm:min-h-[calc(100dvh-10.5rem)]'

export function AppliedAIModule({ moduleId, completed, onBack, onComplete, isLastBeginner }) {
  const module = getBeginnerModule(moduleId)
  const phases = useMemo(() => {
    if (!module) return []
    const list = [{ type: 'objective', data: module.objective }]
    module.learn.forEach((step, i) => list.push({ type: 'learn', data: step, learnIndex: i }))
    list.push({ type: 'experiment', data: module.experiment })
    list.push({ type: 'quiz', data: module.quiz })
    list.push({ type: 'recap', data: module.recap })
    return list
  }, [module])

  const [phaseIndex, setPhaseIndex] = useState(completed ? phases.length - 1 : 0)
  const [sessionKey, setSessionKey] = useState(0)
  const phase = phases[phaseIndex]

  if (!module || !phase) return null

  function advance() {
    setPhaseIndex((i) => Math.min(i + 1, phases.length - 1))
  }

  function finish() {
    onComplete()
    setPhaseIndex(phases.length - 1)
  }

  function restartModule() {
    setPhaseIndex(0)
    setSessionKey((k) => k + 1)
  }

  const phaseLabel = {
    objective: 'Objective',
    learn: 'Learn',
    experiment: 'Activity',
    quiz: 'Checks',
    recap: 'Recap',
  }

  const aside = phaseAside(phase)
  const fillViewport = phase.type !== 'quiz'

  return (
    <div className="flex min-h-dvh flex-col pb-10">
      <PocketNavBar maxWidth="max-w-2xl">
        <NavBackButton onClick={onBack} label="Back to course map" />
        <NavTitle>Section {module.id}</NavTitle>
      </PocketNavBar>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-3 sm:px-4">
        <div className="shrink-0 pt-4">
          <h2 className={`${T_PAGE_TITLE} line-clamp-2`}>{module.title}</h2>
          <div className="mt-3 flex items-center gap-2">
            {phaseIndex > 0 ? (
              <NavRestartButton
                onClick={restartModule}
                ariaLabel="Restart module from the beginning"
                title="Restart module from the beginning"
              />
            ) : (
              <span className="h-9 w-9 shrink-0" aria-hidden />
            )}
            <div className="flex flex-1 justify-center">
              <PhaseDots phaseIndex={phaseIndex} total={phases.length} />
            </div>
            <span className={`w-9 shrink-0 text-right tabular-nums ${T_META}`}>
              {phaseIndex + 1}/{phases.length}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col pt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${sessionKey}-${phaseIndex}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16 }}
              className={`flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:rounded-3xl sm:p-7 ${
                fillViewport ? PHASE_CARD_MIN_H : ''
              }`}
            >
              <p className={`shrink-0 ${T_LABEL} text-violet-300/70`}>{phaseLabel[phase.type]}</p>

              <div className={`mt-2 flex flex-1 flex-col ${fillViewport ? 'min-h-0' : ''}`}>
                {phase.type === 'objective' && (
                  <>
                    <h3 className={T_PAGE_TITLE}>{phase.data.heading}</h3>
                    <p className={`mt-4 ${T_BODY}`}>{phase.data.body}</p>
                    <ul className={`mt-5 space-y-2.5 ${T_BODY_SM} text-slate-400`}>
                      {phase.data.bullets.map((b) => (
                        <li key={b} className="flex gap-2 leading-relaxed">
                          <span className="shrink-0 text-violet-300">→</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <PhaseAside>{aside}</PhaseAside>
                    <button
                      type="button"
                      onClick={advance}
                      className={`mt-auto w-full shrink-0 rounded-full bg-violet-300 py-3 pt-6 ${T_BTN} text-slate-950`}
                    >
                      Start section
                    </button>
                  </>
                )}

                {phase.type === 'learn' && (
                  <>
                    <h3 className={T_PAGE_TITLE}>{phase.data.heading}</h3>
                    <p className={`mt-3 ${T_BODY}`}>{phase.data.body}</p>
                    <div className="mt-5">
                      <ModuleInteraction
                        key={`${sessionKey}-learn-${phase.data.interaction}`}
                        type={phase.data.interaction}
                      />
                    </div>
                    <PhaseAside>{aside}</PhaseAside>
                    <button
                      type="button"
                      onClick={advance}
                      className={`mt-auto w-full shrink-0 rounded-full bg-violet-300 py-3 pt-6 ${T_BTN} text-slate-950`}
                    >
                      {phaseIndex < phases.length - 2 ? 'Continue' : 'Next step'}
                    </button>
                  </>
                )}

                {phase.type === 'experiment' && (
                  <>
                    <h3 className={T_PAGE_TITLE}>{phase.data.heading}</h3>
                    <p className={`mt-3 ${T_BODY}`}>{phase.data.body}</p>
                    <div className="mt-5">
                      <ModuleInteraction
                        key={`${sessionKey}-exp-${phase.data.interaction}`}
                        type={phase.data.interaction}
                      />
                    </div>
                    <PhaseAside>{aside}</PhaseAside>
                    <button
                      type="button"
                      onClick={advance}
                      className={`mt-auto w-full shrink-0 rounded-full border border-violet-300/30 py-3 pt-6 ${T_BTN} font-normal text-violet-100`}
                    >
                      Continue to checks
                    </button>
                  </>
                )}

                {phase.type === 'quiz' && (
                  <>
                    <h3 className={T_PAGE_TITLE}>Knowledge checks</h3>
                    <div className="mt-5">
                      <QuizPanel resetKey={sessionKey} questions={phase.data} onComplete={finish} />
                    </div>
                  </>
                )}

                {phase.type === 'recap' && (
                  <>
                    <h3 className={T_PAGE_TITLE}>{phase.data.heading}</h3>
                    <div className={`mt-5 space-y-4 ${T_BODY}`}>
                      {phase.data.points.map((p) => (
                        <p key={p.label}>
                          <strong className="font-medium text-slate-100">{p.label}:</strong> {p.text}
                        </p>
                      ))}
                    </div>
                    {phase.data.labCallout && (
                      <div className={`mt-5 rounded-xl border border-violet-300/20 bg-violet-300/[0.06] px-4 py-3 ${T_BODY_SM} text-violet-100`}>
                        Revisit Guided Lab on the AI home — replay “How are you?” to connect tokens to everyday chat.
                      </div>
                    )}
                    {completed && (
                      <div className={`mt-4 rounded-xl border border-teal-300/20 bg-teal-300/[0.06] px-4 py-3 ${T_BODY_SM} text-teal-100`}>
                        {isLastBeginner
                          ? 'Beginner course complete! Intermediate modules are coming next.'
                          : `Section ${module.id} saved — next module unlocked on the course map.`}
                      </div>
                    )}
                    <p className={`mt-4 ${T_META}`}>
                      Use the restart button above to replay this module without removing your completion badge.
                    </p>
                    <button
                      type="button"
                      onClick={onBack}
                      className={`mt-4 w-full shrink-0 rounded-full bg-violet-300 py-3 ${T_BTN} text-slate-950`}
                    >
                      Back to course map
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
