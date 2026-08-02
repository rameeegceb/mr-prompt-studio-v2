import useCourse from "../../hooks/useCourse";

import ProgressService from "../../services/ProgressService";

import { useLearning } from "../../state/LearningContext";

export default function ProgressPanel() {
  const { statistics } =
    useCourse();

  const { completed } =
    useLearning();

  const progress =
    ProgressService.percentage(
      completed,
      statistics.lessons
    );

  return (
    <div className="rounded-xl border bg-white p-6">

      <h2 className="text-lg font-semibold">
        Learning Progress
      </h2>

      <div className="mt-6 h-3 rounded-full bg-slate-200">

        <div
          className="h-3 rounded-full bg-blue-600"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <p className="mt-4 text-sm text-slate-500">

        {completed.length}

        {" / "}

        {statistics.lessons}

        {" lessons completed"}

      </p>

    </div>
  );
}