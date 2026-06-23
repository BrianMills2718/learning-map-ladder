/**
 * The skill DAG — a DERIVED VIEW of the concept graph (see docs/PATH_DERIVATION.md, R14).
 * One concept node is generated per lesson/module; positions are auto-laid-out by stage;
 * the concept→concept prerequisite backbone is lifted from concepts.ts via
 * deriveStageEdges(). The ONLY hand-authored part is the achievement overlay (capstones
 * carry assessment refs + their prerequisite modules) and the orientation link. To add a
 * module: add its lesson + tag its concepts' introducedIn — the node, edges, position,
 * path slot, and concept panel all derive. Do NOT hand-add skill nodes here.
 */
import type { SkillGraph, SkillNode, SkillEdge, Branch } from "../types";
import { deriveStageEdges, transitiveReduction } from "./derive";
import { LESSONS } from "./lessons";

const nodeId = (lessonId: string): string => "c-" + lessonId.replace(/^(sb|lm)-/, "");

/** Branch is cosmetic (node colour); declared per module, defaults to foundations. */
const BRANCH: Record<string, Branch> = {
  "lm-intro": "foundations",
  "lm-graph": "knowledge-graphs",
  "lm-derive": "knowledge-graphs",
  "lm-gates": "logic",
  "lm-judges": "reasoning",
  "lm-engine": "neurosymbolic",
  "lm-generator": "second-brain",
};

const firstSentence = (s: string): string => (s.split(/(?<=\.)\s/)[0] ?? s).slice(0, 96);

// --- DERIVED concept nodes: one per lesson/module, auto-positioned by stage (R14). ---
const MODULE_COLW = 230;
const byStage = [...LESSONS].sort((a, b) => a.stage - b.stage);
const conceptNodes: SkillNode[] = byStage.map((l, i) => ({
  id: nodeId(l.id),
  kind: "concept",
  branch: BRANCH[l.id] ?? "foundations",
  lessonId: l.id,
  title: l.title,
  shortDescription: firstSentence(l.summary),
  position: { x: l.stage * MODULE_COLW + 40, y: (i % 2) * 80 + 40 },
}));

// --- Achievement overlay (authored: assessment refs + prerequisite modules). ---
const achievementDefs: { id: string; branch: Branch; title: string; short: string; assessmentIds: string[]; prereqs: string[] }[] = [
  { id: "a-engine", branch: "second-brain", title: "Design a learning-map engine", short: "Spec a goal→curriculum generator: derivation, gates, judges, the engine/curriculum split, and the propose→gate→revise loop.", assessmentIds: ["cap-engine"], prereqs: ["c-generator"] },
];
const posOf = (id: string): { x: number; y: number } | undefined => conceptNodes.find((n) => n.id === id)?.position;
const achievementNodes: SkillNode[] = achievementDefs.map((a, i) => ({
  id: a.id,
  kind: "achievement",
  branch: a.branch,
  title: a.title,
  shortDescription: a.short,
  assessmentIds: a.assessmentIds,
  position: { x: Math.max(40, ...a.prereqs.map((p) => posOf(p)?.x ?? 40)) + MODULE_COLW, y: 320 + (i % 2) * 90 },
}));

const NODES: SkillNode[] = [...conceptNodes, ...achievementNodes];

// --- DERIVED prerequisite backbone (concepts.ts → module nodes). ---
const STAGE_TO_NODE: Record<string, string> = {};
for (const n of NODES) if (n.lessonId) STAGE_TO_NODE[n.lessonId] = n.id;

const DERIVED_PREREQS: [string, string][] = deriveStageEdges()
  .map(([a, b]) => [STAGE_TO_NODE[a], STAGE_TO_NODE[b]] as [string, string])
  .filter(([a, b]) => !!a && !!b);

const CONCEPT_PREREQS: [string, string][] = transitiveReduction(
  Array.from(new Map(DERIVED_PREREQS.map((e) => [`${e[0]}>${e[1]}`, e])).values()),
);

const ACHIEVEMENT_PREREQS: [string, string][] = achievementDefs.flatMap((a) =>
  a.prereqs.map((p) => [p, a.id] as [string, string]),
);

const PREREQS: [string, string][] = [...CONCEPT_PREREQS, ...ACHIEVEMENT_PREREQS];

/** Soft, non-gating link: the stage-0 intro points to the first real module. */
const introModule = byStage.find((l) => l.stage === 0);
const firstModule = byStage.find((l) => l.stage > 0);
const ORIENTS: [string, string][] =
  introModule && firstModule ? [[nodeId(introModule.id), nodeId(firstModule.id)]] : [];

const EDGES: SkillEdge[] = [
  ...PREREQS.map(([source, target], i) => ({ id: `e${i}`, source, target, kind: "prerequisite_for" as const })),
  ...ORIENTS.map(([source, target], i) => ({ id: `o${i}`, source, target, kind: "orients" as const })),
];

export const SKILL_GRAPH: SkillGraph = { nodes: NODES, edges: EDGES };

export const ROOT_GOAL_ID = "a-engine";

export function nodeById(id: string): SkillNode | undefined {
  return SKILL_GRAPH.nodes.find((n) => n.id === id);
}

export function nodeForLesson(lessonId: string): SkillNode | undefined {
  return SKILL_GRAPH.nodes.find((n) => n.lessonId === lessonId);
}

export function achievements(): SkillNode[] {
  return SKILL_GRAPH.nodes.filter((n) => n.kind === "achievement");
}

export function prereqsOf(id: string): string[] {
  return SKILL_GRAPH.edges
    .filter((e) => e.kind === "prerequisite_for" && e.target === id)
    .map((e) => e.source);
}

export function ancestorsOf(id: string): Set<string> {
  const seen = new Set<string>();
  const stack = [...prereqsOf(id)];
  while (stack.length) {
    const n = stack.pop()!;
    if (seen.has(n)) continue;
    seen.add(n);
    stack.push(...prereqsOf(n));
  }
  return seen;
}
