import { motion } from 'framer-motion'
import { useState } from 'react'
import { T_BODY } from '../../ui/typography.js'

export function ModuleInteraction({ type }) {
  let content = null
  switch (type) {
    case 'io-flow':
      content = <IoFlow />
      break
    case 'operation-runner':
      content = <OperationRunner />
      break
    case 'ai-taxonomy':
      content = <AiTaxonomy />
      break
    case 'dataset-table':
      content = <DatasetTable />
      break
    case 'inference-trace':
      content = <InferenceTrace />
      break
    case 'supervised-unsupervised':
      content = <SupervisedUnsupervised />
      break
    case 'ml-task-matcher':
      content = <MlTaskMatcher />
      break
    case 'split-scenario':
      content = <SplitScenario />
      break
    case 'neuron-layers':
      content = <NeuronLayers />
      break
    case 'training-concepts':
      content = <TrainingConcepts />
      break
    case 'training-simulator':
      content = <TrainingSimulator />
      break
    case 'token-pipeline':
      content = <TokenPipeline />
      break
    case 'attention-context':
      content = <AttentionContext />
      break
    case 'sampling-lab':
      content = <SamplingLab />
      break
    default:
      return null
  }
  return (
    <div className={`space-y-4 ${T_BODY} [&_button]:text-sm`}>
      {content}
    </div>
  )
}

