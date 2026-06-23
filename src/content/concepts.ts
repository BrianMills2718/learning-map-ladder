/**
 * Concept dependency DAG (ADR-0002) — the SOURCE OF TRUTH for the **Ladder engine**
 * learning map (a learning map OF the learning-map engine itself; see docs/CHARTER.md).
 * Everything else (skill tree, path, positions, glossary, panels) derives from this.
 * Every prerequisite has a PREREQ_WHY + PREREQ_KIND (the two side-tables below).
 *
 * Invariants (all gated by scripts/validate-content.mjs + gates.mjs):
 *   - `prerequisites` acyclic; `@c{}` refs are transitive prerequisites (closure).
 *   - `introducedIn` names the module; a prereq's module stage ≤ this concept's.
 *   - `band` (foundations<…) ≥ every prerequisite's band; each module ≤9 concepts.
 */
import type { Concept, ConceptGraph } from "../types";

const CONCEPTS: Concept[] = [
  // ============ lm-intro: what a learning map is ============
  { id: "learning-map", term: "learning map", layer: "system", band: "foundations", primitive: true,
    short: "A navigable, quality-gated curriculum produced from a concept graph: the right things to learn for a goal, in an order where nothing is used before it's introduced. Not an article you read — a path you climb.",
    example: "This site is a learning map of the learning-map engine: the nodes are its ideas, the order is their dependencies.",
    contrasts: ["generator"], prerequisites: [], introducedIn: "lm-intro",
    microQuiz: [{ id: "mq-lm", type: "true-false", prompt: "True or false: a learning map is just a pile of articles you can read in any order.", correct: false, explanation: "It's an ordered path: prerequisites come before what needs them." }] },
  { id: "goal", term: "goal", layer: "system", band: "foundations",
    short: "The terminal capability a @c{learning-map} teaches — what you can *do* at the end. The map is derived backward from it.",
    example: "Goal: \"design and operate a learning-map engine.\" Everything earlier exists to reach it.",
    prerequisites: [], introducedIn: "lm-intro" },

  // ============ lm-graph: the concept graph ============
  { id: "concept-graph", term: "concept graph", layer: "data", band: "foundations",
    short: "The single SOURCE OF TRUTH of a @c{learning-map}: every concept plus the directed `prerequisite` edges between them. Edit this; everything else is derived from it.",
    example: "A file of ~20 concepts and their prerequisite links — the whole map compiles from it.",
    contrasts: ["skill-map"], prerequisites: [], introducedIn: "lm-graph",
    microQuiz: [{ id: "mq-cg", type: "true-false", prompt: "True or false: you change the curriculum by editing the concept graph, not the rendered skill tree.", correct: true, explanation: "The skill tree is derived; the concept graph is the source of truth." }] },
  { id: "prerequisite", term: "prerequisite", layer: "data", band: "foundations",
    short: "A directed edge in the @c{concept-graph}: \"understand X before Y.\" It is the one relation that orders and gates the map; each edge carries a *why* and a *kind*.",
    example: "`prerequisite → concept-graph`: you can't grasp a prerequisite edge without first having the graph it lives in.",
    prerequisites: [], introducedIn: "lm-graph" },
  { id: "acyclicity", term: "acyclicity", layer: "logic", band: "foundations",
    short: "The @c{prerequisite} relation must have no cycles. A cycle (\"A needs B needs A\") is a *decomposition error* to resolve — name a primitive, or split into maturity versions — not a feature.",
    example: "If two concepts each list the other as a prerequisite, neither can ever be taught first.",
    prerequisites: [], introducedIn: "lm-graph" },

  // ============ lm-derive: everything derives ============
  { id: "derivation", term: "derivation", layer: "system", band: "foundations",
    short: "The principle that the skill map, the recommended path, the glossary, and the per-concept panels are all *computed* from the @c{concept-graph} — never hand-maintained alongside it.",
    example: "Add one concept to the graph and its node, position, path slot, and glossary entry all appear automatically.",
    prerequisites: [], introducedIn: "lm-derive" },
  { id: "skill-map", term: "skill map", layer: "data", band: "foundations",
    short: "The navigable view @c{derivation} produces from the @c{concept-graph}: nodes (grouped concepts) and edges (lifted @c{prerequisite}s), plus the recommended path. It's an output, not a thing you edit.",
    example: "The homepage tree here is the derived skill map of the engine's concepts.",
    contrasts: ["concept-graph"], prerequisites: [], introducedIn: "lm-derive" },
  { id: "definition-closure", term: "definition closure", layer: "logic", band: "foundations",
    short: "No forward references: every concept a definition leans on (via a @c{concept-graph} chip) must be a transitive @c{prerequisite} — introduced at-or-before, never later. \"Has this been explained yet?\" becomes a build check.",
    example: "A page can't use \"reasoner\" in a chip unless reasoner is already a prerequisite of what it's teaching.",
    prerequisites: [], introducedIn: "lm-derive" },
  { id: "derived-not-drifted", term: "derived, not drifted", layer: "system", band: "foundations",
    short: "Because every view comes from @c{derivation} over one source, the views *cannot* fall out of sync the way a hand-maintained map and its table of contents silently do.",
    example: "Reorder the concepts and the path, positions, and glossary all re-derive consistently — no stale copy to forget.",
    prerequisites: [], introducedIn: "lm-derive" },

  // ============ lm-gates: the gate suite + the key insight ============
  { id: "gate-suite", term: "gate suite", layer: "system", band: "foundations",
    short: "The automated checks every map must pass on each change: built on the @c{concept-graph}, it enforces @c{acyclicity}, @c{definition-closure}, coverage, richness, layout, and parity. A change that fails a gate is not shippable.",
    example: "`npm run check` runs the whole suite; a forward reference or a cycle turns it red.",
    contrasts: ["llm-judge", "propose-gate-revise"], prerequisites: [], introducedIn: "lm-gates",
    microQuiz: [{ id: "mq-gs", type: "true-false", prompt: "True or false: the gate suite mainly checks the *structure* of a map, not whether its content is true or well-taught.", correct: true, explanation: "Structural gates are necessary, not sufficient — see structure-not-quality." }] },
  { id: "coverage-contract", term: "coverage contract", layer: "system", band: "foundations",
    short: "A declared list of the key ideas a map MUST contain, that the @c{gate-suite} enforces against the @c{goal} — so a curriculum can't silently lose a core idea, and \"won't do yet\" is explicit.",
    example: "If the contract requires \"the generator\" and no such concept exists, the gate fails.",
    prerequisites: [], introducedIn: "lm-gates" },
  { id: "goal-closure", term: "goal closure", layer: "logic", band: "foundations",
    short: "The backward @c{prerequisite} closure of a @c{goal} in the @c{concept-graph}: everything the learner genuinely needs to reach it. Concepts inside it are *core*; reachable-but-off-path ones are *enrichment*.",
    example: "Walk back from \"the generator\" and the closure is exactly the concepts it depends on.",
    prerequisites: [], introducedIn: "lm-gates" },
  { id: "structure-not-quality", term: "structure ≠ quality", layer: "logic", band: "foundations",
    short: "The key insight: the @c{gate-suite} verifies *form* (closure, acyclicity, coverage) — NOT truth and NOT teaching quality. A map can pass every gate and still be wrong or flat. The cheap, structurally-valid output is the trap.",
    example: "A thin, factually-wrong, definition-first map passes the structural gates green.",
    contrasts: ["craft-gate"], prerequisites: [], introducedIn: "lm-gates",
    microQuiz: [{ id: "mq-snq", type: "multiple-choice", prompt: "A map passes every structural gate. What does that guarantee?", options: ["It is correct and well-taught", "Only that its structure is well-formed — not truth or quality", "Nothing at all", "That a human reviewed it"], correct: 1, explanation: "Structural validity is necessary, not sufficient; truth + craft need other gates." }] },

  // ============ lm-judges: making quality gateable ============
  { id: "llm-judge", term: "LLM judge", layer: "system", band: "foundations",
    short: "An LLM used as a *gate*: graded against a frozen calibration set, run with self-consistency (vote of several samples), failing only on a stable verdict. It turns soft judgments the @c{structure-not-quality} gates can't make into checkable ones.",
    example: "A judge that reads a definition and votes \"correct / wrong\", calibrated so its false-pass rate is known.",
    contrasts: ["gate-suite"], prerequisites: [], introducedIn: "lm-judges" },
  { id: "correctness-profile", term: "correctness profile", layer: "system", band: "foundations",
    short: "A per-domain truth check built on an @c{llm-judge}: a system prompt + a named trap-list + a frozen case set, plugged into the @c{gate-suite}. Different domains (OWL, math, code) need different traps.",
    example: "The OWL profile hunts open-world / no-unique-names traps; a math profile hunts proof-vs-truth confusions.",
    contrasts: ["craft-gate"], prerequisites: [], introducedIn: "lm-judges" },
  { id: "craft-bar", term: "craft bar", layer: "system", band: "foundations",
    short: "What makes a page *teach*, not merely inform: open with a hook (show what made you care), lead with a picture/analogy, then run a Therefore/But spine — and explain every symbol. A @c{learning-map} that ignores it is flat even when correct.",
    example: "A page that opens \"X is defined as…\" fails the bar; one that opens with the problem X solves passes.",
    prerequisites: [], introducedIn: "lm-judges" },
  { id: "craft-gate", term: "craft gate", layer: "system", band: "foundations",
    short: "An @c{llm-judge} for the @c{craft-bar}: does this page hook, lead with an analogy, run a Therefore/But arc? It is the BUILDABLE fix for \"gates miss quality\" (@c{structure-not-quality}) — same calibrate-and-iterate pattern as a correctness judge.",
    example: "The judge scores a draft page against the craft bar and fails the ones that open with a definition.",
    contrasts: ["correctness-profile", "structure-not-quality"], prerequisites: [], introducedIn: "lm-judges" },

  // ============ lm-engine: one engine, many curricula ============
  { id: "engine-vs-curriculum", term: "engine vs curriculum", layer: "system", band: "foundations",
    short: "The split that lets one system serve many goals: the **engine** is CODE (the @c{derivation}, the @c{gate-suite}, the renderer); the **curriculum** is DATA (the concepts + lessons for one goal). The engine consumes any curriculum.",
    example: "godel, second-brain, and this map would each be a curriculum the same engine builds and gates.",
    prerequisites: [], introducedIn: "lm-engine" },
  { id: "curriculum-interface", term: "curriculum interface", layer: "system", band: "foundations",
    short: "The typed boundary a curriculum exports for the engine to consume (concepts, lessons, coverage, domain config) — the contract that makes @c{engine-vs-curriculum} real instead of a copied fork.",
    example: "An interface with `{ concepts, lessons, coverage, domain }` the engine validates and renders.",
    prerequisites: [], introducedIn: "lm-engine" },

  // ============ lm-generator: a learning map for any goal ============
  { id: "propose-gate-revise", term: "propose → gate → revise", layer: "system", band: "foundations",
    short: "The loop that makes generation trustworthy: an agent *proposes* content, the @c{gate-suite} (+ @c{llm-judge}s) reject what fails, the agent *revises*, repeat until green. The gates are what let it run without shipping garbage.",
    example: "Propose a module → gates flag a forward reference and a wrong claim → revise → re-gate → green.",
    contrasts: ["gate-suite"], prerequisites: [], introducedIn: "lm-generator" },
  { id: "generator", term: "the generator", layer: "system", band: "foundations",
    short: "Goal + sources → a gated curriculum, via @c{propose-gate-revise}, held to a @c{coverage-contract}, a @c{correctness-profile}, and a @c{craft-gate}. The moonshot: \"a learning map for any goal\" — including describing a codebase.",
    example: "Give it \"teach linear algebra\" + a syllabus; get back a gated learning map.",
    contrasts: ["learning-map"], prerequisites: [], introducedIn: "lm-generator" },
  { id: "division-of-labor", term: "division of labor", layer: "system", band: "foundations",
    short: "Who does what in the @c{generator}: *programmatic* for coverage + enforcement (the gates), *agents* for generation + judgment, *humans* for direction + taste. Each does what it's reliably good at.",
    example: "The gate suite enforces closure (deterministic); an agent writes the prose; a human picks the voice.",
    prerequisites: [], introducedIn: "lm-generator" },
];

