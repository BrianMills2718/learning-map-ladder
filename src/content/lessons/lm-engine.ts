/**
 * lm-engine (stage 5) — the engine/curriculum split (code vs data) and the typed
 * curriculum interface that makes it real instead of a fork.
 */
import type { Lesson } from "../../types";

export const lmEngine: Lesson = {
  id: "lm-engine",
  stage: 5,
  title: "One engine, many curricula",
  summary:
    "The machinery so far isn't specific to one subject. Split it: the engine is code (derivation, gates, renderer); a curriculum is data (concepts + lessons for one goal). A typed curriculum interface is the contract that makes the split real instead of a copied fork.",
  prerequisites: ["lm-judges"],
  objectives: [
    "Explain the engine-vs-curriculum split: code vs data.",
    "Identify which parts are the engine (derivation, gate suite, renderer) and which are the curriculum (concepts, lessons, coverage).",
    "Describe the curriculum interface as the typed boundary that makes the split real, not a fork.",
  ],
  definitions: [
    { term: "engine vs curriculum", short: "The split that lets one system serve many goals: the engine is CODE (derivation, the gate suite, the renderer); the curriculum is DATA (the concepts + lessons for one goal).", example: "godel, second-brain, and this map are each a curriculum the same engine builds." },
    { term: "curriculum interface", short: "The typed boundary a curriculum exports for the engine to consume (concepts, lessons, coverage, domain config) — the contract that makes the split real instead of a copied fork.", example: "An interface `{ concepts, lessons, coverage, domain }` the engine validates and renders." },
  ],
  sections: [
    {
      heading: "Notice what isn't subject-specific",
      body: `Step back. The @c{derivation}, the @c{gate-suite}, the @c{llm-judge}s, the renderer — none of them know anything about *this* subject. Feed them a different @c{concept-graph} and they'd build a different @c{learning-map}.

That's the **@c{engine-vs-curriculum}** split: the **engine** is CODE (derivation, the gate suite, the renderer), and a **curriculum** is DATA (the concepts + lessons + coverage for one @c{goal}). One engine consumes any curriculum — this map, a Gödel map, a linear-algebra map — and gates each the same way.`,
    },
    {
      heading: "Make the split a contract, not a fork",
      body: `**But** a split that's just \"copy the repo and swap the content\" rots into divergent forks. The fix is a **@c{curriculum-interface}**: the *typed boundary* a curriculum exports for the engine to consume — \`{ concepts, lessons, coverage, domain }\`.

**Therefore** the engine validates a curriculum against that interface and renders it; the curriculum supplies only data. That contract is what makes \"one engine, many curricula\" real instead of three repos drifting apart.`,
    },
  ],
  visualizations: [
    {
      id: "lm-engine-viz",
      kind: "typed-graph",
      title: "One engine consuming several curricula through a typed interface",
      textualSummary:
        "A single 'engine' node (code: derivation + gate suite + renderer) on the right. Three 'curriculum' nodes on the left — 'this map', 'Gödel', 'linear algebra' — each (data) connecting to the engine through one 'curriculum interface' node in the middle. The interface is the typed contract { concepts, lessons, coverage, domain }; the engine validates and renders whatever passes through it.",
      layers: ["system"],
      nodes: [
        { id: "c1", type: "Diagram", layer: "system", label: "this map (data)", position: { x: 40, y: 30 } },
        { id: "c2", type: "Diagram", layer: "system", label: "Gödel (data)", position: { x: 40, y: 110 } },
        { id: "c3", type: "Diagram", layer: "system", label: "linear algebra (data)", position: { x: 40, y: 190 } },
        { id: "iface", type: "System", layer: "system", label: "curriculum interface", position: { x: 320, y: 110 } },
        { id: "engine", type: "System", layer: "system", label: "engine (code)", position: { x: 600, y: 110 } },
      ],
      edges: [
        { id: "i1", source: "c1", target: "iface", type: "relation", label: "exports", layer: "system" },
        { id: "i2", source: "c2", target: "iface", type: "relation", label: "exports", layer: "system" },
        { id: "i3", source: "c3", target: "iface", type: "relation", label: "exports", layer: "system" },
        { id: "i4", source: "iface", target: "engine", type: "relation", label: "consumed by", layer: "system" },
      ],
    },
  ],
  confusions: [
    {
      misconception: "Each subject needs its own copy of the whole codebase.",
      correction:
        "No — the engine is shared code; each subject is just a curriculum (data). They differ in concepts and lessons, not in the derivation/gate/render machinery.",
    },
    {
      misconception: "\"One engine, many curricula\" is achieved by copying the repo and editing the content.",
      correction:
        "That's a fork, and forks drift. The curriculum interface is a typed boundary the engine validates against, so the split is a real contract, not a copy.",
    },
  ],
  quiz: [
    {
      id: "lm-engine-q1",
      type: "multiple-choice",
      prompt: "In the engine-vs-curriculum split, which is the curriculum?",
      options: [
        "The derivation and gate-suite code.",
        "The data for one goal: its concepts, lessons, and coverage.",
        "The React renderer.",
        "The LLM judge.",
      ],
      correct: 1,
      explanation: "The curriculum is data (concepts + lessons + coverage for one goal); the engine is the shared code.",
    },
    {
      id: "lm-engine-q2",
      type: "true-false",
      prompt: "True or false: the curriculum interface is what makes the split a contract instead of a fork.",
      correct: true,
      explanation: "It's the typed boundary the engine validates against, so curricula stay data and don't drift into divergent codebases.",
    },
    {
      id: "lm-engine-q3",
      type: "multiple-choice",
      prompt: "Why is \"one engine, many curricula\" valuable?",
      options: [
        "It makes each subject's code unique.",
        "The same derivation, gates, and renderer can build and gate any subject's map from data alone.",
        "It removes the need for a concept graph.",
        "It deletes the gate suite.",
      ],
      correct: 1,
      explanation: "Sharing the engine means every new subject reuses the whole machinery and only supplies data.",
    },
  ],
  masteryCheckpoint:
    "You can explain the engine-vs-curriculum split (code vs data) and why a typed curriculum interface makes it a contract rather than a fork.",
};
