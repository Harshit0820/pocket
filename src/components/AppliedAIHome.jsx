import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { ConfirmDialog } from './ConfirmDialog.jsx'
import { AILevelSelect } from './AILevelSelect.jsx'
import {
  NavActions,
  NavBackButton,
  NavResetButton,
  NavRestartButton,
  NavTitle,
  PocketNavBar,
} from './PocketNav.jsx'
import { AppliedAIModule } from './appliedAI/AppliedAIModule.jsx'
import { AI_TRACKS, LAB_BY_LEVEL, sectionById } from '../data/appliedAICurriculum.js'
import { GUIDED_LAB_META, LAB_STEPS } from '../data/guidedLab.js'
import {
  isBeginnerCourseComplete,
  isBeginnerModule,
  moduleStatus,
  nextBeginnerModule,
  normalizeAiProgress,
} from '../utils/aiProgress.js'
import {
  T_BODY,
  T_BODY_SM,
  T_BTN,
  T_CAPTION,
  T_CARD_TITLE,
  T_LABEL,
  T_META,
  T_PAGE_TITLE,
  T_SECTION_TITLE,
} from '../ui/typography.js'

/*
 * TODO: Section-wise Quick Lab paused — restore by importing QuickLabSectionSelect and
 * QUICK_LAB helpers from guidedLab.js (see commented block there). Component file kept at
 * ./appliedAI/QuickLabSectionSelect.jsx
 */

