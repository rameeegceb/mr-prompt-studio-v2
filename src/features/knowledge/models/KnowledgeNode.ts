export interface KnowledgeNode {
  id: string;

  type:
    | "framework"
    | "technique"
    | "example"
    | "bestPractice";

  title: string;

  description: string;

  keywords: string[];

  tags: string[];

  chapterId: string;

  sectionId: string;
}