export const CONCEPT_GRAPH: ConceptGraph = { concepts: CONCEPTS };

export const CONCEPT_BY_ID: Record<string, Concept> = Object.fromEntries(
  CONCEPTS.map((c) => [c.id, c]),
);

/** Per-edge justification for every prerequisite, keyed `"concept>prerequisite"`. */
export const PREREQ_WHY: Record<string, string> = {
  "goal>learning-map": "a goal is the terminal capability of a learning map",
  "concept-graph>learning-map": "the concept graph is what a learning map is built from",
  "prerequisite>concept-graph": "a prerequisite is an edge within the concept graph",
  "acyclicity>prerequisite": "acyclicity is a property of the prerequisite relation",
  "derivation>concept-graph": "derivation computes views from the concept graph",
  "skill-map>derivation": "the skill map is a product of derivation",
  "skill-map>concept-graph": "the skill map's nodes/edges come from the concept graph",
  "skill-map>prerequisite": "skill-map edges are lifted prerequisite edges",
  "definition-closure>concept-graph": "closure is checked over the concept graph",
  "definition-closure>prerequisite": "closure means refs must be transitive prerequisites",
  "derived-not-drifted>derivation": "no-drift is the consequence of derivation from one source",
  "gate-suite>concept-graph": "the gates run over the concept graph",
  "gate-suite>definition-closure": "closure is one of the gates",
  "gate-suite>acyclicity": "acyclicity is one of the gates",
  "coverage-contract>gate-suite": "the coverage contract is enforced by the gate suite",
  "coverage-contract>goal": "coverage is defined relative to the goal's key ideas",
  "goal-closure>goal": "goal closure is the backward closure of a goal",
  "goal-closure>concept-graph": "the closure is computed over the concept graph",
  "goal-closure>prerequisite": "the closure walks backward along prerequisite edges",
  "structure-not-quality>gate-suite": "the insight is about what the gate suite does and doesn't check",
  "llm-judge>structure-not-quality": "the LLM judge exists to check what structural gates can't",
  "correctness-profile>llm-judge": "a correctness profile is a kind of LLM judge",
  "correctness-profile>gate-suite": "it plugs into the gate suite as a gate",
  "correctness-profile>coverage-contract": "it checks truth across the contracted key ideas",
  "craft-bar>learning-map": "the craft bar is the quality standard for a learning map's pages",
  "craft-gate>llm-judge": "the craft gate is an LLM judge",
  "craft-gate>craft-bar": "the craft gate grades against the craft bar",
  "engine-vs-curriculum>derivation": "the engine owns derivation",
  "engine-vs-curriculum>gate-suite": "the engine owns the gate suite",
  "curriculum-interface>engine-vs-curriculum": "the interface realizes the engine/curriculum split",
  "propose-gate-revise>gate-suite": "the loop revises until the gate suite passes",
  "propose-gate-revise>llm-judge": "the loop's gates include LLM judges",
  "generator>propose-gate-revise": "the generator runs the propose-gate-revise loop",
  "generator>coverage-contract": "the generator targets the coverage contract",
  "generator>correctness-profile": "the generator is gated by the correctness profile",
  "generator>craft-gate": "the generator is gated by the craft gate",
  "division-of-labor>generator": "the division of labor describes how the generator is run",
};

