import useLesson from "../../hooks/useLesson";

import { useLearning } from "../../state/LearningContext";

import LessonNavigation from "./LessonNavigation";

export default function LessonViewer() {
  const { lessonId } =
    useLearning();

  const { lesson } =
    useLesson(lessonId);

  if (!lesson)
    return (
      <div className="rounded-xl border bg-white p-8">
        Lesson not found.
      </div>
    );

  return (
    <div className="rounded-xl border bg-white">

      <div className="border-b p-8">

        <p className="text-xs font-semibold uppercase text-blue-600">
          {lesson.difficulty}
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          {lesson.title}
        </h1>

        <p className="mt-4 text-slate-600">
          {lesson.description}
        </p>

      </div>

      <div className="space-y-8 p-8">

        <section>

          <h2 className="mb-4 text-xl font-semibold">
            Learning Objectives
          </h2>

          <ul className="list-disc space-y-2 pl-5">

            {lesson.objectives.map(
              (objective) => (
                <li key={objective}>
                  {objective}
                </li>
              )
            )}

          </ul>

        </section>

        {lesson.sections.map(
          (section) => (
            <section
              key={section.title}
              className="rounded-lg border p-6"
            >
              <h3 className="mb-3 text-xl font-semibold">
                {section.title}
              </h3>

              <p className="leading-8 text-slate-700">
                {section.content}
              </p>

            </section>
          )
        )}

        <LessonNavigation />

      </div>

    </div>
  );
}