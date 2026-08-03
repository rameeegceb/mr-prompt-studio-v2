import { BookOpenCheck, Sparkles, TextCursorInput } from "lucide-react";
import LessonRenderer from "./LessonRenderer";
import PracticeExerciseCard from "./PracticeExerciseCard";
import { buildPracticeExercises } from "../utils/practiceMode";

export default function PracticeModeDashboard({
	chapter,
	onOpenLessonWorkspace,
}) {
	const exercises = buildPracticeExercises(chapter);

	if (!chapter) {
		return (
			<section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 shadow-sm">
				Select a lesson before entering Practice Mode.
			</section>
		);
	}

	return (
		<section className="space-y-6">
			<div className="grid gap-4 md:grid-cols-3">
				<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:col-span-2">
					<div className="flex items-start justify-between gap-4">
						<div>
							<p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
								Practice Mode
							</p>

							<h2 className="mt-1 text-2xl font-semibold text-slate-900">
								{chapter.title}
							</h2>

							<p className="mt-2 text-sm leading-6 text-slate-600">
								Practice the lesson immediately, compare your draft with the course reference, and reuse the same prompt in Prompt Studio when you are ready.
							</p>
						</div>

						<div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
							{exercises.length} exercises
						</div>
					</div>

					<button
						type="button"
						onClick={onOpenLessonWorkspace}
						className="mt-4 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
					>
						Back to Lesson Workspace
					</button>
				</div>

				<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<div className="inline-flex rounded-lg bg-blue-100 p-2 text-blue-600">
						<BookOpenCheck size={20} />
					</div>

					<p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
						Lesson
					</p>

					<p className="mt-1 text-sm text-slate-500">
						The lesson content remains the source of truth.
					</p>
				</div>
			</div>

			<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
				<div className="border-b border-slate-100 px-6 py-4">
					<div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
						<TextCursorInput size={14} /> Lesson
					</div>
				</div>

				<LessonRenderer chapter={chapter} />
			</div>

			<div className="grid gap-4 md:grid-cols-3">
				<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<div className="inline-flex rounded-lg bg-emerald-100 p-2 text-emerald-600">
						<Sparkles size={20} />
					</div>

					<p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
						Practice Exercise
					</p>

					<p className="mt-1 text-sm text-slate-500">
						Rewrite, extend, or apply the lesson prompt.
					</p>
				</div>

				<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
						Reference Solution
					</div>

					<p className="mt-1 text-sm text-slate-500">
						Reveal the course reference and compare it to your draft.
					</p>
				</div>

				<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
						Reflection Tips
					</div>

					<p className="mt-1 text-sm text-slate-500">
						Use the solution to notice what changed and why.
					</p>
				</div>
			</div>

			<div className="space-y-4">
				{exercises.map((practice) => (
					<PracticeExerciseCard
						key={practice.id}
						practice={practice}
					/>
				))}
			</div>
		</section>
	);
}
