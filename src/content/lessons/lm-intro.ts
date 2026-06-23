/**
 * lm-intro (stage 0) — what a learning map IS, and the goal it's built backward from.
 * Concept-first: the idea of a navigable, ordered, gated path lands before any machinery.
 */
import type { Lesson } from "../../types";

export const lmIntro: Lesson = {
  id: "lm-intro",
  stage: 0,
  title: "What a learning map is",
  summary:
    "A learning map is not an article you read — it's a path you climb: the right things to learn for a goal, in an order where nothing is used before it's introduced. This first stage meets that idea and the goal it's derived backward from.",
  prerequisites: [],
  objectives: [
    "Distinguish a learning map (an ordered, navigable path) from a pile of articles.",
    "Name the terminal goal as the thing the whole map is derived backward from.",
    "See this site as a learning map of the learning-map engine itself.",
  ],
  definitions: [
    { term: "learning map", short: "A navigable, quality-gated curriculum built from a concept graph: the right things to learn, in an order where nothing is used before it's introduced.", example: "This site is a learning map of the learning-map engine." },
    { term: "goal", short: "The terminal capability a learning map teaches — what you can *do* at the end. The map is derived backward from it.", example: "\"Design and operate a learning-map engine.\"" },
  ],
  sections: [
    {
      heading: "The drawer vs. the path",
      body: `You bookmark forty great articles about a subject. A year later you still can't *do* the thing. Why? A pile of articles is a **drawer**: no order, no \"you need this before that\", no end you're climbing toward. You open it and drown.

A **@c{learning-map}** is the opposite. It's a *path*: a small set of the right ideas, arranged so that nothing is ever used before it's been introduced. You climb it, and at the top you can do something you couldn't before.`,
    },
    {
      heading: "Built backward from a goal",
      body: `**Therefore** the first question is never \"what should I cover?\" — it's \"what should the learner be able to *do* at the end?\" That terminal capability is the **@c{goal}**.

The whole map is derived *backward* from the goal: start at \"design and operate a learning-map engine\", and pull in only what's genuinely needed to get there. **But** that means the map is only as honest as its ordering — which is what the rest of these stages make checkable.

This very site is a learning map *of the learning-map engine*. The nodes are its ideas; the order is their dependencies.`,
    },
  ],
  visualizations: [
    {
      id: "lm-intro-viz",
      kind: "typed-graph",
      title: "A drawer of articles vs. a map climbing to a goal",
      textualSummary:
        "Left: three disconnected article nodes (a 'drawer' — no order, no goal). Right: three nodes connected in a line that climbs toward a 'goal' node — each link means 'learn this before that'. A learning map is the right picture: an ordered path derived backward from the goal.",
      layers: ["system"],
      nodes: [
        { id: "a1", type: "Diagram", layer: "system", label: "article", position: { x: 40, y: 30 } },
        { id: "a2", type: "Diagram", layer: "system", label: "article", position: { x: 40, y: 110 } },
        { id: "step1", type: "System", layer: "system", label: "idea 1", position: { x: 300, y: 30 } },
        { id: "step2", type: "System", layer: "system", label: "idea 2", position: { x: 460, y: 30 } },
        { id: "goal", type: "System", layer: "system", label: "goal", position: { x: 620, y: 30 } },
      ],
      edges: [
        { id: "p1", source: "step1", target: "step2", type: "relation", label: "before", layer: "system" },
        { id: "p2", source: "step2", target: "goal", type: "relation", label: "before", layer: "system" },
      ],
    },
  ],
  confusions: [
    {
      misconception: "A learning map is just a reading list you can take in any order.",
      correction:
        "No — order is the whole point. A learning map is an ordered path where every idea's prerequisites come before it. Shuffle it and you get forward references: things used before they're explained.",
    },
    {
      misconception: "You design a learning map by listing everything in the field.",
      correction:
        "You design it backward from a goal. The goal is the terminal capability; you pull in only what's needed to reach it. Coverage-for-its-own-sake is how the drawer happens.",
    },
  ],
  quiz: [
    {
      id: "lm-intro-q1",
      type: "multiple-choice",
      prompt: "What most distinguishes a learning map from a folder of bookmarked articles?",
      options: [
        "A learning map is longer.",
        "A learning map is an ordered path where nothing is used before it's introduced.",
        "A learning map can only contain videos.",
        "A learning map has no goal.",
      ],
      correct: 1,
      explanation:
        "The defining feature is the order: prerequisites come before what needs them, so you never hit a forward reference.",
      wrongExplanations: {
        "0": "Length isn't the point — a good map is often smaller because it's pruned to the goal.",
        "2": "Medium is irrelevant; structure (ordered, gated) is what matters.",
        "3": "A learning map is *defined* by its goal — it's derived backward from one.",
      },
    },
    {
      id: "lm-intro-q2",
      type: "true-false",
      prompt: "True or false: the goal is the terminal capability the map is derived backward from.",
      correct: true,
      explanation: "Yes — you start from what the learner should be able to do and pull in only what's needed to get there.",
    },
    {
      id: "lm-intro-q3",
      type: "multiple-choice",
      prompt: "Why start curriculum design from the goal rather than from \"everything in the field\"?",
      options: [
        "Because fields are small.",
        "So the map stays a pruned path to a capability, not an unordered drawer of everything.",
        "Because goals are optional.",
        "Because ordering doesn't matter.",
      ],
      correct: 1,
      explanation:
        "Working backward from the goal keeps the map minimal and ordered; covering everything is exactly how you get the unusable drawer.",
    },
  ],
  masteryCheckpoint:
    "You can explain why a learning map is an ordered path rather than a drawer of articles, and that it's derived backward from a terminal goal.",
};
