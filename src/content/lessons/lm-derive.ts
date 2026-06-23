/**
 * lm-derive (stage 2) — everything is computed from the concept graph: the skill
 * map, the path, the glossary, the panels. Closure ("explained before used") and
 * the no-drift payoff.
 */
import type { Lesson } from "../../types";

export const lmDerive: Lesson = {
  id: "lm-derive",
  stage: 2,
  title: "Everything derives",
  summary:
    "From the one concept graph, every other view is computed — the skill map, the recommended path, the glossary, the per-concept panels. That's derivation. Two payoffs: a build-checkable \"no forward references\" rule, and views that can't silently drift.",
  prerequisites: ["lm-graph"],
  objectives: [
    "State the derivation principle: every view is computed from the concept graph, never hand-maintained.",
    "Read the skill map as the derived, navigable view (nodes + lifted prerequisites + path).",
    "Explain definition-closure as a build check: every chip a definition uses must be a transitive prerequisite.",
    "Explain why derived views can't drift the way hand-maintained ones do.",
  ],
  definitions: [
    { term: "derivation", short: "The principle that the skill map, path, glossary, and panels are all computed from the concept graph — never hand-maintained alongside it.", example: "Add one concept and its node, position, and glossary entry all appear." },
    { term: "skill map", short: "The navigable view derivation produces: nodes (grouped concepts), edges (lifted prerequisites), and the recommended path. An output, not a thing you edit.", example: "The homepage tree." },
    { term: "definition closure", short: "No forward references: every concept a definition leans on must be a transitive prerequisite — introduced at-or-before, never later.", example: "A page can't chip a concept that isn't already a prerequisite." },
    { term: "derived, not drifted", short: "Because every view comes from one source, views can't silently fall out of sync the way a hand-maintained map and its table of contents do.", example: "Reorder concepts and path, positions, glossary all re-derive consistently." },
  ],
  sections: [
    {
      heading: "Compute the views; don't keep them",
      body: `Given the @c{concept-graph}, what does the learner actually see? A navigable tree, a recommended order, a glossary, a panel per concept. The temptation is to *maintain* each of those by hand. Don't.

**@c{derivation}** is the principle that all of them are **computed** from the concept graph. The **@c{skill-map}** — the navigable tree plus the recommended path — is one such output: its nodes group concepts, its edges are lifted @c{prerequisite}s. You don't edit the skill map; you edit the graph and the skill map re-derives.`,
    },
    {
      heading: "Closure: explained-before-used becomes a build check",
      body: `**Therefore** \"has this been explained yet?\" stops being a hope and becomes a check. **@c{definition-closure}** says: every concept a definition leans on (via a chip) must already be a transitive @c{prerequisite} — introduced at-or-before, never later. A forward reference fails the build.

**And** because every view flows from one source, you get **@c{derived-not-drifted}**: a hand-maintained map and its table of contents drift apart silently; derived views *cannot*. Reorder the concepts and the path, positions, and glossary all re-derive in sync.`,
    },
  ],
  visualizations: [
    {
      id: "lm-derive-viz",
      kind: "typed-graph",
      title: "One source, many derived views",
      textualSummary:
        "A central 'concept graph' node with arrows pointing OUT to four derived views: 'skill map', 'recommended path', 'glossary', and 'concept panels'. Each arrow means 'computed from'. Because they all derive from the one source, they can't drift apart; and closure ('explained before used') is checked over that same source.",
      layers: ["system"],
      nodes: [
        { id: "cg", type: "System", layer: "system", label: "concept graph", position: { x: 60, y: 100 } },
        { id: "sm", type: "Diagram", layer: "system", label: "skill map", position: { x: 360, y: 20 } },
        { id: "path", type: "Diagram", layer: "system", label: "path", position: { x: 360, y: 90 } },
        { id: "gloss", type: "Diagram", layer: "system", label: "glossary", position: { x: 360, y: 160 } },
        { id: "panels", type: "Diagram", layer: "system", label: "panels", position: { x: 360, y: 230 } },
      ],
      edges: [
        { id: "d1", source: "cg", target: "sm", type: "extracts", label: "computed", layer: "system" },
        { id: "d2", source: "cg", target: "path", type: "extracts", label: "computed", layer: "system" },
        { id: "d3", source: "cg", target: "gloss", type: "extracts", label: "computed", layer: "system" },
        { id: "d4", source: "cg", target: "panels", type: "extracts", label: "computed", layer: "system" },
      ],
    },
  ],
  confusions: [
    {
      misconception: "The glossary and skill tree are separate artifacts you keep up to date by hand.",
      correction:
        "They're derived from the concept graph. Editing them directly is how drift starts. Edit the source; the views re-compute.",
    },
    {
      misconception: "Closure is just a style guideline, not something enforced.",
      correction:
        "Definition-closure is a build check: a definition that chips a concept which isn't a transitive prerequisite is a forward reference, and it fails the build.",
    },
  ],
  quiz: [
    {
      id: "lm-derive-q1",
      type: "multiple-choice",
      prompt: "What is the skill map, in the derivation picture?",
      options: [
        "A second source of truth you keep in sync with the concept graph.",
        "A view computed from the concept graph: grouped nodes, lifted prerequisite edges, and a path.",
        "A hand-drawn diagram unrelated to the graph.",
        "The glossary.",
      ],
      correct: 1,
      explanation: "The skill map is an output of derivation — you edit the graph, not the map.",
    },
    {
      id: "lm-derive-q2",
      type: "true-false",
      prompt: "True or false: a definition may chip a concept that is introduced in a later stage.",
      correct: false,
      explanation: "That's a forward reference. Closure requires every chipped concept to be a transitive prerequisite — introduced at-or-before.",
    },
    {
      id: "lm-derive-q3",
      type: "multiple-choice",
      prompt: "Why can't the derived views drift out of sync?",
      options: [
        "Because someone checks them manually every release.",
        "Because they're all recomputed from the single concept graph, so there's no stale copy to forget.",
        "They can drift; nothing prevents it.",
        "Because they're frozen and never change.",
      ],
      correct: 1,
      explanation: "Derived-not-drifted: one source feeds every view, so a change re-derives everywhere at once.",
    },
  ],
  masteryCheckpoint:
    "You can explain that all views are derived from the concept graph, read the skill map as one such view, and state definition-closure as an enforced no-forward-reference rule.",
};
