import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import useCourse from "../../hooks/useCourse";
import { useLearning } from "../../state/LearningContext";

export default function CourseSidebar() {
  const { modules } = useCourse();

  const { lessonId, setLessonId } =
    useLearning();

  const [expanded, setExpanded] =
    useState(
      modules.reduce((acc, module) => {
        acc[module.id] = true;
        return acc;
      }, {})
    );

  const toggle = (id) =>
    setExpanded((state) => ({
      ...state,
      [id]: !state[id],
    }));

  return (
    <div className="h-full overflow-auto rounded-xl border bg-white">

      {modules.map((module) => (
        <div
          key={module.id}
          className="border-b"
        >
          <button
            onClick={() =>
              toggle(module.id)
            }
            className="flex w-full items-center justify-between p-4 font-semibold hover:bg-slate-50"
          >
            {module.title}

            {expanded[module.id] ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>

          {expanded[module.id] &&
            module.lessons.map((lesson) => (
              <button
                key={lesson}
                onClick={() =>
                  setLessonId(lesson)
                }
                className={`block w-full px-8 py-3 text-left text-sm transition hover:bg-blue-50

${
  lessonId === lesson
    ? "bg-blue-100 font-semibold text-blue-700"
    : ""
}`}
              >
                {lesson
                  .replaceAll("-", " ")
                  .replace(
                    /\b\w/g,
                    (l) =>
                      l.toUpperCase()
                  )}
              </button>
            ))}
        </div>
      ))}

    </div>
  );
}