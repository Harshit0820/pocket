import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'pocket'
const base =
  process.env.VITE_BASE ||
  (process.env.GITHUB_ACTIONS ? `/${repo}/` : '/')

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
