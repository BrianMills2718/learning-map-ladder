/**
 * Achievement capstones. The single capstone earns the engine achievement — a
 * deterministic component (Quiz engine) + an open-ended design graded by the LLM
 * judge (self-assess if no backend). Fatal misconceptions fail regardless and
 * route to remediation.
 */
import type { AssessmentTask, Misconception, Rubric } from "../types";

const M: Record<string, Misconception> = {
  greenIsGood: {
    id: "green-is-good",
    description: "Treats a structurally-valid (gates-green) map as correct and well-taught — ignores structure ≠ quality.",
    remediationNodeIds: ["c-gates"],
    fatal: true,
  },
  trustAgent: {
    id: "trust-agent",
    description: "Lets an agent generate the curriculum without a gate suite + judges rejecting failures — no propose→gate→revise safety net.",
    remediationNodeIds: ["c-generator"],
    fatal: true,
  },
  forkNotInterface: {
    id: "fork-not-interface",
    description: "Reuses the engine by copying the repo per subject instead of exporting a typed curriculum through the curriculum interface.",
    remediationNodeIds: ["c-engine"],
    fatal: true,
  },
  uncalibratedJudge: {
    id: "uncalibrated-judge",
    description: "Uses an LLM as a gate without calibration on a frozen set or self-consistency — a vibe check, not a trustworthy gate.",
    remediationNodeIds: ["c-judges"],
    fatal: true,
  },
};

export const RUBRICS: Record<string, Rubric> = {
  "rub-engine": {
    id: "rub-engine",
    criteria: [
      { id: "source", description: "Names the concept graph as the single source of truth and explains that the skill map, path, glossary, and panels are derived (closure enforced, no drift).", maxScore: 25 },
      { id: "gates", description: "Describes the structural gate suite AND states its limit (structure ≠ quality): a green map can still be wrong or flat.", maxScore: 25 },
      { id: "judges", description: "Closes the quality gap with calibrated, self-consistent LLM judges — a correctness profile (per-domain truth) and a craft gate (the craft bar).", maxScore: 25 },
      { id: "generator", description: "Wires it into a generator: engine/curriculum split via a typed interface, plus a propose→gate→revise loop with a defensible division of labor (programs enforce, agents generate, humans direct).", maxScore: 25 },
    ],
  },
};

const T = (t: AssessmentTask): AssessmentTask => t;

export const ASSESSMENTS: AssessmentTask[] = [
  T({
    id: "cap-engine",
    nodeId: "a-engine",
    kind: "hybrid",
    title: "Design a learning-map engine",
    prompt: "Spec a goal→curriculum generator: how a learning map is derived from a concept graph, gated, quality-checked, and generated for any goal.",
    deterministic: [
      {
        id: "engine-q1",
        type: "classification",
        prompt: "Sort each responsibility into who owns it in a learning-map engine.",
        buckets: ["Programmatic (deterministic gates)", "Agent (generation/judgment)", "Human (direction/taste)"],
        items: [
          { id: "a", label: "Enforce definition-closure and acyclicity", correctBucket: "Programmatic (deterministic gates)" },
          { id: "b", label: "Draft the prose for a module", correctBucket: "Agent (generation/judgment)" },
          { id: "c", label: "Pick the goal and the voice", correctBucket: "Human (direction/taste)" },
          { id: "d", label: "Vote on whether a page meets the craft bar", correctBucket: "Agent (generation/judgment)" },
        ],
        explanation: "Programs enforce deterministic structure; agents generate and judge; humans set direction and taste — the division of labor.",
      },
      {
        id: "engine-q2",
        type: "classification",
        prompt: "Sort each gate by what it actually verifies.",
        buckets: ["Structure (form)", "Quality (truth / teaching)"],
        items: [
          { id: "a", label: "Definition-closure: no forward references", correctBucket: "Structure (form)" },
          { id: "b", label: "Correctness profile: is the claim true under the domain's traps?", correctBucket: "Quality (truth / teaching)" },
          { id: "c", label: "Acyclicity of the prerequisite relation", correctBucket: "Structure (form)" },
          { id: "d", label: "Craft gate: does the page hook, picture, and run a Therefore/But arc?", correctBucket: "Quality (truth / teaching)" },
        ],
        explanation: "Structural gates verify form; LLM judges (correctness profile, craft gate) verify truth and teaching — structure ≠ quality.",
      },
    ],
    openEnded: {
      prompt: "Design an engine that produces a gated learning map for any goal. (1) Say what is the source of truth and what derives from it. (2) Describe the structural gate suite and its limit (structure ≠ quality). (3) Close the quality gap with calibrated, self-consistent judges — a correctness profile and a craft gate. (4) Wire it into a generator: the engine/curriculum split through a typed interface, plus a propose→gate→revise loop, with a defensible division of labor.",
      rubricId: "rub-engine",
    },
    requiredConcepts: [
      "generator",
      "division-of-labor",
      "propose-gate-revise",
      "coverage-contract",
      "correctness-profile",
      "craft-gate",
      "engine-vs-curriculum",
      "curriculum-interface",
      "structure-not-quality",
      "gate-suite",
      "derivation",
    ],
    fatalMisconceptions: [M.greenIsGood, M.trustAgent, M.forkNotInterface, M.uncalibratedJudge],
    passThreshold: 0.8,
  }),
];

export const ASSESSMENT_BY_ID: Record<string, AssessmentTask> = Object.fromEntries(
  ASSESSMENTS.map((a) => [a.id, a]),
);
