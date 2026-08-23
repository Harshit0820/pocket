import { T_NAV_TITLE } from '../ui/typography.js'

/** Height of the single-row Pocket nav bar (px) — used for sticky offsets. */
export const POCKET_NAV_HEIGHT = 48

export function NavBackButton({ onClick, label = 'Go back' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="shrink-0 px-0.5 py-1 text-sm text-slate-400 hover:text-slate-200"
    >
      ←
    </button>
  )
}

export function NavTitle({ children }) {
  return (
    <h1 className={`min-w-0 flex-1 truncate ${T_NAV_TITLE}`}>
      {children}
    </h1>
  )
}

export function NavActions({ children }) {
  return <div className="flex shrink-0 items-center gap-2">{children}</div>
}

export function NavRestartButton({ onClick, ariaLabel, title }) {
  const tip = title || ariaLabel || 'Restart'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || tip}
      title={tip}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-white/[0.06] hover:text-violet-200"
    >
      <span aria-hidden className="text-[17px] leading-none">
        ↻
      </span>
    </button>
  )
}

export function NavResetButton({ onClick, ariaLabel, title, disabled = false }) {
  const tip = title || ariaLabel || 'Reset progress'
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || tip}
      title={tip}
      aria-disabled={disabled}
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
        disabled
          ? 'cursor-default text-slate-600 opacity-50'
          : 'text-slate-400 hover:bg-white/[0.06] hover:text-slate-200'
      }`}
    >
      <span aria-hidden className="text-[17px] leading-none">
        ↻
      </span>
    </button>
  )
}

export function PocketNavBar({ maxWidth = 'max-w-5xl', children }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-[#070b14]/88 backdrop-blur-md">
      <div className={`${maxWidth} mx-auto flex h-12 items-center gap-2 px-3 sm:gap-3 sm:px-4`}>
        {children}
      </div>
    </header>
  )
}
