/**
 * The ordered lesson list (one per module/page). Order = stage order, the
 * recommended path. UPCOMING shows not-yet-authored topics greyed.
 */
import type { Lesson } from "../../types";
import { lmIntro } from "./lm-intro";
import { lmGraph } from "./lm-graph";
import { lmDerive } from "./lm-derive";
import { lmGates } from "./lm-gates";
import { lmJudges } from "./lm-judges";
import { lmEngine } from "./lm-engine";
import { lmGenerator } from "./lm-generator";

export const LESSONS: Lesson[] = [
  lmIntro,
  lmGraph,
  lmDerive,
  lmGates,
  lmJudges,
  lmEngine,
  lmGenerator,
];

export const UPCOMING: { stage: number; title: string }[] = [];

export function lessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
