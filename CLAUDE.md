# Infiniview Docs

- Dedicated public product docs for Infiniview, served at `docs.infiniview.dev`. User-facing docs live here, not in `../infiniview` or `../infiniview-web-frontend`.
- Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, pnpm. `pnpm dev` runs the dev server on port 3200 (webpack — no Turbopack).
- Theme must match `../infiniview-web-frontend`: dark `#07080b`, lime `#d2fb5a`, Inter Tight, JetBrains Mono, square logo mark, grid background, mono section labels, restrained bordered panels.
- Keep docs aligned with `../infiniview` source behavior, especially dashboard routes, GitHub automation, scan config, findings, exports, suppressions, readiness, compare/trust, secrets, billing, and API contracts.
- Do not leak internal architecture. Avoid naming Daytona, Inngest, Prisma, AI Gateway, WorkOS, Dodo, tree-sitter, the LLM proxy, the orchestrator, scan-pipeline internals, capability manifests, or any model details. Talk about a generic "sandbox" and the user-visible scan capabilities only.
- New pages: register in `components/nav-config.ts`, use `DocPage` + `Callout`, and run `pnpm typecheck` and `pnpm build` before pushing.
