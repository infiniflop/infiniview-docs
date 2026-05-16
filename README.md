# Infiniview Docs

Public product documentation for Infiniview, served at [docs.infiniview.dev](https://docs.infiniview.dev). User-facing docs live here, not in `../infiniview` or `../infiniview-web-frontend`.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, pnpm.

## Development

```bash
pnpm install
pnpm dev          # http://localhost:3200
```

## Verification

```bash
pnpm typecheck
pnpm build
```

## Adding a docs page

1. Create `app/(docs)/<slug>/page.tsx` and export a default component that returns `<DocPage href="/<slug>" title="…" toc={[…]}>…</DocPage>`.
2. Add the entry to `components/nav-config.ts` so it appears in the sidebar and Next/Prev pager.
3. Use `<Callout tone="info|warn|ok">` for highlighted notes, fenced `<pre><code>` blocks for endpoints and YAML, and `<table>` for short comparison content.
4. Run `pnpm typecheck` before opening a PR.

## Repo layout

- `app/(docs)/` — one folder per documentation route. The Introduction lives at `app/(docs)/page.tsx`.
- `components/` — `DocPage`, `Callout`, sidebar, topbar, search, theme toggle.
- `components/nav-config.ts` — single source of truth for sidebar groups and the page order.
- `lib/utils.ts` — `cn()` helper for class merging.

## Theme

Dark background `#07080b`, lime accent `#d2fb5a`, Inter Tight body, JetBrains Mono for labels and code, square logo mark. The visual language must stay aligned with the marketing site under `../infiniview-web-frontend` — restrained bordered panels, mono section labels, grid background.

## Editing on GitHub

Every doc page has an "Edit on GitHub" link in the footer that targets `app/(docs)/<slug>/page.tsx` on the `main` branch.
