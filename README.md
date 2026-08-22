# Pocket

Learn **high-level design (HLD)** on the go: services, stores, queues, CDNs, and how a request flows. Not LLD (classes, APIs of functions, code).

Pick how you like explanations, choose a product, unlock the architecture map by answering “what happens next?” questions. No AI APIs. Static JSON, one company file at a time.

## Run

```bash
npm install
npm run dev
```

## Build for free static hosting

```bash
npm run build
```

Output is `dist/`.

## GitHub Pages (commit = live)

One-time on GitHub:

1. Push this repo.
2. **Settings → Pages → Source:** GitHub Actions.
3. After the first workflow succeeds, the site is at `https://YOURUSER.github.io/REPO/` (repo name is usually `pocket`).

After that: **commit to `main` (or `master`) and push.** GitHub builds and deploys. Nothing else.

GoatCounter is already in the production build. You do **not** paste a script on GitHub, do **not** re-enable the counter, and do **not** log in except to **read** numbers at [https://pocket.goatcounter.com/](https://pocket.goatcounter.com/).

## Unique visitors (you only)

GitHub Pages has **no unique-user dashboard**. Repo **Insights → Traffic** is only GitHub.com views of the repo.

Counts: [https://pocket.goatcounter.com/](https://pocket.goatcounter.com/) (sign in). Wired via `.env.production`. Local `npm run dev` does not count.
