import { useEffect, useMemo, useState } from 'react'
import { FlowMap } from './FlowMap.jsx'
import { TutorOverlay } from './TutorOverlay.jsx'
import { questionsForGate } from '../data/glossary.js'
import { LevelSelect } from './LevelSelect.jsx'
import { ConfirmDialog } from './ConfirmDialog.jsx'
import {
  NavActions,
  NavBackButton,
  NavResetButton,
  NavTitle,
  POCKET_NAV_HEIGHT,
  PocketNavBar,
} from './PocketNav.jsx'
import {
  T_BODY,
  T_BODY_SM,
  T_DESC_TITLE,
  T_META,
} from '../ui/typography.js'

function shuffle(list) {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickQuestions(all, stage, count, templateMap) {
  const pool = shuffle(all.filter((q) => q.stage === stage))
  const unique = []
  const seen = new Set()
  for (const q of pool) {
    if (seen.has(q.tid)) continue
    seen.add(q.tid)
    unique.push(q)
  }
  const scenarios = shuffle(
    unique.filter((q) => templateMap[q.tid]?.kinds?.includes('scene')),
  ).slice(0, 2)
  const concepts = shuffle(unique.filter((q) => !scenarios.includes(q)))
  return shuffle([...scenarios, ...concepts.slice(0, count - scenarios.length)])
}

export function LessonView({
  loading,
  lesson,
  company,
  experience,
  templates,
  hydrateQuestion,
  stageIndex,
  onStage,
  onHome,
  onExperience,
  onResetProgress,
}) {
  const [selected, setSelected] = useState(null)
  const [quiz, setQuiz] = useState([])
  const [tutorOpen, setTutorOpen] = useState(false)
  const [qIndex, setQIndex] = useState(0)
  const [confirmReset, setConfirmReset] = useState(false)

  useEffect(() => {
    setSelected(null)
  }, [stageIndex])

  function clearLessonUi() {
    setSelected(null)
    setTutorOpen(false)
    setQuiz([])
    setQIndex(0)
  }

  function confirmLessonReset() {
    clearLessonUi()
    onResetProgress()
    setConfirmReset(false)
  }

  const tplMap = useMemo(() => Object.fromEntries(templates.map((t) => [t.id, t])), [templates])

  const unlocked = useMemo(() => {
    const set = new Set()
    if (!lesson) return set
    for (let i = 0; i <= stageIndex; i++) {
      for (const id of lesson.stages[i]?.unlockNodeIds || []) set.add(id)
    }
    return set
  }, [lesson, stageIndex])

  const done = lesson && stageIndex >= lesson.stages.length - 1 && unlocked.size >= (lesson.nodes?.length || 0)

  if (loading || !lesson || !company) {
    return (
      <div className="min-h-dvh grid place-items-center text-slate-400">
        Opening {company?.name || 'lesson'}…
      </div>
    )
  }

  const current = quiz[qIndex]
  const progress = (stageIndex + 1) / lesson.stages.length

  function openGate() {
    const nextStage = Math.min(stageIndex + 1, lesson.stages.length - 1)
    const stageForQs = stageIndex >= lesson.stages.length - 1 ? stageIndex : nextStage
    const raws = pickQuestions(
      lesson.questions,
      stageForQs,
      questionsForGate(experience, stageIndex),
      tplMap,
    )
    setQuiz(raws.map((raw) => hydrateQuestion(raw, tplMap[raw.tid], company, experience)))
    setQIndex(0)
    setTutorOpen(true)
  }

  function onAnswer(ok) {
    if (!ok) return
    if (qIndex < quiz.length - 1) {
      setQIndex((i) => i + 1)
    }
  }

  function finishGate() {
    setTutorOpen(false)
    onStage(Math.min(stageIndex + 1, lesson.stages.length - 1))
  }

  const canContinue = stageIndex < lesson.stages.length - 1

  const stageBlurb = lesson.stages[stageIndex].blurb

  return (
    <div className="min-h-dvh pb-10">
      <PocketNavBar maxWidth="max-w-3xl">
        <NavBackButton onClick={onHome} label="Back to products" />
        <NavTitle>{company.name}</NavTitle>
        <NavActions>
          <NavResetButton
            onClick={() => setConfirmReset(true)}
            ariaLabel="Reset System Design progress"
            title="Reset System Design progress"
          />
          <LevelSelect value={experience} onChange={onExperience} compact />
        </NavActions>
      </PocketNavBar>

      <div className="max-w-3xl mx-auto px-3 sm:px-4 pt-3">
        <div className="flex items-center gap-3">
          <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-teal-300 transition-[width] duration-300"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className={`shrink-0 tabular-nums ${T_META}`}>
            Stage {stageIndex + 1}/{lesson.stages.length}
          </span>
        </div>
      </div>

      <div className="sticky z-10 px-3 pt-2 pb-1" style={{ top: POCKET_NAV_HEIGHT }}>
        <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-[#0b1220]/88 px-4 py-3 shadow-[0_8px_28px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          {selected ? (
            <>
              <p className={T_DESC_TITLE}>{selected.title}</p>
              <p className={`mt-1.5 max-h-20 sm:max-h-24 overflow-y-auto ${T_BODY}`}>
                {selected.story || selected.blurb}
              </p>
            </>
          ) : (
            <p className={T_BODY}>{stageBlurb}</p>
          )}
        </div>
      </div>

      <FlowMap
        nodes={lesson.nodes}
        edges={lesson.edges}
        unlocked={unlocked}
        selectedId={selected?.id}
        onSelect={setSelected}
        accent={company.accent}
        gate={canContinue ? openGate : null}
      />

      {done && (
        <div className="max-w-md mx-auto px-4 text-center">
          <p className="text-teal-200 text-base font-medium">Map complete. Tap any box to revise.</p>
          <button onClick={onHome} className={`mt-3 underline ${T_BODY_SM} text-slate-400`}>
            Pick another product
          </button>
        </div>
      )}

      <TutorOverlay
        open={tutorOpen}
        question={current}
        index={qIndex}
        total={quiz.length}
        onAnswer={onAnswer}
        onCloseReady={finishGate}
        onCloseQuiz={() => {
          setTutorOpen(false)
        }}
        onLeaveLesson={() => {
          setTutorOpen(false)
          onHome()
        }}
      />

      <ConfirmDialog
        open={confirmReset}
        title="Reset this lesson?"
        message={`Start ${company.name} from stage 1 again. Your unlocked map progress for this product will be cleared.`}
        confirmLabel="Reset lesson"
        onConfirm={confirmLessonReset}
        onCancel={() => setConfirmReset(false)}
        destructive
      />
    </div>
  )
}
