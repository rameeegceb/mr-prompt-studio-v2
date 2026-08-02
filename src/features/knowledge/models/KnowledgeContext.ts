import { Framework } from "./Framework";

export interface KnowledgeContext {
  framework?: Framework;

  relatedFrameworks: Framework[];

  techniques: KnowledgeNode[];

  examples: string[];

  bestPractices: string[];

  userPrompt: string;
}