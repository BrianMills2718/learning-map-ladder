# Learning-Map Ladder — a learning map *of* the learning-map engine

**Live:** https://brianmills2718.github.io/learning-map-ladder/ (auto-deploys from `master`)

A self-describing dogfood: a navigable, quality-gated **learning map whose topic is the
Ladder engine itself** — concept graph → derivation → the gate suite (and what it can't
check) → LLM judges (correctness + craft) → engine-vs-curriculum → the generator. It's the
first instance of the engine's "**describe a system as a learning map**" goal-type
(`docs/CHARTER.md`), built on the same machinery it teaches.

- **Source of truth:** `src/content/concepts.ts` — 22 concepts across 7 modules. Everything
  (skill tree, path, glossary, panels) **derives** from it.
- **Gate:** `npm run check` (tsc + structural gates + content validator + build).
- **Design docs:** `docs/CHARTER.md` (north star), `docs/ENGINE.md` (architecture),
  `docs/DIAGRAMS.md` (process/data flow), `docs/CAPABILITY_MODEL.md`, `docs/GAPS.md`.

> **Status:** Stage-A skeleton — structurally complete and green. Lessons are
> minimal-but-valid; the full craft-bar pass (`docs/CRAFT_PATTERN.md`: hook →
> picture/analogy-first → Therefore/But) is the next step.
