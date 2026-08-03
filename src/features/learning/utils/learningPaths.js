const PATH_DEFINITIONS = [
  {
    id: "fundamentals",
    title: "Prompt Engineering Fundamentals",
    description:
      "Build a strong foundation before moving to structured frameworks and advanced techniques.",
    difficulty: "Beginner",
  },
  {
    id: "anatomy",
    title: "Prompt Anatomy",
    description:
      "Understand the components of high-quality prompts and how they shape output quality.",
    difficulty: "Beginner-Intermediate",
  },
  {
    id: "frameworks",
    title: "Prompt Frameworks",
    description:
      "Master reusable prompting structures to improve consistency and governance.",
    difficulty: "Intermediate",
  },
  {
    id: "techniques",
    title: "Prompt Techniques",
    description:
      "Apply modern prompting techniques for reasoning, decomposition, and reliability.",
    difficulty: "Intermediate-Advanced",
  },
  {
    id: "advanced",
    title: "Advanced Prompt Engineering",
    description:
      "Combine strategy, workflows, and role-based practices for enterprise-grade prompting.",
    difficulty: "Advanced",
  },
];

function isLearningChapter(chapter) {
  const title = chapter?.title?.trim() ?? "";
  return title.length > 0 && title !== "Table of Contents";
}

function estimateLessonMinutes(chapter) {
  const sections = chapter?.sections ?? [];

  const frameworkCount = sections.reduce(
    (count, section) =>
      count + (section.frameworks?.length ?? 0),
    0
  );

  const exampleCount = sections.reduce(
    (count, section) => {
      const sectionExamples =
        section.examples?.length ?? 0;

      const frameworkExamples = (
        section.frameworks ?? []
      ).reduce(
        (total, framework) =>
          total + (framework.examples?.length ?? 0),
        0
      );

      return count + sectionExamples + frameworkExamples;
    },
    0
  );

  const baseMinutes = Math.max(
    6,
    sections.length * 6
  );

  return (
    baseMinutes +
    Math.ceil(frameworkCount * 1.5) +
    Math.ceil(exampleCount * 0.25)
  );
}

function classifyPath(chapter, index, total) {
  const title = (chapter?.title ?? "").toLowerCase();

  if (title.includes("anatomy")) {
    return "anatomy";
  }

  if (
    title.includes("technique") ||
    title.includes("in-context")
  ) {
    return "techniques";
  }

  if (title.includes("framework")) {
    return "frameworks";
  }

  if (
    title.includes("advanced") ||
    title.includes("deep dive") ||
    title.includes("cross-functional") ||
    title.includes("implementation") ||
    title.includes("playbook")
  ) {
    return "advanced";
  }

  if (index < Math.max(2, Math.floor(total * 0.25))) {
    return "fundamentals";
  }

  return "advanced";
}

export default function buildLearningPaths(
  course,
  completedLessons = []
) {
  if (!course) return [];

  const chapters = (
    course.chapters ?? []
  ).filter(isLearningChapter);

  if (chapters.length === 0) {
    return PATH_DEFINITIONS.map((path) => ({
      ...path,
      lessons: [],
      totalLessons: 0,
      completedLessons: 0,
      progress: 0,
      estimatedMinutes: 0,
      continueLessonId: null,
    }));
  }

  const grouped = PATH_DEFINITIONS.reduce(
    (acc, path) => ({
      ...acc,
      [path.id]: [],
    }),
    {}
  );

  chapters.forEach((chapter, index) => {
    const pathId = classifyPath(
      chapter,
      index,
      chapters.length
    );

    const minutes = estimateLessonMinutes(chapter);

    grouped[pathId].push({
      id: chapter.id,
      title: chapter.title,
      sectionCount: chapter.sections?.length ?? 0,
      completed: completedLessons.includes(chapter.id),
      difficulty:
        index < Math.floor(chapters.length * 0.25)
          ? "Beginner"
          : index < Math.floor(chapters.length * 0.5)
            ? "Intermediate"
            : index < Math.floor(chapters.length * 0.8)
              ? "Advanced"
              : "Expert",
      estimatedMinutes: minutes,
    });
  });

  return PATH_DEFINITIONS.map((path) => {
    const lessons = grouped[path.id] ?? [];

    const totalLessons = lessons.length;

    const completed = lessons.filter(
      (lesson) => lesson.completed
    ).length;

    const estimatedMinutes = lessons.reduce(
      (total, lesson) =>
        total + lesson.estimatedMinutes,
      0
    );

    const continueLesson =
      lessons.find((lesson) => !lesson.completed) ??
      lessons[0] ??
      null;

    return {
      ...path,
      lessons,
      totalLessons,
      completedLessons: completed,
      progress:
        totalLessons > 0
          ? Math.round(
              (completed / totalLessons) * 100
            )
          : 0,
      estimatedMinutes,
      continueLessonId:
        continueLesson?.id ?? null,
    };
  });
}
