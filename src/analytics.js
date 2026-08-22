/** Optional unique-visitor stats for the owner only. Off unless VITE_GOATCOUNTER is set. */
export function startOwnerAnalytics() {
  const code = import.meta.env.VITE_GOATCOUNTER
  if (!code || typeof document === 'undefined') return
  if (document.querySelector('script[data-goatcounter]')) return
  const s = document.createElement('script')
  s.async = true
  s.src = 'https://gc.zgo.at/count.js'
  s.dataset.goatcounter = `https://${code}.goatcounter.com/count`
  document.head.appendChild(s)
}
