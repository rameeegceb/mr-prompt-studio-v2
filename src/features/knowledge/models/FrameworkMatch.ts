import { Framework } from "./Framework";

export interface FrameworkMatch {
  framework: Framework;

  confidence: number;

  score: number;

  reason: string;
}