# AGENTS quick guide
For coding agents operating in /Users/minhajulhoq/Dev/minmax (Next.js 14 App Router).
Commands: install deps with npm install (pnpm/yarn/bun ok).
Dev: npm run dev.
Build: npm run build.
Prod start (after build): npm run start.
Lint: npm run lint (next/core-web-vitals).
Tests: no test script configured; set up Jest/Vitest first; single-test example after setup: npx vitest path/to/file.test.ts.
Imports: prefer type-only imports first, then React/Next, third-party, then aliases (@/*, @/components/*, @/lib/*), then relative.
Formatting: TypeScript strict, no emit; keep functions/components small (<50 lines), immutable, declarative; use double quotes, trailing commas, semicolons.
Components: App Router defaults to server; add "use client" only when needed (state/effects); favor pure components and composition.
Styling: Tailwind + clsx; dark mode via class strategy; use theme CSS vars (--primary etc.) and tailwind-merge for merging.
Naming: components/types/interfaces PascalCase, hooks useCamel, functions verbNoun, booleans prefixed is/has/can, constants UPPER_SNAKE.
Paths: use aliases from tsconfig (e.g., import { Nav } from "@/components/Nav"; avoid long relative paths).
Data fetching: prefer src/lib/fetch/fetchGraphQL helper; keep env secrets server-side; tag revalidate with next tags when caching.
Error handling: validate at boundaries; handle fetch errors explicitly; avoid swallowing errors; return structured results where possible.
State & side effects: minimize mutation; use early returns to reduce nesting; dependencies explicit (inject params instead of globals).
CSS assets: globals at src/app/globals.css; theme fonts via GeistSans/GeistMono; keep layout body classes consistent.
Docs: keep WHY/edge cases in code comments sparingly; update this file when scripts or rules change.
Cursor/Copilot rules: none found (.cursor/rules, .cursorrules, .github/copilot-instructions.md absent).
