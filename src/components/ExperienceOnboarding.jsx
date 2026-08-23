import { motion } from 'framer-motion'

export function ExperienceOnboarding({ levels, subject, onPick, onBack }) {
  const isAI = subject === 'applied-ai'
  return (
    <div className="min-h-dvh px-5 py-10 max-w-lg mx-auto flex flex-col justify-center">
      <button type="button" onClick={onBack} className="self-start text-sm text-slate-500 mb-8">
        Back to subjects
      </button>
      <p className={`${isAI ? 'text-violet-300' : 'text-teal-300'} tracking-[0.25em] text-xs uppercase mb-3`}>
        Pocket
      </p>
      <h1 className="text-4xl font-semibold leading-tight mb-3">
        {isAI ? 'Learn AI by seeing every step.' : 'See how big products fit together.'}
      </h1>
      <p className="text-slate-400 mb-8 text-[15px] leading-relaxed">
        {isAI
          ? 'Inspect small Python and AI pipelines, predict what happens, and fix realistic failures. Pick how you like it explained:'
          : 'Pick a company. Unlock its high-level map a layer at a time. Short questions, then the next boxes appear. Pick how you like it explained:'}
      </p>
      <div className="flex flex-col gap-3">
        {levels.map((l, i) => (
          <motion.button
            key={l.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i }}
            onClick={() => onPick(l.id)}
            className="text-left rounded-2xl border border-white/10 bg-white/5 p-4 active:scale-[0.99] hover:border-teal-300/50 hover:bg-teal-300/10"
          >
            <div className="font-medium text-lg">{l.title}</div>
            <div className="text-slate-400 text-sm mt-1">{l.blurb}</div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