export function prereqWhy(concept: string, prereq: string): string | undefined {
  return PREREQ_WHY[`${concept}>${prereq}`];
}

// The concept literals above declare their edges only in PREREQ_WHY/PREREQ_KIND
// (keyed "concept>prereq"). Populate each concept's `prerequisites` array from that
// single edge table so the graph has exactly one source of truth for its edges.
for (const c of CONCEPTS) c.prerequisites = [];
for (const key of Object.keys(PREREQ_WHY)) {
  const [concept, prereq] = key.split(">");
  const c = CONCEPT_BY_ID[concept];
  if (c && !c.prerequisites.includes(prereq)) c.prerequisites.push(prereq);
}

/** Semantic KIND of each prerequisite edge (ADR-0005). Annotation only. */
export const PREREQ_KINDS = ["is-a", "part-of", "defined-via", "operates-on", "refines", "assumes"] as const;
export type PrereqKind = (typeof PREREQ_KINDS)[number];

export const PREREQ_KIND: Record<string, PrereqKind> = {
  "goal>learning-map": "part-of",
  "concept-graph>learning-map": "part-of",
  "prerequisite>concept-graph": "part-of",
  "acyclicity>prerequisite": "refines",
  "derivation>concept-graph": "operates-on",
  "skill-map>derivation": "defined-via",
  "skill-map>concept-graph": "operates-on",
  "skill-map>prerequisite": "operates-on",
  "definition-closure>concept-graph": "operates-on",
  "definition-closure>prerequisite": "refines",
  "derived-not-drifted>derivation": "refines",
  "gate-suite>concept-graph": "operates-on",
  "gate-suite>definition-closure": "part-of",
  "gate-suite>acyclicity": "part-of",
  "coverage-contract>gate-suite": "part-of",
  "coverage-contract>goal": "operates-on",
  "goal-closure>goal": "operates-on",
  "goal-closure>concept-graph": "operates-on",
  "goal-closure>prerequisite": "operates-on",
  "structure-not-quality>gate-suite": "refines",
  "llm-judge>structure-not-quality": "assumes",
  "correctness-profile>llm-judge": "is-a",
  "correctness-profile>gate-suite": "part-of",
  "correctness-profile>coverage-contract": "operates-on",
  "craft-bar>learning-map": "refines",
  "craft-gate>llm-judge": "is-a",
  "craft-gate>craft-bar": "operates-on",
  "engine-vs-curriculum>derivation": "part-of",
  "engine-vs-curriculum>gate-suite": "part-of",
  "curriculum-interface>engine-vs-curriculum": "refines",
  "propose-gate-revise>gate-suite": "operates-on",
  "propose-gate-revise>llm-judge": "operates-on",
  "generator>propose-gate-revise": "part-of",
  "generator>coverage-contract": "operates-on",
  "generator>correctness-profile": "operates-on",
  "generator>craft-gate": "operates-on",
  "division-of-labor>generator": "refines",
};

