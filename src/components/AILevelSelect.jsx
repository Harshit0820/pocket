import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export const AI_LEVELS = [
  {
    id: 'beginner',
    title: 'Beginner',
    blurb: 'Plain language, visual steps, no assumed coding background.',
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    blurb: 'More technical vocabulary and shorter explanations.',
  },
  {
    id: 'advanced',
    title: 'Advanced',
    blurb: 'Systems thinking, trade-offs, and production details.',
  },
]

export function AILevelSelect({ value, onChange, compact = false }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const current = AI_LEVELS.find((level) => level.id === value) || AI_LEVELS[0]

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
          className="h-1.5 w-1.5 rounded-full bg-violet-300"
        />
        {!compact && <span className="text-slate-500">AI level</span>}
        <span className="font-medium">{current.title}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-[9px] text-slate-500">
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
              Explanation depth
            </div>
            {AI_LEVELS.map((level) => {
              const selected = level.id === value
              const comingSoon = level.id !== 'beginner'
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
                    selected ? 'bg-violet-300/10' : 'hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`text-sm font-medium ${selected ? 'text-violet-100' : 'text-slate-200'}`}
                    >
                      {level.title}
                    </span>
                    {comingSoon && !selected && (
                      <span className="text-[10px] text-slate-500">Soon</span>
                    )}
                    {selected && <span className="text-xs text-violet-300">✓</span>}
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-[10px] text-slate-500">
                    {comingSoon && level.id !== value
                      ? `${level.blurb} Available in a future update.`
                      : level.blurb}
                  </p>
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
