import { motion } from 'framer-motion'

const subjects = [
  {
    id: 'hld',
    eyebrow: 'SYSTEMS',
    title: 'High-level design',
    description: 'Build Netflix, Uber, Stripe, and more—one architecture layer at a time.',
    detail: 'Companies · flow maps · real-world scenarios',
    accent: '#5eead4',
    icon: '⌘',
  },
  {
    id: 'applied-ai',
    eyebrow: 'AI',
    title: 'Applied AI',
    description: 'Learn how models, RAG, agents, and MCP work by inspecting and fixing small pipelines.',
    detail: 'Python · ML · LLMs · RAG · agents · MCP',
    accent: '#a78bfa',
    icon: '✦',
  },
]

export function SubjectPicker({ onPick }) {
  return (
    <main className="min-h-dvh px-5 py-10 max-w-xl mx-auto flex flex-col justify-center">
      <div className="mb-8">
        <div>
          <p className="text-teal-300 tracking-[0.25em] text-xs uppercase">Pocket</p>
          <h1 className="text-4xl font-semibold mt-3">What do you want to learn?</h1>
        </div>
      </div>

      <div className="grid gap-4">
        {subjects.map((subject, index) => (
          <motion.button
            key={subject.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => onPick(subject.id)}
            className="relative overflow-hidden text-left rounded-3xl border border-white/10 bg-white/5 p-5"
            style={{ boxShadow: `0 20px 70px ${subject.accent}18` }}
          >
            <div
              className="absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl"
              style={{ background: `${subject.accent}30` }}
            />
            <div className="relative flex gap-4">
              <div
                className="h-12 w-12 shrink-0 rounded-2xl grid place-items-center text-2xl"
                style={{ background: `${subject.accent}22`, color: subject.accent }}
              >
                {subject.icon}
              </div>
              <div>
                <div className="text-[10px] tracking-[0.2em] text-slate-500">{subject.eyebrow}</div>
                <h2 className="text-xl font-semibold mt-1">{subject.title}</h2>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">{subject.description}</p>
                <p className="text-xs text-slate-500 mt-3">{subject.detail}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </main>
  )
}
