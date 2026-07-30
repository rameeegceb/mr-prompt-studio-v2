export interface Framework {

    id: string;

    title: string;

    description: string;

    content: string;

    chapterId: string;
    chapterTitle: string;

    sectionId: string;
    sectionTitle: string;

    keywords: string[];

    tags: string[];

    metadata: {

        roles: string[];

        domains: string[];

        lifecycle: string[];

        industries: string[];

        promptTypes: string[];

        difficulty: "Beginner" | "Intermediate" | "Advanced";

    };

    techniques: Technique[];

    examples: Example[];

    bestPractices: BestPractice[];

    relatedFrameworks: string[];

}interface Framework {
  id: string;
  title: string;
  description: string;
  content: string;

  chapterId: string;
  chapterTitle: string;
  sectionId: string;
  sectionTitle: string;

  examples: Example[];
  aiOutputs: AIOutput[];

  keywords: string[];
  tags: string[];
  roles: string[];
  domains: string[];
  lifecycle: string[];

  difficulty: "Beginner" | "Intermediate" | "Advanced";

  relatedFrameworks: string[];
}