export function prereqKindOf(concept: string, prereq: string): PrereqKind | undefined {
  return PREREQ_KIND[`${concept}>${prereq}`];
}

/** Direct prerequisite ids of a concept. */
export function conceptPrereqs(id: string): string[] {
  return CONCEPT_BY_ID[id]?.prerequisites ?? [];
}

/** All transitive prerequisites of a concept. */
export function conceptAncestors(id: string): Set<string> {
  const seen = new Set<string>();
  const stack = [...conceptPrereqs(id)];
  while (stack.length) {
    const n = stack.pop()!;
    if (seen.has(n)) continue;
    seen.add(n);
    stack.push(...conceptPrereqs(n));
  }
  return seen;
}

/** Concepts a given stage formally introduces. */
export function conceptsForStage(lessonId: string): Concept[] {
  return CONCEPTS.filter((c) => c.introducedIn === lessonId);
}

/** Out-of-page prerequisite concepts for a stage (ADR-0007). */
export function prerequisiteConceptsForStage(lessonId: string): Concept[] {
  const own = new Set(conceptsForStage(lessonId).map((c) => c.id));
  const prereqIds = new Set<string>();
  for (const c of conceptsForStage(lessonId))
    for (const p of c.prerequisites) if (!own.has(p)) prereqIds.add(p);
  return conceptTopoOrder()
    .filter((id) => prereqIds.has(id))
    .map((id) => CONCEPT_BY_ID[id])
    .filter(Boolean);
}

/** Concept ids in a dependency-respecting (simplest-first) order. */
export function conceptTopoOrder(): string[] {
  const visited = new Set<string>();
  const order: string[] = [];
  const visit = (id: string) => {
    if (visited.has(id)) return;
    visited.add(id);
    for (const p of CONCEPT_BY_ID[id]?.prerequisites ?? []) visit(p);
    order.push(id);
  };
  for (const c of CONCEPTS) visit(c.id);
  return order;
}
