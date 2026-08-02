import course from "@/content/course.json";

import { Framework } from "../models/Framework";

interface Course {
  chapters: CourseChapter[];
}

interface CourseChapter {
  id: string;
  title: string;
  sections: CourseSection[];
}

interface CourseSection {
  id: string;
  title: string;
  frameworks?: RawFramework[];
}

interface RawFramework {
  id: string;
  title: string;
  description: string;
  content: string;
  examples?: {
    title: string;
    content: string;
  }[];
  aiOutputs?: {
    content: string;
  }[];
}

export class KnowledgeLoader {
  public loadFrameworks(): Framework[] {
    const frameworks: Framework[] = [];

    const data = course as Course;

    data.chapters.forEach((chapter) => {
      chapter.sections.forEach((section) => {
        if (!section.frameworks?.length) return;

        section.frameworks.forEach((framework) => {
          frameworks.push({
            id: framework.id,
            title: framework.title,
            description: framework.description,
            content: framework.content,

            chapterId: chapter.id,
            chapterTitle: chapter.title,

            sectionId: section.id,
            sectionTitle: section.title,

            examples: framework.examples ?? [],
            aiOutputs: framework.aiOutputs ?? [],

            keywords: [],
            tags: [],
            roles: [],
            domains: [],
            lifecycle: [],

            difficulty: "Beginner",

            relatedFrameworks: []
          });
        });
      });
    });

    return frameworks;
  }
}

export default new KnowledgeLoader();