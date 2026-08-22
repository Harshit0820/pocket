import { useMemo, useState } from 'react'
import { FlowMap } from './FlowMap.jsx'
import { TutorOverlay } from './TutorOverlay.jsx'
import { CompanyLogo } from './CompanyLogo.jsx'
import { questionsForGate } from '../data/glossary.js'

function pickQuestions(all, stage, count) {
  const pool = all.filter((q) => q.stage === stage)
  const shuffled = [...pool].sort((a, b) => (a.seed % 1009) - (b.seed % 1009))
  const picked = []
  const seen = new Set()
  for (const q of shuffled) {
    const key = `${q.tid}-${q.variant}`
    if (seen.has(key)) continue
    seen.add(key)
    picked.push(q)
    if (picked.length >= count) break
  }
  if (picked.length < count) {
    for (const q of shuffled) {
      if (picked.includes(q)) continue
      picked.push(q)
      if (picked.length >= count) break
    }
  }
  return picked.slice(0, count)
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
}) {
  const [selected, setSelected] = useState(null)
  const [tutorOpen, setTutorOpen] = useState(false)
  const [qIndex, setQIndex] = useState(0)
  const [gateDone, setGateDone] = useState(false)

  const tplMap = useMemo(() => Object.fromEntries(templates.map((t) => [t.id, t])), [templates])

  const unlocked = useMemo(() => {
    const set = new Set()
    if (!lesson) return set
    for (let i = 0; i <= stageIndex; i++) {
      for (const id of lesson.stages[i]?.unlockNodeIds || []) set.add(id)
    }
    return set
  }, [lesson, stageIndex])

  const gateQs = useMemo(() => {
    if (!lesson) return []
    const nextStage = Math.min(stageIndex + 1, lesson.stages.length - 1)
    const stageForQs = stageIndex >= lesson.stages.length - 1 ? stageIndex : nextStage
    return pickQuestions(lesson.questions, stageForQs, questionsForGate(experience, stageIndex)).map((raw) =>
      hydrateQuestion(raw, tplMap[raw.tid], company, experience),
    )
  }, [lesson, stageIndex, company, experience, hydrateQuestion, tplMap])

  const done = lesson && stageIndex >= lesson.stages.length - 1 && unlocked.size >= (lesson.nodes?.length || 0)

  if (loading || !lesson || !company) {
    return (
      <div className="min-h-dvh grid place-items-center text-slate-400">
        Opening {company?.name || 'lesson'}…
      </div>
    )
  }

  const progress = (stageIndex + 1) / lesson.stages.length
  const current = gateQs[qIndex]

  function openGate() {
    setQIndex(0)
    setGateDone(false)
    setTutorOpen(true)
  }

  function onAnswer(ok) {
    if (!ok) return
    if (qIndex < gateQs.length - 1) {
      setQIndex((i) => i + 1)
    } else {
      setGateDone(true)
    }
  }

  function finishGate() {
    setTutorOpen(false)
    setGateDone(false)
    onStage(Math.min(stageIndex + 1, lesson.stages.length - 1))
  }

  const canContinue = stageIndex < lesson.stages.length - 1

  return (
    <div className="min-h-dvh pb-10">
      <header className="sticky top-0 z-20 backdrop-blur-xl bg-[#070b14]/85 border-b border-white/5 px-4 py-3 flex items-center gap-3">
        <button onClick={onHome} className="text-sm text-slate-400">
          Back
        </button>
        <CompanyLogo company={company} size={32} />
        <div className="flex-1">
          <div className="font-medium">{company.name}</div>
          <div className="h-1.5 mt-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-teal-300" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
        <span className="text-xs text-slate-500">
          {stageIndex + 1}/{lesson.stages.length}
        </span>
      </header>

      <p className="px-5 pt-4 text-slate-300 text-sm leading-relaxed max-w-md mx-auto">
        {lesson.stages[stageIndex].blurb}
      </p>

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
          <p className="text-teal-200 font-medium">Map complete. Tap any box to revise.</p>
          <button onClick={onHome} className="mt-3 text-sm underline text-slate-400">
            Pick another product
          </button>
        </div>
      )}

      <TutorOverlay
        open={tutorOpen}
        question={current}
        index={qIndex}
        total={gateQs.length}
        onAnswer={onAnswer}
        waiting={gateDone}
        onCloseReady={finishGate}
        onCloseQuiz={() => {
          setTutorOpen(false)
          setGateDone(false)
        }}
        onLeaveLesson={() => {
          setTutorOpen(false)
          onHome()
        }}
      />
    </div>
  )
}