function GuidedLab() {
  const [activeStep, setActiveStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const step = LAB_STEPS[activeStep]
  const onFirstStep = activeStep === 0
  const onLastStep = activeStep === LAB_STEPS.length - 1

  function move(next) {
    setDirection(next >= activeStep ? 1 : -1)
    setActiveStep(next)
  }

  function replayFromStart() {
    setDirection(-1)
    setActiveStep(0)
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className={T_CARD_TITLE}>{GUIDED_LAB_META.title}</h3>
          <p className={T_META}>{GUIDED_LAB_META.subtitle}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {!onFirstStep && (
            <NavRestartButton
              onClick={replayFromStart}
              ariaLabel="Restart lab from step 1"
              title="Restart lab from step 1"
            />
          )}
          <span className={`${T_META} tabular-nums`}>
            {activeStep + 1}/{LAB_STEPS.length}
          </span>
        </div>
      </div>

      <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
        {LAB_STEPS.map((s, index) => (
          <button
            key={s.title}
            type="button"
            onClick={() => move(index)}
            aria-label={`Lab step ${index + 1}: ${s.title}`}
            aria-current={activeStep === index ? 'step' : undefined}
            className={`h-8 w-8 shrink-0 rounded-full border text-xs transition ${
              activeStep === index
                ? 'border-violet-300 bg-violet-300/15 text-violet-100'
                : 'border-white/10 text-slate-500 hover:border-white/20'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="relative mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#0b1220]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeStep}
            custom={direction}
            initial={{ opacity: 0, x: direction * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -14 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="p-3 sm:p-4"
          >
            <p className={`${T_LABEL} text-violet-300/70`}>{step.title}</p>
            <p className={`mt-1 ${T_CARD_TITLE} text-slate-100`}>{step.headline}</p>
            <p className={`mt-2 ${T_BODY_SM} text-slate-400`}>{step.plain}</p>

            <div className={`mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 ${T_BODY_SM}`}>
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
                <div className={`${T_LABEL} text-slate-500`}>Goes in</div>
                <p className="mt-1 text-slate-300">{step.input}</p>
              </div>
              <div className="rounded-lg border border-violet-300/15 bg-violet-300/[0.05] p-2.5">
                <div className={`${T_LABEL} text-violet-300/60`}>Comes out</div>
                <p className="mt-1 text-slate-300">{step.output}</p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-1">
              {step.flow.map((item, index) => (
                <div key={item} className="contents">
                  <span className={`shrink-0 rounded-md border border-violet-300/15 bg-violet-300/[0.06] px-2 py-1 ${T_CAPTION} text-violet-100`}>
                    {item}
                  </span>
                  {index < step.flow.length - 1 && (
                    <span className="text-xs text-violet-300/40" aria-hidden>
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {step.demo.map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className={`rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 ${T_BODY_SM} text-slate-300`}
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="rounded-lg border border-teal-300/20 bg-teal-300/[0.06] px-3 py-2.5">
                <p className={`${T_LABEL} text-teal-300/80`}>Why this helps</p>
                <p className={`mt-1 ${T_BODY_SM} text-slate-400`}>{step.whyHelps}</p>
              </div>
              <div className="rounded-lg border border-amber-300/20 bg-amber-300/[0.06] px-3 py-2.5">
                <p className={`${T_LABEL} text-amber-300/80`}>What can go wrong</p>
                <p className={`mt-1 ${T_BODY_SM} text-slate-400`}>{step.whatCanGoWrong}</p>
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              {activeStep > 0 && (
                <button
                  type="button"
                  onClick={() => move(activeStep - 1)}
                  className={`rounded-full border border-white/12 px-3 py-2 ${T_BTN} font-normal text-slate-400`}
                >
                  Back
                </button>
              )}
              {!onLastStep ? (
                <button
                  type="button"
                  onClick={() => move(activeStep + 1)}
                  className={`flex-1 rounded-full bg-violet-300 py-2.5 ${T_BTN} text-slate-950`}
                >
                  Next step
                </button>
              ) : (
                <button
                  type="button"
                  onClick={replayFromStart}
                  aria-label="Replay lab from start"
                  className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-violet-300/35 bg-violet-300/15 py-2.5 ${T_BTN} text-violet-100`}
                >
                  <motion.span
                    key={`replay-${activeStep}`}
                    initial={{ rotate: -180, opacity: 0.5 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.35 }}
                    aria-hidden
                    className="text-sm leading-none"
                  >
                    ↻
                  </motion.span>
                  Replay from start
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function SectionCard({ section, status, onOpen, beginnerActive }) {
  const labels = {
    completed: { text: 'Done', cls: 'text-teal-300' },
    available: { text: 'Start', cls: 'text-violet-300' },
    locked: { text: 'Locked', cls: 'text-slate-600' },
    preview: { text: beginnerActive ? 'Soon' : 'Beginner', cls: 'text-slate-600' },
    'level-locked': { text: 'Beginner', cls: 'text-slate-500' },
  }
  const badge = labels[status] || labels.preview
  const disabled = status === 'locked' || status === 'preview' || status === 'level-locked'

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onOpen(section.id)}
      className={`w-full rounded-xl border px-3 py-2.5 text-left transition ${
        status === 'available'
          ? 'border-violet-300/30 bg-violet-300/[0.07] hover:bg-violet-300/10'
          : status === 'completed'
            ? 'border-teal-300/20 bg-teal-300/[0.04] hover:bg-teal-300/[0.07]'
            : 'cursor-default border-white/8 bg-white/[0.02] opacity-70'
      }`}
    >
      <div className="flex items-center gap-2">
        <span className={`${T_CAPTION} tabular-nums text-violet-300/80`}>{section.step}</span>
        <span className={`${T_LABEL} ml-auto ${badge.cls}`}>{badge.text}</span>
      </div>
      <p className={`mt-0.5 ${T_BODY_SM} font-medium text-slate-200`}>{section.title}</p>
    </button>
  )
}

function effectiveModuleStatus(id, completed, beginnerActive) {
  if (!beginnerActive && isBeginnerModule(id)) return 'level-locked'
  return moduleStatus(id, completed)
}

export function AppliedAIHome({ onBack, aiLevel, onAiLevel, aiProgress, onAiProgress }) {
  const [openSection, setOpenSection] = useState(null)
  const [confirmResetCourse, setConfirmResetCourse] = useState(false)
  const [labResetKey, setLabResetKey] = useState(0)
  const progress = useMemo(() => normalizeAiProgress(aiProgress), [aiProgress])
  const completed = progress.completed
  const beginnerActive = aiLevel === 'beginner'
  const beginnerDone = isBeginnerCourseComplete(completed)
  const nextModule = nextBeginnerModule(completed)
  const hasAiProgress = Object.keys(completed).length > 0
  const labMeta = LAB_BY_LEVEL[aiLevel] || LAB_BY_LEVEL.beginner

  function markComplete(sectionId) {
    onAiProgress({
      ...progress,
      completed: { ...completed, [sectionId]: true },
    })
  }

  function resetCourseProgress() {
    onAiProgress({ completed: {} })
    setConfirmResetCourse(false)
    setOpenSection(null)
    setLabResetKey((k) => k + 1)
  }

  if (openSection && isBeginnerModule(openSection) && beginnerActive) {
    return (
      <AppliedAIModule
        moduleId={openSection}
        completed={Boolean(completed[openSection])}
        isLastBeginner={openSection === '04'}
        onBack={() => setOpenSection(null)}
        onComplete={() => markComplete(openSection)}
      />
    )
  }

  return (
    <main className="min-h-dvh pb-14">
      <PocketNavBar maxWidth="max-w-2xl">
        <NavBackButton onClick={onBack} label="Back to subjects" />
        <NavTitle>Applied AI</NavTitle>
        <NavActions>
          <NavResetButton
            disabled={!hasAiProgress || !beginnerActive}
            onClick={() => hasAiProgress && beginnerActive && setConfirmResetCourse(true)}
            ariaLabel="Reset AI progress"
            title={
              !beginnerActive
                ? 'Switch to Beginner to reset course progress'
                : hasAiProgress
                  ? 'Reset AI progress'
                  : 'No AI progress to reset'
            }
          />
          <AILevelSelect value={aiLevel} onChange={onAiLevel} compact />
        </NavActions>
      </PocketNavBar>

      <div className="mx-auto max-w-2xl space-y-6 px-3 pt-4 sm:px-4">
        <div>
          <h2 className={T_PAGE_TITLE}>Applied AI</h2>
          <p className={`mt-1 ${T_META}`}>
            {beginnerActive ? 'Beginner course · modules 00–04' : `${labMeta.title} · coming next`}
          </p>
        </div>

        {!beginnerActive && (
          <div className="rounded-2xl border border-dashed border-white/12 bg-white/[0.02] px-4 py-3">
            <p className={`${T_CARD_TITLE} text-slate-200`}>{labMeta.title} is not available yet</p>
            <p className={`mt-1 ${T_BODY_SM} text-slate-400`}>
              Intermediate and Advanced tracks are coming later. Switch to Beginner to study modules 00–04 — your Beginner progress is preserved when you switch back.
            </p>
          </div>
        )}

        {beginnerActive && beginnerDone && (
          <div className="rounded-2xl border border-teal-300/25 bg-teal-300/[0.07] px-4 py-3">
            <p className={`${T_CARD_TITLE} text-teal-100`}>Beginner course complete</p>
            <p className={`mt-1 ${T_BODY_SM} text-slate-400`}>
              You finished modules 00–04. Intermediate depth and labs are next — revisit any module anytime.
            </p>
          </div>
        )}

        {beginnerActive && !beginnerDone && nextModule && (
          <p className={T_META}>
            Up next: <span className="text-violet-200">{sectionById[nextModule]?.title}</span>
          </p>
        )}

        <section>
          <div className="mb-2 flex items-baseline justify-between">
            <h2 className={T_SECTION_TITLE}>Guided Lab</h2>
            <span className={T_CAPTION}>one example</span>
          </div>
          {beginnerActive ? (
            <GuidedLab key={labResetKey} />
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-3">
              <p className={T_CARD_TITLE}>{labMeta.title}</p>
              <p className={`${T_META} mt-1`}>{labMeta.subtitle}</p>
            </div>
          )}
        </section>

        <section>
          <div className="mb-2 flex items-baseline justify-between gap-2">
            <h2 className={T_SECTION_TITLE}>Course Map</h2>
            <span className={T_CAPTION}>full path</span>
          </div>

          <div className="space-y-5">
            {AI_TRACKS.map((track) => (
              <div key={track.id}>
                <h3 className={`${T_LABEL} mb-2`}>{track.title}</h3>
                <div className="grid gap-2">
                  {track.sectionIds.map((id) => {
                    const section = sectionById[id]
                    if (!section) return null
                    return (
                      <SectionCard
                        key={section.id}
                        section={section}
                        status={effectiveModuleStatus(id, completed, beginnerActive)}
                        beginnerActive={beginnerActive}
                        onOpen={setOpenSection}
                      />
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <ConfirmDialog
        open={confirmResetCourse}
        title="Reset AI course progress?"
        message="All completed Beginner modules (00–04) will be cleared. Your AI level stays the same. HLD progress is not affected."
        confirmLabel="Reset course"
        onConfirm={resetCourseProgress}
        onCancel={() => setConfirmResetCourse(false)}
        destructive
      />
    </main>
  )
}
