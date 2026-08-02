import { ArrowRight } from "lucide-react";

export default function ContinueLearningCard({
  chapter,
  onContinue,
}) {
  if (!chapter) return null;

  return (
    <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">
      <p className="text-xs uppercase tracking-wider opacity-80">
        Continue Learning
      </p>

      <h2 className="mt-2 text-2xl font-bold">
        {chapter.title}
      </h2>

      <p className="mt-2 text-blue-100">
        {chapter.description}
      </p>

      <button
        onClick={() => onContinue(chapter.id)}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2 font-medium text-blue-700 transition hover:bg-blue-50"
      >
        Continue

        <ArrowRight size={18} />
      </button>
    </div>
  );
}