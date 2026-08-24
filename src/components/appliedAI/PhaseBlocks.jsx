import { useState } from 'react'
import { T_BODY_SM, T_CAPTION, T_LABEL } from '../../ui/typography.js'

const BLOCK_STYLES = {
  example: {
    label: 'Example',
    border: 'border-teal-300/20 bg-teal-300/[0.06]',
    labelCls: 'text-teal-300/80',
  },
  why: {
    label: 'Why this matters',
    border: 'border-violet-300/20 bg-violet-300/[0.06]',
    labelCls: 'text-violet-300/80',
  },
  misconception: {
    label: 'Common mix-up',
    border: 'border-amber-300/20 bg-amber-300/[0.06]',
    labelCls: 'text-amber-300/80',
  },
  tip: {
    label: 'Remember',
    border: 'border-white/[0.08] bg-white/[0.03]',
    labelCls: 'text-violet-200/90',
  },
  connection: {
    label: 'Next up',
    border: 'border-violet-300/15 bg-violet-300/[0.05]',
    labelCls: 'text-violet-300/70',
  },
  behind: {
    label: 'Behind the scenes',
    border: 'border-white/10 bg-white/[0.03]',
    labelCls: 'text-slate-500',
  },
}

function TraceRow({ trace }) {
  if (!trace) return null
  return (
    <div className={`mt-1.5 flex flex-wrap items-center gap-1 ${T_BODY_SM}`}>
      <span className="rounded-md border border-white/10 bg-white/[0.05] px-2 py-0.5 font-mono text-slate-200">
        {trace.input}
      </span>
      <span className="text-violet-300/45" aria-hidden>
        →
      </span>
      <span className="rounded-md border border-teal-300/20 bg-teal-300/[0.08] px-2 py-0.5 font-mono text-teal-100">
        {trace.operation}
      </span>
      <span className="text-violet-300/45" aria-hidden>
        →
      </span>
      <span className="rounded-md border border-amber-300/20 bg-amber-300/[0.08] px-2 py-0.5 font-mono text-amber-100">
        {trace.output}
      </span>
    </div>
  )
}

function DeeperBlock({ body }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-2 text-left ${T_LABEL} text-slate-400`}
      >
        <span>Go deeper</span>
        <span className="text-[10px] text-slate-500" aria-hidden>
          {open ? '▴' : '▾'}
        </span>
      </button>
      {open && <p className={`mt-2 ${T_BODY_SM} text-slate-400`}>{body}</p>}
    </div>
  )
}

function ContentBlock({ block }) {
  if (block.kind === 'deeper') {
    return <DeeperBlock body={block.body} />
  }

  const style = BLOCK_STYLES[block.kind] || BLOCK_STYLES.tip
  return (
    <div className={`rounded-xl border px-3 py-2.5 ${style.border}`}>
      <p className={`${T_LABEL} ${style.labelCls}`}>{block.label || style.label}</p>
      {block.trace && <TraceRow trace={block.trace} />}
      {block.body && <p className={`mt-1 ${T_BODY_SM} text-slate-400`}>{block.body}</p>}
      {block.tags?.length > 0 && (
        <div className="mt-1.5 flex flex-wrap gap-1">
          {block.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 ${T_CAPTION} text-slate-400`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export function stripRememberPrefix(text) {
  return String(text).replace(/^Remember:\s*/i, '').trim()
}

/** Render data-driven learning blocks for any module phase. */
export function PhaseBlocks({ blocks, aside }) {
  const items = [...(blocks || [])]
  if (aside) {
    items.push({ kind: 'tip', body: stripRememberPrefix(aside) })
  }
  if (items.length === 0) return null

  return (
    <div className="mt-3 space-y-2">
      {items.map((block, i) => (
        <ContentBlock key={`${block.kind}-${i}`} block={block} />
      ))}
    </div>
  )
}

export function PhasePreview({ preview }) {
  if (!preview) return null
  const { trace, shapes, outcome } = preview
  return (
    <div className="mt-3 rounded-xl border border-violet-300/15 bg-violet-300/[0.05] px-3 py-2.5">
      {preview.title && <p className={`${T_LABEL} text-violet-300/70`}>{preview.title}</p>}
      {trace && <TraceRow trace={trace} />}
      {shapes?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {shapes.map((shape) => (
            <span
              key={shape}
              className={`rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 ${T_CAPTION} text-slate-400`}
            >
              {shape}
            </span>
          ))}
        </div>
      )}
      {outcome && (
        <p className={`mt-2 ${T_BODY_SM} text-slate-400`}>
          <span className="font-medium text-violet-200/90">You will: </span>
          {outcome}
        </p>
      )}
    </div>
  )
}

export function RecapExtras({ recap }) {
  if (!recap?.canExplain?.length && !recap?.nextConnection) return null
  return (
    <div className="mt-3 space-y-2">
      {recap.canExplain?.length > 0 && (
        <div className="rounded-xl border border-teal-300/20 bg-teal-300/[0.06] px-3 py-2.5">
          <p className={`${T_LABEL} text-teal-300/80`}>You can now explain</p>
          <ul className={`mt-1.5 space-y-1 ${T_BODY_SM} text-slate-400`}>
            {recap.canExplain.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="shrink-0 text-teal-300/70">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      {recap.nextConnection && (
        <div className="rounded-xl border border-violet-300/15 bg-violet-300/[0.05] px-3 py-2.5">
          <p className={`${T_LABEL} text-violet-300/70`}>Connects forward</p>
          <p className={`mt-1 ${T_BODY_SM} text-slate-400`}>{recap.nextConnection}</p>
        </div>
      )}
    </div>
  )
}
