import { useState } from 'react'

export function CompanyLogo({ company, size = 40 }) {
  const [step, setStep] = useState(0)
  const sources = [
    company.icon ? `https://cdn.simpleicons.org/${company.icon}` : null,
    company.domain ? `https://www.google.com/s2/favicons?domain=${company.domain}&sz=128` : null,
  ].filter(Boolean)

  const src = sources[step]
  const dim = `${size}px`

  if (!src) {
    return (
      <div
        className="rounded-xl grid place-items-center font-bold text-slate-900 shrink-0"
        style={{ width: dim, height: dim, background: company.accent }}
      >
        {company.name[0]}
      </div>
    )
  }

  return (
    <div
      className="rounded-xl bg-white grid place-items-center shrink-0 overflow-hidden"
      style={{ width: dim, height: dim, padding: size > 36 ? 7 : 5 }}
    >
      <img
        src={src}
        alt=""
        className="h-full w-full object-contain"
        onError={() => setStep((s) => s + 1)}
      />
    </div>
  )
}
