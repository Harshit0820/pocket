import { COMPANIES } from './data/companies.js'
import { EXPERIENCE_LEVELS } from './data/glossary.js'
import { TEMPLATES } from './data/templates.js'
import { hydrateQuestion } from './hydrate.js'
import { loadState, saveState } from './storage.js'
import { ExperienceOnboarding } from './components/ExperienceOnboarding.jsx'
import { CompanyPicker } from './components/CompanyPicker.jsx'
import { LessonView } from './components/LessonView.jsx'
import { useEffect, useMemo, useState } from 'react'

export default function App() {
  const [state, setState] = useState(() => loadState())
  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(false)

  const experience = state.experience
  const screen = !experience ? 'onboard' : state.companyId ? 'lesson' : 'home'

  useEffect(() => {
    if (!state.companyId) {
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
  }, [state.companyId])

  const company = useMemo(
    () => COMPANIES.find((c) => c.id === state.companyId),
    [state.companyId],
  )

  function patch(p) {
    setState(saveState(p))
  }

  if (screen === 'onboard') {
    return (
      <ExperienceOnboarding
        levels={EXPERIENCE_LEVELS}
        onPick={(id) => patch({ experience: id })}
      />
    )
  }

  if (screen === 'home') {
    return (
      <CompanyPicker
        companies={COMPANIES}
        experience={experience}
        resumeId={state.lastCompanyId}
        onExperience={() => patch({ experience: undefined })}
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
    />
  )
}
