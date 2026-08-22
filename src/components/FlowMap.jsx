import { motion } from 'framer-motion'

const KIND = {
  client: { bar: '#38bdf8', icon: '📱', from: 'from-sky-400/25' },
  api: { bar: '#5eead4', icon: '🚪', from: 'from-teal-300/25' },
  auth: { bar: '#fbbf24', icon: '🔐', from: 'from-amber-300/25' },
  service: { bar: '#a78bfa', icon: '⚙️', from: 'from-violet-400/25' },
  cache: { bar: '#f472b6', icon: '⚡', from: 'from-pink-400/25' },
  db: { bar: '#fb923c', icon: '🗄️', from: 'from-orange-400/25' },
  queue: { bar: '#a3e635', icon: '📬', from: 'from-lime-300/25' },
  workers: { bar: '#22d3ee', icon: '🛠️', from: 'from-cyan-300/25' },
  blob: { bar: '#818cf8', icon: '📦', from: 'from-indigo-300/25' },
  cdn: { bar: '#34d399', icon: '🌍', from: 'from-emerald-300/25' },
}

function NodeCard({ n, selected, accent, onSelect, locked }) {
  const k = KIND[n.kind] || KIND.service
  if (locked) {
    return (
      <div className="flex-1 min-w-[44%] rounded-3xl border border-dashed border-white/12 bg-white/[0.03] p-3.5 text-left">
        <div className="text-[10px] text-white/30 tracking-widest uppercase">next layer</div>
        <div className="mt-2 h-2 w-16 rounded-full bg-white/10" />
        <div className="mt-2 h-2 w-24 rounded-full bg-white/8" />
      </div>
    )
  }
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      onClick={() => onSelect(n)}
      className={`flex-1 min-w-[44%] text-left rounded-3xl border bg-gradient-to-br ${k.from} to-white/[0.04] p-3.5 backdrop-blur-sm ${
        selected ? 'border-white/40' : 'border-white/10'
      }`}
      style={{
        boxShadow: selected
          ? `0 0 0 1px ${accent}99, 0 12px 40px ${accent}33`
          : '0 8px 28px #00000055',
      }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span
          className="h-7 w-7 rounded-xl grid place-items-center text-sm shrink-0"
          style={{ background: `${k.bar}33`, boxShadow: `inset 0 0 0 1px ${k.bar}55` }}
        >
          {k.icon}
        </span>
        <span className="text-[10px] uppercase tracking-[0.16em] text-white/45">{n.kind}</span>
      </div>
      <div className="text-[15px] font-medium leading-snug">{n.title}</div>
      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{n.blurb}</p>
      <div className="mt-2 h-0.5 w-8 rounded-full" style={{ background: k.bar }} />
    </motion.button>
  )
}

export function FlowMap({ nodes, edges, unlocked, selectedId, onSelect, accent, gate }) {
  const depths = [...new Set(nodes.map((n) => n.depth))].sort((a, b) => a - b)
  const maxUnlockedDepth = Math.max(
    -1,
    ...nodes.filter((n) => unlocked.has(n.id)).map((n) => n.depth),
  )
  const lockedCount = nodes.length - nodes.filter((n) => unlocked.has(n.id)).length
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))

  return (
    <div className="px-3 py-4">
      <div className="relative max-w-lg mx-auto rounded-[28px] border border-white/8 bg-white/[0.03] p-3 sm:p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        {depths.map((d, i) => {
          const row = nodes.filter((n) => n.depth === d)
          const rowUnlocked = row.filter((n) => unlocked.has(n.id))
          const showGhosts = d === maxUnlockedDepth + 1 && rowUnlocked.length < row.length
          const visible = showGhosts ? row : rowUnlocked
          if (!visible.length) return null
          const rowEdges = edges.filter(
            (e) =>
              unlocked.has(e.from) &&
              (unlocked.has(e.to) || showGhosts) &&
              byId[e.from]?.depth === d - 1,
          )
          const labels = [...new Set(rowEdges.map((e) => e.label).filter(Boolean))]
          return (
            <div key={d}>
              {i > 0 && (rowUnlocked.length || showGhosts) ? (
                <div className="py-2 flex flex-col items-center gap-1.5">
                  <div className="flex flex-col items-center">
                    <div className="h-4 w-px bg-teal-300/70" />
                    <div
                      className="w-0 h-0 border-x-[3.5px] border-x-transparent border-t-[5px] border-t-teal-300/80"
                      aria-hidden
                    />
                  </div>
                  {labels.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-1 max-w-[95%]">
                      {labels.slice(0, 4).map((lab) => (
                        <span
                          key={lab}
                          className="text-[10px] text-slate-400 border border-white/12 rounded px-1.5 py-px"
                        >
                          {lab}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
              <div className="flex flex-wrap gap-2.5 justify-center">
                {visible.map((n) => (
                  <NodeCard
                    key={n.id}
                    n={n}
                    selected={selectedId === n.id}
                    accent={accent}
                    onSelect={onSelect}
                    locked={!unlocked.has(n.id)}
                  />
                ))}
              </div>
            </div>
          )
        })}
        {lockedCount > 0 && (
          <div className="mt-5 rounded-2xl border border-dashed border-teal-300/20 bg-teal-300/5 p-4 text-center text-slate-400 text-sm">
            {lockedCount} more pieces still locked
            {gate && (
              <div className="mt-3">
                <button
                  onClick={gate}
                  className="rounded-full bg-teal-300 text-slate-900 font-semibold px-5 py-2.5 shadow-[0_0_24px_rgba(45,212,191,0.45)]"
                >
                  What happens next?
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