function IoFlow() {
  const [input, setInput] = useState('scores')
  const samples = {
    scores: { label: 'List of scores', value: '[88, 92, 79]', shape: '3 numbers', out: '86.3' },
    word: { label: 'One word', value: '"hello"', shape: '1 string', out: '5 letters' },
    empty: { label: 'Nothing yet', value: '—', shape: 'waiting', out: '—' },
  }
  const s = samples[input]
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {Object.keys(samples).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setInput(key)}
            className={`rounded-full px-3 py-1.5 text-xs border ${
              input === key ? 'border-violet-300/40 bg-violet-300/15 text-violet-100' : 'border-white/10 text-slate-400'
            }`}
          >
            {samples[key].label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 overflow-x-auto">
        <motion.div
          key={`in-${input}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-w-[90px] flex-1 rounded-xl border border-violet-300/20 bg-violet-300/[0.06] p-2.5 text-center"
        >
          <div className="text-[9px] uppercase tracking-widest text-slate-500">Input</div>
          <div className="mt-1 font-mono text-[11px] text-slate-200">{s.value}</div>
          <div className="text-[10px] text-slate-500">{s.shape}</div>
        </motion.div>
        <span className="text-violet-300/50 shrink-0">→</span>
        <div className="min-w-[90px] flex-1 rounded-xl border border-teal-300/20 bg-teal-300/[0.06] p-2.5 text-center">
          <div className="text-[9px] uppercase tracking-widest text-slate-500">Operation</div>
          <div className="mt-1 font-mono text-[11px] text-slate-200">average(...)</div>
          <div className="text-[10px] text-slate-500">named step</div>
        </div>
        <span className="text-violet-300/50 shrink-0">→</span>
        <motion.div
          key={`out-${input}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-w-[90px] flex-1 rounded-xl border border-amber-300/20 bg-amber-300/[0.06] p-2.5 text-center"
        >
          <div className="text-[9px] uppercase tracking-widest text-slate-500">Output</div>
          <div className="mt-1 font-mono text-[11px] text-slate-200">{s.out}</div>
          <div className="text-[10px] text-slate-500">one result</div>
        </motion.div>
      </div>
    </div>
  )
}

function OperationRunner() {
  const presets = [
    { id: 'avg', label: 'Average', input: [88, 92, 79], op: 'average', run: (v) => (v.reduce((a, b) => a + b, 0) / v.length).toFixed(1) },
    { id: 'len', label: 'Length', input: 'notebook', op: 'len', run: (v) => `${String(v).length} chars` },
    { id: 'double', label: 'Double', input: 21, op: 'double', run: (v) => v * 2 },
  ]
  const [presetId, setPresetId] = useState('avg')
  const [ran, setRan] = useState(false)
  const preset = presets.find((p) => p.id === presetId)
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => { setPresetId(p.id); setRan(false) }}
            className={`rounded-full px-3 py-1.5 text-xs border ${
              presetId === p.id ? 'border-teal-300/40 bg-teal-300/10 text-teal-100' : 'border-white/10 text-slate-400'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="rounded-xl border border-white/10 bg-[#0b1220] p-3 font-mono text-xs">
        <div className="text-slate-500">input = {JSON.stringify(preset.input)}</div>
        <div className="text-teal-200 mt-1">result = {preset.op}(input)</div>
        {ran && <div className="text-amber-200 mt-1">→ {preset.run(preset.input)}</div>}
      </div>
      <button type="button" onClick={() => setRan(true)} className="w-full rounded-full bg-teal-300 py-2 text-sm font-semibold text-slate-950">
        {ran ? 'Run again' : 'Run operation'}
      </button>
    </div>
  )
}

function AiTaxonomy() {
  const [active, setActive] = useState('ai')
  const layers = {
    ai: { label: 'Artificial Intelligence', desc: 'Broad field: systems that perform tasks requiring human-like intelligence.', example: 'Chess engines, recommender rules, robots, ML models' },
    ml: { label: 'Machine Learning', desc: 'Learns patterns from data instead of only hand-written rules.', example: 'Spam filters trained on labeled email' },
    dl: { label: 'Deep Learning', desc: 'ML using neural networks with many layers.', example: 'Image recognition, speech-to-text' },
    gen: { label: 'Generative AI', desc: 'Creates new content — text, images, audio, code.', example: 'Chat assistants, image generators' },
  }
  const order = ['ai', 'ml', 'dl', 'gen']
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {order.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setActive(key)}
            className={`rounded-full px-3 py-1.5 text-xs border ${
              active === key ? 'border-violet-300/40 bg-violet-300/15 text-violet-100' : 'border-white/10 text-slate-400'
            }`}
          >
            {layers[key].label}
          </button>
        ))}
      </div>
      <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="text-sm text-slate-300">{layers[active].desc}</p>
        <p className="mt-2 text-xs text-slate-500">Example: {layers[active].example}</p>
      </motion.div>
      <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500">
        {order.map((k, i) => (
          <span key={k}>{i > 0 && ' ⊂ '}{layers[k].label.split(' ')[0]}</span>
        ))}
      </div>
    </div>
  )
}

function DatasetTable() {
  const rows = [
    { sqft: 1200, beds: 2, age: 10, price: 310 },
    { sqft: 1800, beds: 3, age: 5, price: 420 },
    { sqft: 950, beds: 1, age: 30, price: 260 },
  ]
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="text-slate-500 border-b border-white/10">
            <th className="py-2 pr-3 text-left font-normal">sqft</th>
            <th className="py-2 pr-3 text-left font-normal">beds</th>
            <th className="py-2 pr-3 text-left font-normal">age</th>
            <th className="py-2 text-left font-normal text-violet-300">price (label)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.sqft} className="border-b border-white/5 text-slate-300">
              <td className="py-2 pr-3">{r.sqft}</td>
              <td className="py-2 pr-3">{r.beds}</td>
              <td className="py-2 pr-3">{r.age}</td>
              <td className="py-2 text-violet-200">${r.price}k</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-[11px] text-slate-500">Features = input columns · Label = target column when training</p>
    </div>
  )
}

function InferenceTrace() {
  const rows = [
    { id: 0, sqft: 1200, beds: 2, age: 10, price: 310 },
    { id: 1, sqft: 1800, beds: 3, age: 5, price: 420 },
    { id: 2, sqft: 950, beds: 1, age: 30, price: 260 },
  ]
  const [rowId, setRowId] = useState(1)
  const row = rows.find((r) => r.id === rowId)
  const predicted = Math.round(row.sqft * 0.18 + row.beds * 25 - row.age * 1.2)
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {rows.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setRowId(r.id)}
            className={`rounded-lg px-3 py-1.5 text-xs border ${
              rowId === r.id ? 'border-violet-300/40 bg-violet-300/10' : 'border-white/10 text-slate-400'
            }`}
          >
            Row {r.id + 1}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
        <div className="rounded-lg border border-violet-300/20 p-2">
          <div className="text-slate-500">Features in</div>
          <div className="mt-1 text-slate-200">{row.sqft} sqft · {row.beds} bed · {row.age}y</div>
        </div>
        <div className="rounded-lg border border-teal-300/20 p-2">
          <div className="text-slate-500">Model</div>
          <div className="mt-1 text-slate-200">trained weights</div>
        </div>
        <div className="rounded-lg border border-amber-300/20 p-2">
          <div className="text-slate-500">Prediction</div>
          <div className="mt-1 text-amber-100">${predicted}k</div>
        </div>
      </div>
      <p className="text-[11px] text-slate-500">Actual label for training was ${row.price}k — inference uses only feature columns.</p>
    </div>
  )
}

function SupervisedUnsupervised() {
  const [mode, setMode] = useState('supervised')
  const examples = {
    supervised: { title: 'Supervised', rows: 'emails + spam label', goal: 'Learn input → label mapping' },
    unsupervised: { title: 'Unsupervised', rows: 'purchase histories, no label', goal: 'Find clusters or structure' },
  }
  const e = examples[mode]
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {Object.keys(examples).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setMode(k)}
            className={`flex-1 rounded-xl py-2 text-xs border ${
              mode === k ? 'border-violet-300/40 bg-violet-300/10 text-violet-100' : 'border-white/10 text-slate-400'
            }`}
          >
            {examples[k].title}
          </button>
        ))}
      </div>
      <div className="rounded-xl border border-white/10 p-3 text-sm text-slate-300">
        <p>Data: {e.rows}</p>
        <p className="mt-2 text-slate-400">Goal: {e.goal}</p>
      </div>
    </div>
  )
}

function MlTaskMatcher() {
  const scenarios = [
    { id: 'reg', text: 'Predict house price in dollars', answer: 'regression' },
    { id: 'cls', text: 'Detect fraud yes/no', answer: 'classification' },
    { id: 'clu', text: 'Group news articles with no tags', answer: 'clustering' },
  ]
  const tasks = [
    { id: 'regression', label: 'Regression' },
    { id: 'classification', label: 'Classification' },
    { id: 'clustering', label: 'Clustering' },
  ]
  const [answers, setAnswers] = useState({})
  function pick(scenarioId, taskId) {
    setAnswers((a) => ({ ...a, [scenarioId]: taskId }))
  }
  return (
    <div className="space-y-3">
      {scenarios.map((s) => {
        const chosen = answers[s.id]
        const correct = chosen === s.answer
        return (
          <div key={s.id} className="rounded-xl border border-white/10 p-3">
            <p className="text-sm text-slate-300">{s.text}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {tasks.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => pick(s.id, t.id)}
                  className={`rounded-full px-2.5 py-1 text-[11px] border ${
                    chosen === t.id
                      ? correct
                        ? 'border-teal-300/40 bg-teal-300/10 text-teal-100'
                        : 'border-amber-300/40 bg-amber-300/10 text-amber-100'
                      : 'border-white/10 text-slate-400'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function SplitScenario() {
  const options = [
    { id: 'good', label: 'Train on Jan–Sep, validate on Oct, test on Nov', ok: true, note: 'Time order preserved; test untouched during tuning.' },
    { id: 'leak', label: 'Include “refund issued” column to predict chargeback', ok: false, note: 'Leakage — refund happens after the fraud event.' },
    { id: 'bad', label: 'Shuffle all rows randomly, test on 10%, tune on same test', ok: false, note: 'Reusing the test set for tuning inflates scores.' },
  ]
  const [picked, setPicked] = useState(null)
  const choice = options.find((o) => o.id === picked)
  return (
    <div className="space-y-2">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => setPicked(o.id)}
          className={`w-full rounded-xl border px-3 py-2.5 text-left text-sm ${
            picked === o.id
              ? o.ok
                ? 'border-teal-300/40 bg-teal-300/10 text-teal-100'
                : 'border-amber-300/40 bg-amber-300/10 text-amber-100'
              : 'border-white/10 text-slate-300'
          }`}
        >
          {o.label}
        </button>
      ))}
      {choice && <p className="text-xs text-slate-400 mt-2">{choice.note}</p>}
    </div>
  )
}

