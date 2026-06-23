/**
 * Machine-readable domain-coverage contract (R6 / docs/DOMAIN_COVERAGE.md). The
 * gate in validate-content.mjs asserts every REQUIRED key-idea exists as a concept
 * (FAIL on missing), and surfaces DEFERRED ideas as advisory. This turns the prose
 * coverage map into an enforced contract: the curriculum can't silently lose a core
 * idea, and "won't do yet" is explicit rather than an accidental gap.
 */

// RESCOPE MIGRATION (2026-06-22, docs/RESCOPE_PLAN.md / DOMAIN_COVERAGE.md): the contract
// is being re-pointed off the 2018 symbolic-KG scope onto the decision-first, three-paradigm
// scope. REQUIRED_CONCEPTS below is still the LEGACY set (so `npm run check` stays green);
// R1 migrates it to the new Tier-A target concept-by-concept as those concepts are authored
// (the ratchet) — add a new id here only once its concept exists in concepts.ts.

/** Tier-A key ideas that MUST exist as concepts (by id) — the 22 engine concepts. */
export const REQUIRED_CONCEPTS: string[] = [
  // lm-intro
  "learning-map", "goal",
  // lm-graph
  "concept-graph", "prerequisite", "acyclicity",
  // lm-derive
  "derivation", "skill-map", "definition-closure", "derived-not-drifted",
  // lm-gates
  "gate-suite", "coverage-contract", "goal-closure", "structure-not-quality",
  // lm-judges
  "llm-judge", "correctness-profile", "craft-bar", "craft-gate",
  // lm-engine
  "engine-vs-curriculum", "curriculum-interface",
  // lm-generator
  "propose-gate-revise", "generator", "division-of-labor",
];

/** Tier-A/B ideas explicitly DEFERRED (advisory, not a gate failure). Empty: the
 *  engine curriculum's coverage is exactly the 22 authored concepts. */
export const DEFERRED_CONCEPTS: { id: string; note: string }[] = [];
