const descriptions = {
  SMART:
    "General purpose structured prompting.",

  RACE:
    "Excellent for learning and education.",

  CARE:
    "Ideal for brainstorming and creativity.",

  TRACE:
    "Best for analysis and assessment.",

  COAST:
    "Project planning and execution.",

  APE:
    "Writing and content generation.",

  BROKE:
    "Decision making and evaluation.",
};

export default function FrameworkRecommendation({
  framework,
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-5">

      <div className="text-sm text-slate-500">
        Recommended Framework
      </div>

      <div className="mt-2 text-3xl font-bold">

        {framework || "--"}

      </div>

      <p className="mt-3 text-sm text-slate-600">

        {descriptions[framework] ||
          "Framework recommendation will appear here."}

      </p>

    </div>
  );
}