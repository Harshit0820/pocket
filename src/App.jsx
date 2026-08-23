import { COMPANIES } from './data/companies.js'
import { TEMPLATES } from './data/templates.js'
import { hydrateQuestion } from './hydrate.js'
import { normalizeAiProgress } from './utils/aiProgress.js'
import { loadState, saveState } from './storage.js'
import { CompanyPicker } from './components/CompanyPicker.jsx'
import { LessonView } from './components/LessonView.jsx'
import { SubjectPicker } from './components/SubjectPicker.jsx'
import { AppliedAIHome } from './components/AppliedAIHome.jsx'
import { useEffect, useMemo, useState } from 'react'

export default function App() {
  const [state, setState] = useState(() => loadState())
  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(false)

  const experience = state.experience || 'starter'
  const subject = state.subject
  const screen = !subject
    ? 'subjects'
    : subject === 'applied-ai'
      ? 'applied-ai'
      : state.companyId
        ? 'lesson'
        : 'home'

  useEffect(() => {
    if (subject !== 'hld' || !state.companyId) {
      setLesson(null)
      return
    }
    let cancelled = false
    setLoading(true)
    fetch(`${import.meta.env.BASE_URL}data/${state.companyId}.json`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setLesson(data)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [state.companyId, subject])

  const company = useMemo(
    () => COMPANIES.find((c) => c.id === state.companyId),
    [state.companyId],
  )

  function patch(p) {
    setState(saveState(p))
  }

  if (screen === 'subjects') {
    return (
      <SubjectPicker
        onPick={(subject) => patch({ subject, companyId: undefined })}
      />
    )
  }

  if (screen === 'applied-ai') {
    return (
      <AppliedAIHome
        onBack={() => patch({ subject: undefined })}
        aiLevel={state.aiLevel || 'beginner'}
        onAiLevel={(aiLevel) => patch({ aiLevel })}
        aiProgress={normalizeAiProgress(state.aiProgress)}
        onAiProgress={(aiProgress) => patch({ aiProgress: normalizeAiProgress(aiProgress) })}
      />
    )
  }

  if (screen === 'home') {
    return (
      <CompanyPicker
        companies={COMPANIES}
        experience={experience}
        resumeId={state.lastCompanyId}
        onExperience={(experience) => patch({ experience })}
        onSubjects={() => patch({ subject: undefined })}
        onClearResume={() => patch({ lastCompanyId: undefined, companyId: undefined })}
        onPick={(id) =>
          patch({
            companyId: id,
            lastCompanyId: id,
            stageIndex: state.progress?.[id] || 0,
          })
        }
      />
    )
  }

  return (
    <LessonView
      loading={loading}
      lesson={lesson}
      company={company}
      experience={experience}
      templates={TEMPLATES}
      hydrateQuestion={hydrateQuestion}
      stageIndex={state.stageIndex || 0}
      onStage={(stageIndex) =>
        patch({
          stageIndex,
          progress: { ...(state.progress || {}), [state.companyId]: stageIndex },
        })
      }
      onHome={() => patch({ companyId: undefined, lastCompanyId: state.companyId })}
      onExperience={(experience) => patch({ experience })}
      onResetProgress={() =>
        patch({
          stageIndex: 0,
          progress: { ...(state.progress || {}), [state.companyId]: 0 },
        })
      }
    />
  )
}
