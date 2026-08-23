import { CompanyLogo } from './CompanyLogo.jsx'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { LevelSelect } from './LevelSelect.jsx'
import { NavActions, NavBackButton, NavTitle, PocketNavBar } from './PocketNav.jsx'
import {
  T_BODY_SM,
  T_CAPTION,
  T_LABEL,
  T_META,
  T_PAGE_TITLE,
} from '../ui/typography.js'

const CATS = ['All', 'Streaming', 'Marketplace', 'Social', 'Messaging', 'Payments', 'Storage', 'Search']

export function CompanyPicker({
  companies,
  experience,
  resumeId,
  onPick,
  onExperience,
  onClearResume,
  onSubjects,
}) {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')
  const filtered = useMemo(() => {
    return companies.filter((c) => {
      if (cat !== 'All' && c.category !== cat) return false
      const s = `${c.name} ${c.pitch} ${c.category}`.toLowerCase()
      return s.includes(q.trim().toLowerCase())
    })
  }, [companies, q, cat])

  const resume = companies.find((c) => c.id === resumeId)

  return (
    <div className="min-h-dvh pb-16">
      <PocketNavBar maxWidth="max-w-5xl">
        <NavBackButton onClick={onSubjects} label="Back to subjects" />
        <NavTitle>System Design</NavTitle>
        <NavActions>
          <LevelSelect value={experience} onChange={onExperience} compact />
        </NavActions>
      </PocketNavBar>

      <div className="max-w-5xl mx-auto px-3 sm:px-4 pt-4">
        <h2 className={T_PAGE_TITLE}>High-level design</h2>
        <p className={`mt-1 ${T_META}`}>Pick a product to explore its architecture.</p>
      </div>

      <div className="max-w-5xl mx-auto px-3 sm:px-4 pt-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search a product…"
          className={`w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 outline-none focus:border-teal-300/40 ${T_BODY_SM}`}
        />
        <div className="mt-2.5 flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
          {CATS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full border px-3 py-1 text-xs ${
                cat === c ? 'border-teal-300 bg-teal-300 text-slate-900' : 'border-white/10 text-slate-400'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-3 sm:px-4 mt-4">
        {resume && (
          <div className="relative w-full mb-4 rounded-2xl border border-teal-300/30 bg-teal-300/10">
            <button
              onClick={() => onPick(resume.id)}
              className="w-full p-4 pr-12 text-left"
            >
              <div className="flex items-center gap-3">
                <CompanyLogo company={resume} size={36} />
                <div>
                  <div className={`${T_LABEL} text-teal-200/90`}>Resume</div>
                  <div className="text-base font-medium text-slate-100">{resume.name}</div>
                  <div className={`${T_BODY_SM} text-slate-400`}>{resume.pitch}</div>
                </div>
              </div>
            </button>
            <button
              type="button"
              aria-label="Dismiss resume"
              onClick={(e) => {
                e.stopPropagation()
                onClearResume?.()
              }}
              className="absolute top-3 right-3 h-8 w-8 rounded-full border border-white/15 text-white/70"
            >
              ×
            </button>
          </div>
        )}

        <div className={`rounded-2xl border border-dashed border-white/15 p-4 mb-4 ${T_BODY_SM} text-slate-400`}>
          <span className="text-white/80 font-medium">DSA</span> — later. This version is product HLD only.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((c, i) => (
            <motion.button
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i, 12) * 0.03 }}
              onClick={() => onPick(c.id)}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left hover:border-white/25 active:scale-[0.99]"
              style={{ boxShadow: `0 0 40px ${c.accent}22` }}
            >
              <div className="flex items-center gap-3">
                <CompanyLogo company={c} />
                <div>
                  <div className="text-[15px] font-medium text-slate-100">{c.name}</div>
                  <div className={`${T_CAPTION} uppercase tracking-wide`}>{c.category}</div>
                </div>
              </div>
              <p className={`${T_BODY_SM} text-slate-400 mt-3`}>{c.pitch}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
