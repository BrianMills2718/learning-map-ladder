/**
 * lm-graph (stage 1) — the concept graph as the single source of truth, the
 * prerequisite edge, and why the relation must be acyclic.
 */
import type { Lesson } from "../../types";

export const lmGraph: Lesson = {
  id: "lm-graph",
  stage: 1,
  title: "The concept graph: one source of truth",
  summary:
    "Under every learning map is one editable artifact: the concept graph — every concept plus the directed prerequisite edges between them. We meet the edge that orders the map, and the one rule it must obey: no cycles.",
  prerequisites: ["lm-intro"],
  objectives: [
    "Describe the concept graph as the single source of truth a learning map is built from.",
    "Read a prerequisite as a directed \"understand X before Y\" edge.",
    "Explain why the prerequisite relation must be acyclic, and that a cycle is a decomposition error to fix.",
  ],
  definitions: [
    { term: "concept graph", short: "The single source of truth: every concept plus the directed prerequisite edges between them. Edit this; everything else derives.", example: "~20 concepts and their links — the whole map compiles from it." },
    { term: "prerequisite", short: "A directed edge \"understand X before Y\". The one relation that orders and gates the map.", example: "prerequisite → concept-graph." },
    { term: "acyclicity", short: "The prerequisite relation has no cycles — no \"A needs B needs A\".", example: "Two concepts each requiring the other can never be taught first." },
  ],
  sections: [
    {
      heading: "Edit one thing",
      body: `A @c{learning-map} could be a stack of hand-written pages, each with its own \"see also\" list. But then the order lives in your head, and it rots. Instead we keep **one** artifact: the **@c{concept-graph}** — every concept, plus the directed edges between them.

This is the **source of truth**. You change the curriculum by editing *this*, not by rearranging rendered pages. Everything the learner sees is computed from it (the next stage is all about that).`,
    },
    {
      heading: "The one relation that orders everything",
      body: `The edges aren't decoration. Each is a **@c{prerequisite}**: a directed \"understand X before Y\". That single relation is what *orders* the map — and later, what *gates* it.

**Therefore** the relation has to obey one rule: **@c{acyclicity}**. If A is a prerequisite of B and B is a prerequisite of A, neither can ever be taught first — the map has no valid order. **But** a cycle isn't a feature to support; it's a *decomposition error*. You fix it by naming a genuine primitive, or by splitting a concept into a simple-then-advanced pair.`,
    },
  ],
  visualizations: [
    {
      id: "lm-graph-viz",
      kind: "typed-graph",
      title: "A concept graph: concepts joined by directed prerequisite edges",
      textualSummary:
        "Four concept nodes joined by directed prerequisite edges: 'learning map' → 'concept graph' → 'prerequisite' → 'acyclicity', each arrow meaning 'must be understood before'. The arrows never form a loop — that's the acyclicity rule. This single artifact is the source of truth a learning map is built from.",
      layers: ["data"],
      nodes: [
        { id: "lm", type: "System", layer: "data", label: "learning map", position: { x: 40, y: 40 } },
        { id: "cg", type: "System", layer: "data", label: "concept graph", position: { x: 240, y: 40 } },
        { id: "pr", type: "Relation", layer: "data", label: "prerequisite", position: { x: 460, y: 40 } },
        { id: "ac", type: "Relation", layer: "data", label: "acyclicity", position: { x: 660, y: 40 } },
      ],
      edges: [
        { id: "e1", source: "lm", target: "cg", type: "relation", label: "before", layer: "data" },
        { id: "e2", source: "cg", target: "pr", type: "relation", label: "before", layer: "data" },
        { id: "e3", source: "pr", target: "ac", type: "relation", label: "before", layer: "data" },
      ],
    },
  ],
  confusions: [
    {
      misconception: "You change the curriculum by reordering the rendered pages.",
      correction:
        "No — the pages are derived. You change the curriculum by editing the concept graph (the source of truth). The rendered order follows.",
    },
    {
      misconception: "A prerequisite cycle is fine — just teach both at once.",
      correction:
        "A cycle means no valid teaching order exists. It's a decomposition error: name a primitive, or split the concept into a simple and an advanced version so the dependency runs one way.",
    },
  ],
  quiz: [
    {
      id: "lm-graph-q1",
      type: "multiple-choice",
      prompt: "Where do you make a change to alter the curriculum?",
      options: [
        "In the rendered skill tree.",
        "In the concept graph — the single source of truth everything derives from.",
        "In the glossary.",
        "Anywhere; they're all independent copies.",
      ],
      correct: 1,
      explanation: "The concept graph is the source of truth; the other views are derived from it.",
    },
    {
      id: "lm-graph-q2",
      type: "true-false",
      prompt: "True or false: a prerequisite edge is undirected — it just says two concepts are related.",
      correct: false,
      explanation: "It's directed: \"understand X before Y\". Direction is what lets it order the map.",
    },
    {
      id: "lm-graph-q3",
      type: "multiple-choice",
      prompt: "Two concepts each list the other as a prerequisite. What is that?",
      options: [
        "A useful shortcut.",
        "A cycle — a decomposition error that leaves the map with no valid order; fix it.",
        "Required for every graph.",
        "Proof the concepts are advanced.",
      ],
      correct: 1,
      explanation:
        "A cycle violates acyclicity: neither concept can be taught first. Resolve it by naming a primitive or splitting into maturity versions.",
    },
  ],
  masteryCheckpoint:
    "You can describe the concept graph as the single source of truth, read a prerequisite as a directed edge, and explain why the relation must be acyclic.",
};
