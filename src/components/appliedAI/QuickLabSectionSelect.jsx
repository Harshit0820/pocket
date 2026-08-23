import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { T_BODY_SM, T_CAPTION, T_LABEL } from '../../ui/typography.js'

const STATUS_CLS = {
  Done: 'text-teal-300',
  Current: 'text-violet-300',
  Unlocked: 'text-violet-200/80',
  Locked: 'text-slate-600',
  Later: 'text-slate-600',
  Soon: 'text-slate-600',
}

export function QuickLabSectionSelect({ options, value, onChange }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const selected = options.find((o) => o.id === value) || options[0]

  useEffect(() => {
    function close(event) {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [])

  function pick(option) {
    if (!option.selectable) return
    onChange(option.id)
    setOpen(false)
  }

  return (
    <div ref={rootRef} className="relative z-30">
      <button
        type="button"
        onClick={() => setOpen((was) => !was)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Quick Lab section: ${selected.step} ${selected.title}`}
        className="flex w-full items-center gap-2 rounded-xl border border-white/12 bg-white/[0.05] px-3 py-2.5 text-left transition hover:border-white/20 hover:bg-white/[0.07]"
      >
        <span className={`${T_CAPTION} tabular-nums text-violet-300/80`}>{selected.step}</span>
        <span className={`min-w-0 flex-1 truncate ${T_BODY_SM} font-medium text-slate-100`}>
          {selected.title}
        </span>
        {selected.isRecommended && selected.selectable && (
          <span className={`${T_CAPTION} shrink-0 text-violet-300`}>Current</span>
        )}
        {!selected.isRecommended && (
          <span className={`${T_CAPTION} shrink-0 ${STATUS_CLS[selected.statusLabel] || 'text-slate-500'}`}>
            {selected.statusLabel}
          </span>
        )}
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="shrink-0 text-[9px] text-slate-500" aria-hidden>
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.14 }}
            role="listbox"
            aria-label="Course Map sections for Quick Lab"
            className="absolute left-0 right-0 top-full z-40 mt-1.5 max-h-[min(18rem,50dvh)] overflow-y-auto rounded-2xl border border-white/12 bg-[#0d1422]/98 p-1.5 shadow-[0_18px_60px_rgba(0,0,0,0.65)] backdrop-blur-xl"
          >
            <div className={`px-3 pb-1.5 pt-2 ${T_CAPTION} uppercase tracking-[0.14em] text-slate-500`}>
              Course Map · modules 00–10
            </div>
            {options.map((option) => {
              const isSelected = option.id === value
              const disabled = !option.selectable
              return (
                <button
                  key={option.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={disabled}
                  disabled={disabled}
                  onClick={() => pick(option)}
                  className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left transition ${
                    disabled
                      ? 'cursor-default opacity-60'
                      : isSelected
                        ? 'bg-violet-300/10'
                        : 'hover:bg-white/[0.06]'
                  }`}
                >
                  <span className={`${T_CAPTION} w-5 shrink-0 tabular-nums text-violet-300/70`}>
                    {option.step}
                  </span>
                  <span
                    className={`min-w-0 flex-1 truncate ${T_BODY_SM} ${
                      isSelected ? 'font-medium text-violet-100' : 'text-slate-200'
                    }`}
                  >
                    {option.title}
                  </span>
                  <span className={`${T_LABEL} shrink-0 ${STATUS_CLS[option.statusLabel] || 'text-slate-500'}`}>
                    {!option.hasLab && option.isFuture ? 'Later' : option.statusLabel}
                  </span>
                  {isSelected && option.selectable && (
                    <span className="shrink-0 text-xs text-violet-300" aria-hidden>
                      ✓
                    </span>
                  )}
                  {disabled && option.status === 'locked' && (
                    <span className={`${T_CAPTION} shrink-0 text-slate-600`} aria-hidden>
                      Locked
                    </span>
                  )}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
