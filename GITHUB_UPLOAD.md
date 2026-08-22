# What to drag onto GitHub (visible names only)

GitHub’s website **rejects hidden folders** (names starting with `.`). Do **not** upload `.github` or `node_modules`.

## Upload these

- `docs`  ← required (this is the live website)
- `src`
- `public`
- `scripts`
- `index.html`
- `package.json`
- `package-lock.json`
- `vite.config.js`
- `README.md`

Skip: `node_modules`, `dist` (same as `docs`, skip it), anything starting with `.`

## Pages setting (not GitHub Actions)

1. Repo **Settings → Pages**
2. **Source:** Deploy from a **branch** (not GitHub Actions)
3. **Branch:** `main`
4. **Folder:** `/docs`
5. Save

Live link: https://harshit0820.github.io/pocket/
