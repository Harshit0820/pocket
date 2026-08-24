import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { getBeginnerModule } from '../../data/beginnerModules.js'
import { ModuleInteraction } from './ModuleInteractions.jsx'
import { PhaseBlocks, PhasePreview, RecapExtras } from './PhaseBlocks.jsx'
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

function PhaseAction({ onClick, children, variant = 'primary' }) {
  const styles =
    variant === 'primary'
      ? 'bg-violet-300 text-slate-950 hover:bg-violet-200'
      : 'border border-violet-300/30 bg-transparent text-violet-100 hover:bg-violet-300/[0.06]'
  return (
    <div className="mt-4 flex justify-end">
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex min-h-[44px] items-center justify-center rounded-full px-5 py-2.5 ${T_BTN} ${styles}`}
      >
        {children}
      </button>
    </div>
  )
}

function QuizPanel({ questions, onComplete, resetKey, intro }) {
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

  const wrongHint = picked !== null && picked !== q.correct && q.whyNot?.[picked]

  return (
    <div key={resetKey} className="space-y-4">
      {intro && qIndex === 0 && <p className={T_BODY_SM}>{intro}</p>}
      <p className={T_META}>Check {qIndex + 1} of {questions.length}</p>
      {q.context && <p className={`${T_BODY_SM} text-slate-400`}>{q.context}</p>}
      <p className={`${T_BODY} font-medium text-slate-100`}>{q.q}</p>
      <div className="space-y-2">
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
              className={`w-full rounded-xl border px-4 py-3 text-left transition ${T_BTN_OPTION} ${cls}`}
            >
              {choice}
            </button>
          )
        })}
      </div>
      {picked !== null && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-white/10 bg-white/[0.04] p-3.5 space-y-2"
        >
          <p className={T_BODY_SM}>{q.feedback}</p>
          {wrongHint && (
            <p className={`${T_BODY_SM} text-amber-200/80`}>
              <span className="font-medium">Why not that choice: </span>
              {wrongHint}
            </p>
          )}
          <PhaseAction onClick={next}>
            {qIndex < questions.length - 1 ? 'Next question' : 'See recap'}
          </PhaseAction>
        </motion.div>
      )}
    </div>
  )
}

export function AppliedAIModule({ moduleId, completed, onBack, onComplete, isLastBeginner }) {
  const module = getBeginnerModule(moduleId)
  const phases = useMemo(() => {
    if (!module) return []
    const list = [{ type: 'objective', data: module.objective }]
    module.learn.forEach((step, i) => list.push({ type: 'learn', data: step, learnIndex: i }))
    list.push({ type: 'experiment', data: module.experiment })
    list.push({ type: 'quiz', data: module.quiz, intro: module.quizIntro })
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

  return (
    <div className="min-h-dvh pb-8">
      <PocketNavBar maxWidth="max-w-2xl">
        <NavBackButton onClick={onBack} label="Back to course map" />
        <NavTitle>Section {module.id}</NavTitle>
      </PocketNavBar>

      <div className="mx-auto max-w-2xl px-3 sm:px-4">
        <div className="pt-3">
          <h2 className={`${T_PAGE_TITLE} line-clamp-2`}>{module.title}</h2>
          <div className="mt-2 flex items-center gap-2">
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

        <div className="pt-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${sessionKey}-${phaseIndex}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:rounded-3xl sm:p-6"
            >
              <p className={`${T_LABEL} text-violet-300/70`}>{phaseLabel[phase.type]}</p>

              {phase.type === 'objective' && (
                <>
                  <h3 className={`mt-1.5 ${T_PAGE_TITLE}`}>{phase.data.heading}</h3>
                  <p className={`mt-2.5 ${T_BODY}`}>{phase.data.body}</p>
                  <PhasePreview preview={phase.data.preview} />
                  <ul className={`mt-3 space-y-2 ${T_BODY_SM} text-slate-400`}>
                    {phase.data.bullets.map((b) => (
                      <li key={b} className="flex gap-2 leading-relaxed">
                        <span className="shrink-0 text-violet-300">→</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <PhaseBlocks blocks={phase.data.blocks} aside={phase.data.aside} />
                  <PhaseAction onClick={advance}>Start section</PhaseAction>
                </>
              )}

              {phase.type === 'learn' && (
                <>
                  <h3 className={`mt-1.5 ${T_PAGE_TITLE}`}>{phase.data.heading}</h3>
                  <p className={`mt-2.5 ${T_BODY}`}>{phase.data.body}</p>
                  <PhaseBlocks blocks={phase.data.blocks?.filter((b) => b.placement === 'before')} />
                  <div className="mt-3">
                    <ModuleInteraction
                      key={`${sessionKey}-learn-${phase.data.interaction}`}
                      type={phase.data.interaction}
                    />
                  </div>
                  <PhaseBlocks
                    blocks={phase.data.blocks?.filter((b) => b.placement !== 'before')}
                    aside={phase.data.aside}
                  />
                  <PhaseAction onClick={advance}>
                    {phaseIndex < phases.length - 2 ? 'Continue' : 'Next step'}
                  </PhaseAction>
                </>
              )}

              {phase.type === 'experiment' && (
                <>
                  <h3 className={`mt-1.5 ${T_PAGE_TITLE}`}>{phase.data.heading}</h3>
                  <p className={`mt-2.5 ${T_BODY}`}>{phase.data.body}</p>
                  <PhaseBlocks blocks={phase.data.blocks?.filter((b) => b.placement === 'before')} />
                  <div className="mt-3">
                    <ModuleInteraction
                      key={`${sessionKey}-exp-${phase.data.interaction}`}
                      type={phase.data.interaction}
                    />
                  </div>
                  <PhaseBlocks
                    blocks={phase.data.blocks?.filter((b) => b.placement !== 'before')}
                    aside={phase.data.aside}
                  />
                  <PhaseAction onClick={advance} variant="secondary">
                    Continue to checks
                  </PhaseAction>
                </>
              )}

              {phase.type === 'quiz' && (
                <>
                  <h3 className={`mt-1.5 ${T_PAGE_TITLE}`}>Knowledge checks</h3>
                  <div className="mt-3">
                    <QuizPanel
                      resetKey={sessionKey}
                      questions={phase.data}
                      intro={phase.intro}
                      onComplete={finish}
                    />
                  </div>
                </>
              )}

              {phase.type === 'recap' && (
                <>
                  <h3 className={`mt-1.5 ${T_PAGE_TITLE}`}>{phase.data.heading}</h3>
                  <div className={`mt-3 space-y-3 ${T_BODY}`}>
                    {phase.data.points.map((p) => (
                      <p key={p.label}>
                        <strong className="font-medium text-slate-100">{p.label}:</strong> {p.text}
                      </p>
                    ))}
                  </div>
                  <RecapExtras recap={phase.data} />
                  {phase.data.labCallout && (
                    <div className={`mt-3 rounded-xl border border-violet-300/20 bg-violet-300/[0.06] px-3.5 py-2.5 ${T_BODY_SM} text-violet-100`}>
                      Revisit Guided Lab on the AI home — replay “How are you?” to connect tokens to everyday chat.
                    </div>
                  )}
                  {completed && (
                    <div className={`mt-3 rounded-xl border border-teal-300/20 bg-teal-300/[0.06] px-3.5 py-2.5 ${T_BODY_SM} text-teal-100`}>
                      {isLastBeginner
                        ? 'Beginner course complete! Intermediate modules are coming next.'
                        : `Section ${module.id} saved — next module unlocked on the course map.`}
                    </div>
                  )}
                  <p className={`mt-3 ${T_META}`}>
                    Use the restart button above to replay this module without removing your completion badge.
                  </p>
                  <PhaseAction onClick={onBack}>Back to course map</PhaseAction>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