function NeuronLayers() {
  const [step, setStep] = useState(0)
  const steps = [
    { title: 'Inputs × weights', detail: 'Each input is multiplied by a weight and summed with a bias.' },
    { title: 'Activation', detail: 'A function (e.g. ReLU) keeps signals in a useful range for the next layer.' },
    { title: 'Stack layers', detail: 'Layer 1 finds simple patterns; deeper layers combine them into richer features.' },
  ]
  return (
    <div className="space-y-3">
      <div className="flex justify-center gap-3 items-center py-2">
        {['x₁', 'x₂', 'x₃'].map((x) => (
          <div key={x} className="h-8 w-8 rounded-lg border border-violet-300/30 grid place-items-center text-xs text-violet-100">{x}</div>
        ))}
        <span className="text-slate-500">→</span>
        <div className="h-10 w-10 rounded-full border border-teal-300/30 grid place-items-center text-[10px] text-teal-100">Σ+w</div>
        <span className="text-slate-500">→</span>
        <div className="h-8 w-8 rounded-lg border border-amber-300/30 grid place-items-center text-xs text-amber-100">y</div>
      </div>
      <div className="flex gap-2">
        {steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => setStep(i)}
            className={`flex-1 rounded-lg py-1.5 text-[10px] border ${
              step === i ? 'border-violet-300/40 bg-violet-300/10' : 'border-white/10 text-slate-500'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <p className="text-sm text-slate-300">{steps[step].detail}</p>
    </div>
  )
}

function TrainingConcepts() {
  const items = [
    { term: 'Loss', def: 'Single number: how wrong the batch predictions are.' },
    { term: 'Gradient descent', def: 'Adjust weights a small step to reduce loss.' },
    { term: 'Backprop', def: 'Efficient way to compute how each weight affects loss.' },
    { term: 'Epoch', def: 'One full pass through the training data.' },
  ]
  const [open, setOpen] = useState(0)
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <button
          key={item.term}
          type="button"
          onClick={() => setOpen(i)}
          className={`w-full rounded-xl border px-3 py-2.5 text-left ${
            open === i ? 'border-violet-300/30 bg-violet-300/[0.06]' : 'border-white/10'
          }`}
        >
          <span className="text-sm font-medium text-slate-200">{item.term}</span>
          {open === i && <p className="mt-1 text-xs text-slate-400">{item.def}</p>}
        </button>
      ))}
    </div>
  )
}

function TrainingSimulator() {
  const rates = {
    high: { label: 'High (0.5)', outcome: 'Loss jumps wildly — weights overshoot.', color: 'amber' },
    ok: { label: 'Moderate (0.01)', outcome: 'Loss steadily decreases over epochs.', color: 'teal' },
    low: { label: 'Very low (0.0001)', outcome: 'Loss creeps down — training feels slow.', color: 'slate' },
  }
  const epochFx = {
    few: 'Underfit — patterns not captured yet.',
    many: 'Good fit on training data.',
    tooMany: 'Overfit — memorizing noise; validation would worsen.',
  }
  const [rate, setRate] = useState('ok')
  const [epochs, setEpochs] = useState('many')
  return (
    <div className="space-y-3">
      <div>
        <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">Learning rate</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(rates).map(([k, v]) => (
            <button
              key={k}
              type="button"
              onClick={() => setRate(k)}
              className={`rounded-full px-3 py-1.5 text-xs border ${
                rate === k ? 'border-violet-300/40 bg-violet-300/10' : 'border-white/10 text-slate-400'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-400">{rates[rate].outcome}</p>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">Epochs</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(epochFx).map(([k, v]) => (
            <button
              key={k}
              type="button"
              onClick={() => setEpochs(k)}
              className={`rounded-full px-3 py-1.5 text-xs border ${
                epochs === k ? 'border-teal-300/40 bg-teal-300/10' : 'border-white/10 text-slate-400'
              }`}
            >
              {k === 'few' ? '5' : k === 'many' ? '50' : '500'}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-400">{epochFx[epochs]}</p>
      </div>
    </div>
  )
}

function TokenPipeline() {
  const text = 'How are you?'
  const tokens = ['How', ' are', ' you', '?']
  const [step, setStep] = useState(0)
  const views = [
    { label: 'Text', content: text },
    { label: 'Tokens', content: tokens.join(' | ') },
    { label: 'Token IDs', content: '[1024, 527, 499, 30]' },
    { label: 'Embeddings', content: '4 vectors (one per token)' },
  ]
  return (
    <div className="space-y-3">
      <div className="flex gap-2 overflow-x-auto">
        {views.map((v, i) => (
          <button
            key={v.label}
            type="button"
            onClick={() => setStep(i)}
            className={`shrink-0 rounded-full px-3 py-1 text-xs border ${
              step === i ? 'border-violet-300/40 bg-violet-300/10' : 'border-white/10 text-slate-400'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>
      <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-white/10 bg-[#0b1220] p-3 font-mono text-xs text-slate-200">
        {views[step].content}
      </motion.div>
    </div>
  )
}

function AttentionContext() {
  const words = ['The', 'cat', 'sat', 'on', 'the', 'mat']
  const [focus, setFocus] = useState(2)
  const weights = words.map((_, i) => {
    const d = Math.abs(i - focus)
    return d === 0 ? 1 : d === 1 ? 0.6 : d === 2 ? 0.3 : 0.1
  })
  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-400">Tap a token to see what it might attend to (simplified):</p>
      <div className="flex flex-wrap gap-1.5">
        {words.map((w, i) => (
          <button
            key={`${w}-${i}`}
            type="button"
            onClick={() => setFocus(i)}
            className={`rounded-lg px-2 py-1 text-xs border ${
              focus === i ? 'border-violet-300/50 bg-violet-300/15' : 'border-white/10 text-slate-400'
            }`}
          >
            {w}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-1">
        {words.map((w, i) => (
          <div
            key={`bar-${i}`}
            className="rounded px-2 py-1 text-[10px] border border-white/10"
            style={{ opacity: 0.4 + weights[i] * 0.6 }}
          >
            {w}
          </div>
        ))}
      </div>
      <p className="text-[11px] text-slate-500">Context window = max tokens considered at once (varies by model).</p>
    </div>
  )
}

function SamplingLab() {
  const candidates = [
    { token: ' today', prob: 0.42 },
    { token: ' well', prob: 0.28 },
    { token: ' there', prob: 0.18 },
    { token: ' soon', prob: 0.12 },
  ]
  const [temp, setTemp] = useState('medium')
  const pick =
    temp === 'low'
      ? candidates[0].token
      : temp === 'high'
        ? ' soon (surprise pick)'
        : candidates[1].token
  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-300">Prompt: “I am feeling…”</p>
      <div className="rounded-xl border border-white/10 p-3">
        {candidates.map((c) => (
          <div key={c.token} className="flex justify-between text-xs py-1 text-slate-300">
            <span>{c.token.trim()}</span>
            <span className="text-slate-500">{(c.prob * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {[
          { id: 'low', label: 'Low temp' },
          { id: 'medium', label: 'Medium' },
          { id: 'high', label: 'High temp' },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTemp(t.id)}
            className={`flex-1 rounded-lg py-2 text-xs border ${
              temp === t.id ? 'border-violet-300/40 bg-violet-300/10' : 'border-white/10 text-slate-400'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-400">Likely next token: <span className="text-violet-200">{pick}</span></p>
    </div>
  )
}
