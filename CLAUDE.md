# learning-map-ladder — project instructions

A **learning map *of* the learning-map engine** — a dogfood of the engine's
"describe-a-system as a learning map" goal-type (see `docs/CHARTER.md`). Same Vite/React/TS
machinery + gate suite as the sibling `*-ladder` sites; only the curriculum *content*
differs.

## Architecture
- **`src/content/concepts.ts` is the source of truth** — 22 engine concepts across 7
  modules (lm-intro → lm-graph → lm-derive → lm-gates → lm-judges → lm-engine →
  lm-generator). Each has a definition, example, `prerequisites`, `contrasts`,
  `introducedIn`, and a per-edge `PREREQ_WHY` + `PREREQ_KIND`. Everything else (skill tree,
  path, positions, glossary, panels) **derives** — edit `concepts.ts`, never the derived views.
- **Lessons** `src/content/lessons/lm-*.ts`, one per module, registered in `lessons/index.ts`.
- **Gate:** `npm run check` (tsc + `test-gates` + `validate-content` + `vite build`) must
  stay green on every change.

## Conventions
- **No forward references** (closure): a `@c{}` chip must be a transitive prerequisite.
- **Craft bar** (`docs/CRAFT_PATTERN.md`): hook → picture/analogy-first → Therefore/But →
  explain every symbol → misconception-distractor quizzes. The current lessons are
  minimal-but-valid; the full craft pass is owed.
- **Neutrality + learner empowerment** (`docs/CHARTER.md`).

## Status
Stage-A skeleton: 22 concepts, 7 modules, `npm run check` green, deployed. Next: the
craft-bar pass over the lessons; then this becomes a curriculum the engine could regenerate.
