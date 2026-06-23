/**
 * lm-gates (stage 3) — the gate suite, the coverage contract, goal closure, and
 * the key insight: structure ≠ quality. Gates verify form, not truth or teaching.
 */
import type { Lesson } from "../../types";

export const lmGates: Lesson = {
  id: "lm-gates",
  stage: 3,
  title: "The gate suite — and what it can't check",
  summary:
    "Every change runs an automated gate suite: acyclicity, closure, coverage, layout, parity. A coverage contract pins the key ideas; goal closure marks what's core. But the key insight is the limit: gates verify structure, not truth and not teaching quality.",
  prerequisites: ["lm-derive"],
  objectives: [
    "Describe the gate suite as the automated checks every map must pass on each change.",
    "Explain the coverage contract as a declared must-contain list enforced against the goal.",
    "Define goal closure and the core-vs-enrichment split it induces.",
    "State the key insight: structural validity is necessary but not sufficient — a green map can still be wrong or flat.",
  ],
  definitions: [
    { term: "gate suite", short: "The automated checks every map must pass on each change: acyclicity, definition-closure, coverage, richness, layout, parity. A failing change isn't shippable.", example: "`npm run check` turns a forward reference red." },
    { term: "coverage contract", short: "A declared list of key ideas a map MUST contain, enforced against the goal — so a curriculum can't silently lose a core idea.", example: "If the contract requires \"the generator\" and none exists, the gate fails." },
    { term: "goal closure", short: "The backward prerequisite closure of a goal: everything genuinely needed to reach it. Concepts inside are core; reachable-but-off-path ones are enrichment.", example: "Walk back from the goal; the closure is its dependencies." },
    { term: "structure ≠ quality", short: "The key insight: the gate suite verifies form (closure, acyclicity, coverage) — NOT truth and NOT teaching quality. A map can pass every gate and still be wrong or flat.", example: "A thin, wrong, definition-first map passes the structural gates green." },
  ],
  sections: [
    {
      heading: "Make the rules automatic",
      body: `Closure and @c{acyclicity} are only useful if they're *enforced*. The **@c{gate-suite}** is the set of automated checks every map must pass on each change — built on the @c{concept-graph}, it enforces @c{acyclicity}, @c{definition-closure}, coverage, layout, and parity. A change that fails a gate is not shippable.

Two of those gates are about *completeness*. A **@c{coverage-contract}** is a declared list of the key ideas a map MUST contain, checked against the @c{goal}; lose a core idea and the gate goes red, and \"won't do yet\" becomes explicit instead of an accidental gap. **@c{goal-closure}** is the backward @c{prerequisite} closure of the goal — everything genuinely needed to reach it. Concepts inside it are *core*; reachable-but-off-path ones are *enrichment*.`,
    },
    {
      heading: "The trap: green is not good",
      body: `Here is the **key insight**, and it's the hinge of the whole project: **@c{structure-not-quality}**. The gate suite verifies *form* — closure, acyclicity, coverage. It does **not** verify that the content is *true*, and it does **not** verify that it *teaches well*.

**Therefore** a map can pass every structural gate and still be factually wrong, or technically-correct-but-flat. The cheap, structurally-valid output is the trap: it's green, so it *looks* done. Necessary is not sufficient — and the next stage is about making truth and craft gateable too.`,
    },
  ],
  visualizations: [
    {
      id: "lm-gates-viz",
      kind: "comparison-table",
      title: "What the structural gate suite does and doesn't guarantee",
      textualSummary:
        "A table over three properties of a map — 'Well-formed structure (closure/acyclicity)', 'Factually true', 'Teaches well' — with two columns: 'Gate suite checks it?' and 'Could fail silently?'. Structure: checked yes, silent no. Truth: checked no, silent yes. Teaching quality: checked no, silent yes. The point: a green map guarantees only structure — truth and craft can be wrong while the gates stay green.",
      columns: ["Gate suite checks it?", "Could be wrong while gates stay green?"],
      rows: [
        { label: "Well-formed structure (closure, acyclicity)", cells: { "Gate suite checks it?": { value: "yes" }, "Could be wrong while gates stay green?": { value: "no" } } },
        { label: "Factually true", cells: { "Gate suite checks it?": { value: "no" }, "Could be wrong while gates stay green?": { value: "yes", note: "a wrong claim passes structural gates" } } },
        { label: "Teaches well (hook, analogy, arc)", cells: { "Gate suite checks it?": { value: "no" }, "Could be wrong while gates stay green?": { value: "yes", note: "a flat, definition-first page passes" } } },
      ],
    },
  ],
  confusions: [
    {
      misconception: "If a map passes every gate, it's correct and well-taught.",
      correction:
        "Structure ≠ quality. The gate suite checks form (closure, acyclicity, coverage), not truth or teaching. A green map can be factually wrong or flat — that's the trap.",
    },
    {
      misconception: "The coverage contract just lists what's in the map.",
      correction:
        "It declares what a map MUST contain, measured against the goal, and the gate fails if a required idea is missing — so core ideas can't silently disappear.",
    },
  ],
  quiz: [
    {
      id: "lm-gates-q1",
      type: "multiple-choice",
      prompt: "A map passes every structural gate. What does that guarantee?",
      options: [
        "It is correct and well-taught.",
        "Only that its structure is well-formed — not truth and not teaching quality.",
        "Nothing at all.",
        "That a human reviewed it.",
      ],
      correct: 1,
      explanation: "Structural validity is necessary, not sufficient; truth and craft need other gates.",
    },
    {
      id: "lm-gates-q2",
      type: "true-false",
      prompt: "True or false: the coverage contract makes \"we won't cover this yet\" explicit rather than an accidental gap.",
      correct: true,
      explanation: "The contract declares required ideas (gated) and lists deferred ones (advisory) — so a missing core idea fails, and a deferred one is on the record.",
    },
    {
      id: "lm-gates-q3",
      type: "multiple-choice",
      prompt: "What is goal closure?",
      options: [
        "The set of all concepts in the field.",
        "The backward prerequisite closure of the goal — everything genuinely needed to reach it (the core).",
        "The list of quiz questions.",
        "The forward references in a map.",
      ],
      correct: 1,
      explanation: "Walk back along prerequisites from the goal; concepts inside the closure are core, the rest enrichment.",
    },
  ],
  masteryCheckpoint:
    "You can describe the gate suite and coverage contract, define goal closure, and state the key insight that structural gates verify form, not truth or teaching quality.",
};
