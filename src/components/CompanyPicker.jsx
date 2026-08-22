import { CompanyLogo } from './CompanyLogo.jsx'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const CATS = ['All', 'Streaming', 'Marketplace', 'Social', 'Messaging', 'Payments', 'Storage', 'Search']

export function CompanyPicker({ companies, experience, resumeId, onPick, onExperience, onClearResume }) {
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
      <header className="sticky top-0 z-20 backdrop-blur-xl bg-[#070b14]/80 border-b border-white/5 px-4 pt-4 pb-3">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div>
            <p className="text-teal-300 tracking-[0.25em] text-[10px] uppercase">Pocket</p>
            <h1 className="text-xl font-semibold">High-level design</h1>
          </div>
          <button onClick={onExperience} className="text-xs text-slate-400 border border-white/10 rounded-full px-3 py-1">
            {experience}
          </button>
        </div>
        <div className="max-w-5xl mx-auto mt-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search a product…"
            className="w-full rounded-2xl bg-white/8 border border-white/10 px-4 py-3 outline-none focus:border-teal-300/60"
          />
        </div>
        <div className="max-w-5xl mx-auto mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs border ${
                cat === c ? 'bg-teal-300 text-slate-900 border-teal-300' : 'border-white/10 text-slate-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 mt-4">
        {resume && (
          <div className="relative w-full mb-4 rounded-2xl border border-teal-300/30 bg-teal-300/10">
            <button
              onClick={() => onPick(resume.id)}
              className="w-full p-4 pr-12 text-left"
            >
              <div className="flex items-center gap-3">
                <CompanyLogo company={resume} size={36} />
                <div>
                  <div className="text-xs text-teal-200 uppercase tracking-wider">Resume</div>
                  <div className="text-lg font-medium">{resume.name}</div>
                  <div className="text-slate-400 text-sm">{resume.pitch}</div>
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

        <div className="rounded-2xl border border-dashed border-white/15 p-4 mb-4 text-slate-400 text-sm">
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
                  <div className="font-medium">{c.name}</div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wide">{c.category}</div>
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-3">{c.pitch}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
