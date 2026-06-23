/**
 * lm-judges (stage 4) — making quality gateable: the LLM judge, the correctness
 * profile (per-domain truth), the craft bar, and the craft gate.
 */
import type { Lesson } from "../../types";

export const lmJudges: Lesson = {
  id: "lm-judges",
  stage: 4,
  title: "Making quality gateable",
  summary:
    "If structural gates can't see truth or teaching, build gates that can. An LLM judge — calibrated, run with self-consistency — turns soft judgments into checkable ones: a correctness profile gates truth per domain, and a craft gate enforces the craft bar.",
  prerequisites: ["lm-gates"],
  objectives: [
    "Describe the LLM judge as a calibrated, self-consistent gate for soft judgments.",
    "Explain a correctness profile as a per-domain truth check built on an LLM judge.",
    "State the craft bar: hook, picture/analogy, Therefore/But spine, every symbol explained.",
    "Describe the craft gate as the buildable fix for \"gates miss quality\".",
  ],
  definitions: [
    { term: "LLM judge", short: "An LLM used as a gate: graded against a frozen calibration set, run with self-consistency, failing only on a stable verdict. It turns soft judgments into checkable ones.", example: "A judge that votes \"correct/wrong\" with a known false-pass rate." },
    { term: "correctness profile", short: "A per-domain truth check built on an LLM judge: a system prompt + a named trap-list + a frozen case set, plugged into the gate suite.", example: "An OWL profile hunts open-world / no-unique-names traps." },
    { term: "craft bar", short: "What makes a page teach: open with a hook, lead with a picture/analogy, run a Therefore/But spine — and explain every symbol.", example: "A page that opens \"X is defined as…\" fails the bar." },
    { term: "craft gate", short: "An LLM judge for the craft bar — does this page hook, lead with an analogy, run a Therefore/But arc? The buildable fix for \"gates miss quality\".", example: "The judge fails drafts that open with a definition." },
  ],
  sections: [
    {
      heading: "Turn a soft verdict into a hard gate",
      body: `The @c{structure-not-quality} insight left a hole: who checks truth and teaching? The move is to use an **@c{llm-judge}** — an LLM run *as a gate*. Not a vibe: it's graded against a *frozen calibration set* so its false-pass rate is known, and run with *self-consistency* (a vote of several samples), failing only on a stable verdict. That turns the soft judgments structural gates can't make into checkable ones.

A judge specialized for truth is a **@c{correctness-profile}**: a system prompt + a named *trap-list* + a frozen case set, plugged into the @c{gate-suite}. Different domains need different traps — an OWL profile hunts open-world/no-unique-names confusions; a math profile hunts proof-vs-truth.`,
    },
    {
      heading: "Gate the craft, not just the facts",
      body: `Truth isn't enough — a correct page can still be flat. So we name the standard: the **@c{craft-bar}**. A page that *teaches* opens with a hook (show what made you care), leads with a picture or analogy, then runs a **Therefore/But** spine — and explains every symbol. A @c{learning-map} that ignores it is flat even when correct.

**Therefore** the **@c{craft-gate}** is an @c{llm-judge} for the craft bar: does this draft hook, lead with an analogy, run the arc? It's the *buildable* fix for \"gates miss quality\" — the same calibrate-and-iterate pattern as a correctness judge, just pointed at teaching instead of truth.`,
    },
  ],
  visualizations: [
    {
      id: "lm-judges-viz",
      kind: "typed-graph",
      title: "Two judges plug into the gate suite alongside the structural gates",
      textualSummary:
        "An 'LLM judge' node feeds into two specialized gates: a 'correctness profile' (checks truth, with a domain trap-list) and a 'craft gate' (checks the craft bar: hook, analogy, Therefore/But arc). Both plug into the 'gate suite' next to the structural gates. Each judge is calibrated on a frozen set and votes with self-consistency, so soft judgments become hard gates.",
      layers: ["system"],
      nodes: [
        { id: "judge", type: "System", layer: "system", label: "LLM judge", position: { x: 40, y: 100 } },
        { id: "corr", type: "System", layer: "system", label: "correctness profile", position: { x: 300, y: 40 } },
        { id: "craft", type: "System", layer: "system", label: "craft gate", position: { x: 300, y: 170 } },
        { id: "suite", type: "System", layer: "system", label: "gate suite", position: { x: 580, y: 100 } },
      ],
      edges: [
        { id: "j1", source: "judge", target: "corr", type: "is_a", label: "specialized as", layer: "system" },
        { id: "j2", source: "judge", target: "craft", type: "is_a", label: "specialized as", layer: "system" },
        { id: "j3", source: "corr", target: "suite", type: "verifies", label: "plugs into", layer: "system" },
        { id: "j4", source: "craft", target: "suite", type: "verifies", label: "plugs into", layer: "system" },
      ],
    },
  ],
  confusions: [
    {
      misconception: "An LLM judge is just \"ask the model if it looks good\".",
      correction:
        "A judge is a gate: calibrated against a frozen case set so its error rate is known, run with self-consistency (a vote), failing only on a stable verdict. That's what makes it trustworthy enough to block a change.",
    },
    {
      misconception: "One universal correctness judge works for every subject.",
      correction:
        "Truth-traps are domain-specific. A correctness profile carries a domain trap-list (OWL's open-world traps differ from math's proof-vs-truth traps), so each domain gets its own profile.",
    },
  ],
  quiz: [
    {
      id: "lm-judges-q1",
      type: "multiple-choice",
      prompt: "What makes an LLM judge a trustworthy gate rather than a vibe check?",
      options: [
        "It runs on a faster model.",
        "It's calibrated against a frozen case set and runs with self-consistency, failing only on a stable verdict.",
        "It always passes the content.",
        "It replaces the structural gates.",
      ],
      correct: 1,
      explanation: "Calibration gives a known error rate; self-consistency (a vote) stabilizes the verdict so it can gate a change.",
    },
    {
      id: "lm-judges-q2",
      type: "true-false",
      prompt: "True or false: the craft gate is the buildable fix for the \"gates miss quality\" problem.",
      correct: true,
      explanation: "It's an LLM judge for the craft bar — the same calibrate-and-iterate pattern as a correctness judge, pointed at teaching quality.",
    },
    {
      id: "lm-judges-q3",
      type: "multiple-choice",
      prompt: "Which page is most likely to FAIL the craft bar?",
      options: [
        "One that opens with a hook, then a picture, then a Therefore/But arc.",
        "One that opens \"X is formally defined as…\" with no hook, picture, or arc.",
        "One that explains every symbol it uses.",
        "One that leads with an analogy.",
      ],
      correct: 1,
      explanation: "The craft bar wants a hook, a picture/analogy, and a Therefore/But spine; a bare definition-first opening fails it.",
    },
  ],
  masteryCheckpoint:
    "You can describe an LLM judge as a calibrated, self-consistent gate, distinguish a correctness profile from a craft gate, and state the craft bar.",
};
