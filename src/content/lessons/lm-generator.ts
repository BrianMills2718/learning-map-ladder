/**
 * lm-generator (stage 6) — the propose→gate→revise loop, the generator (goal +
 * sources → a gated curriculum), and the division of labor.
 */
import type { Lesson } from "../../types";

export const lmGenerator: Lesson = {
  id: "lm-generator",
  stage: 6,
  title: "The generator: a learning map for any goal",
  summary:
    "Put it together. An agent proposes content, the gates reject what fails, the agent revises — propose → gate → revise. That loop, held to a coverage contract, a correctness profile, and a craft gate, is the generator: a learning map for any goal. The division of labor says who does what.",
  prerequisites: ["lm-engine"],
  objectives: [
    "Describe the propose → gate → revise loop and why the gates are what make it safe.",
    "Define the generator: goal + sources → a gated curriculum.",
    "State the division of labor: programmatic for enforcement, agents for generation, humans for direction.",
  ],
  definitions: [
    { term: "propose → gate → revise", short: "The loop that makes generation trustworthy: an agent proposes content, the gate suite (+ LLM judges) reject what fails, the agent revises, repeat until green.", example: "Propose a module → gates flag a forward reference and a wrong claim → revise → re-gate → green." },
    { term: "the generator", short: "Goal + sources → a gated curriculum, via propose→gate→revise, held to a coverage contract, a correctness profile, and a craft gate. The moonshot: a learning map for any goal.", example: "Give it \"teach linear algebra\" + a syllabus; get back a gated learning map." },
    { term: "division of labor", short: "Who does what: programmatic for coverage + enforcement (the gates), agents for generation + judgment, humans for direction + taste.", example: "Gates enforce closure; an agent writes the prose; a human picks the voice." },
  ],
  sections: [
    {
      heading: "The loop that makes generation safe",
      body: `Everything has been building to this. The @c{engine-vs-curriculum} split means a curriculum is just data — so what if an *agent* produced that data? The danger is obvious: agents hallucinate and write flat prose. The answer is the **@c{propose-gate-revise}** loop: the agent *proposes* content, the @c{gate-suite} (plus the @c{llm-judge}s) *reject* what fails — a forward reference, a wrong claim, a flat page — and the agent *revises*. Repeat until green.

The gates are the whole reason it can run unattended: they're what let an agent generate without shipping garbage.`,
    },
    {
      heading: "The generator, and who does what",
      body: `Wrap that loop and you get the **@c{generator}**: goal + sources → a gated curriculum, held to a @c{coverage-contract}, a @c{correctness-profile}, and a @c{craft-gate}. The moonshot is \"a @c{learning-map} for any @c{goal}\" — including describing a codebase.

**But** the generator isn't all-agent. The **@c{division-of-labor}** says who does what reliably: *programmatic* for coverage and enforcement (the gates are deterministic), *agents* for generation and judgment, *humans* for direction and taste. **Therefore** each part does what it's actually good at — the gates enforce closure, an agent writes the prose, a human picks the voice and the goal.`,
    },
  ],
  visualizations: [
    {
      id: "lm-generator-viz",
      kind: "typed-graph",
      title: "The generator: a goal in, a gated curriculum out, via propose→gate→revise",
      textualSummary:
        "On the left, 'goal + sources' feed an 'agent (propose)' node. The agent's draft goes to the 'gate suite + judges', which either sends it back to the agent ('revise' — a loop edge) or, once green, out to a 'gated curriculum'. A 'human (direction)' node points into the goal. This is propose → gate → revise; the division of labor is visible: humans direct, agents propose, gates enforce.",
      layers: ["system"],
      nodes: [
        { id: "human", type: "System", layer: "system", label: "human (direction)", position: { x: 40, y: 30 } },
        { id: "goal", type: "System", layer: "system", label: "goal + sources", position: { x: 40, y: 130 } },
        { id: "agent", type: "System", layer: "system", label: "agent (propose)", position: { x: 280, y: 130 } },
        { id: "gates", type: "System", layer: "system", label: "gate suite + judges", position: { x: 520, y: 130 } },
        { id: "out", type: "System", layer: "system", label: "gated curriculum", position: { x: 760, y: 130 } },
      ],
      edges: [
        { id: "g1", source: "human", target: "goal", type: "relation", label: "sets", layer: "system" },
        { id: "g2", source: "goal", target: "agent", type: "relation", label: "feeds", layer: "system" },
        { id: "g3", source: "agent", target: "gates", type: "relation", label: "proposes", layer: "system" },
        { id: "g4", source: "gates", target: "agent", type: "relation", label: "revise", layer: "system" },
        { id: "g5", source: "gates", target: "out", type: "verifies", label: "when green", layer: "system" },
      ],
    },
  ],
  confusions: [
    {
      misconception: "If an agent writes the curriculum, you just trust its output.",
      correction:
        "No — the agent's output passes through the gate suite and judges, which reject forward references, wrong claims, and flat prose. The agent revises until green; the gates are what make unattended generation safe.",
    },
    {
      misconception: "The generator replaces humans entirely.",
      correction:
        "The division of labor keeps humans for direction and taste, agents for generation and judgment, and programmatic gates for enforcement. Each does what it's reliably good at.",
    },
  ],
  quiz: [
    {
      id: "lm-generator-q1",
      type: "multiple-choice",
      prompt: "Why is the propose → gate → revise loop safe to run with an agent?",
      options: [
        "Because agents never make mistakes.",
        "Because the gate suite and judges reject what fails, so the agent revises until the output is green.",
        "Because a human writes every page.",
        "Because there are no gates.",
      ],
      correct: 1,
      explanation: "The gates are the safety net: they catch forward references, wrong claims, and flat prose, forcing revision until the map passes.",
    },
    {
      id: "lm-generator-q2",
      type: "multiple-choice",
      prompt: "What is the generator, in one line?",
      options: [
        "A renderer for a fixed curriculum.",
        "Goal + sources → a gated curriculum, via propose→gate→revise, held to coverage, correctness, and craft.",
        "A glossary builder.",
        "A way to remove the gate suite.",
      ],
      correct: 1,
      explanation: "The generator turns a goal plus sources into a gated curriculum by running the loop against the contract and the judges.",
    },
    {
      id: "lm-generator-q3",
      type: "multiple-choice",
      prompt: "In the division of labor, what is the programmatic part responsible for?",
      options: [
        "Writing the prose.",
        "Coverage and enforcement — the deterministic gates.",
        "Choosing the voice and the goal.",
        "Hallucinating candidates.",
      ],
      correct: 1,
      explanation: "Programmatic = the deterministic gates (coverage, closure, acyclicity); agents generate, humans direct.",
    },
  ],
  masteryCheckpoint:
    "You can describe the propose→gate→revise loop and why its gates make generation safe, define the generator, and state the division of labor across programs, agents, and humans.",
};
