import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { EXPERIENCE_LEVELS } from '../data/glossary.js'

export function LevelSelect({ value, onChange, compact = false }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const current = EXPERIENCE_LEVELS.find((level) => level.id === value) || EXPERIENCE_LEVELS[0]
  const shortNames = {
    starter: 'Starter',
    interview: 'Interview',
    backend: 'Backend',
  }

  useEffect(() => {
    function close(event) {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [])

  return (
    <div ref={rootRef} className="relative z-50">
      <button
        type="button"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-2.5 py-1.5 text-xs text-slate-200 shadow-sm transition hover:border-white/20 hover:bg-white/[0.08]"
      >
        <motion.span
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 2.8, repeat: Infinity }}
          className="h-1.5 w-1.5 rounded-full bg-teal-300"
        />
        {!compact && <span className="text-slate-500">Level</span>}
        <span className="font-medium">{shortNames[current.id]}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          className="text-[9px] text-slate-500"
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 8, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.14 }}
            role="listbox"
            className="absolute right-0 top-full w-64 overflow-hidden rounded-2xl border border-white/12 bg-[#0d1422]/98 p-1.5 shadow-[0_18px_60px_rgba(0,0,0,0.65)] backdrop-blur-xl"
          >
            <div className="px-3 pb-1.5 pt-2 text-[9px] uppercase tracking-[0.18em] text-slate-500">
              Explanation style
            </div>
            {EXPERIENCE_LEVELS.map((level) => {
              const selected = level.id === value
              return (
                <button
                  key={level.id}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(level.id)
                    setOpen(false)
                  }}
                  className={`w-full rounded-xl px-3 py-2.5 text-left transition ${
                    selected ? 'bg-teal-300/10' : 'hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`text-sm font-medium ${selected ? 'text-teal-100' : 'text-slate-200'}`}>
                      {level.title}
                    </span>
                    {selected && <span className="text-xs text-teal-300">✓</span>}
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-[10px] text-slate-500">{level.blurb}</p>
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
