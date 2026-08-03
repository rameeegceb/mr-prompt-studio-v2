import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import ExampleRenderer from "./renderers/ExampleRenderer";
import PromptRepository from "../../studio/repository/PromptRepository";

function ReferencePanel({
	practice,
	showComparison,
	draft,
}) {
	return (
		<div className="space-y-4">
			<div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
				<div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
					Reference Solution
				</div>

				<p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
					{practice.referencePrompt}
				</p>

				<div className="mt-4 flex flex-wrap gap-2">
					<button
						type="button"
						onClick={practice.onCopyReference}
						className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
					>
						Copy Reference Prompt
					</button>

					<button
						type="button"
						onClick={practice.onTryInStudio}
						className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-700"
					>
						Try in Prompt Studio
					</button>
				</div>
			</div>

			<div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
				<ExampleRenderer
					example={practice.example}
					exampleIndex={0}
					chapterTitle={practice.lessonTitle}
					sectionTitle={practice.sectionTitle}
					frameworkTitle={practice.frameworkTitle}
					frameworkOutput={practice.frameworkOutput}
					sourceType={practice.sourceType}
				/>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<div className="rounded-xl bg-slate-50 p-4">
					<div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
						Why the solution works
					</div>

					<p className="mt-2 text-sm leading-6 text-slate-700">
						{practice.whySolutionWorks}
					</p>
				</div>

				<div className="rounded-xl bg-slate-50 p-4">
					<div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
						Reflection Tips
					</div>

					<ul className="mt-2 space-y-2 text-sm leading-6 text-slate-700">
						{practice.reflectionTips.map((tip) => (
							<li key={tip}>• {tip}</li>
						))}
					</ul>
				</div>
			</div>

			{showComparison ? (
				<div className="grid gap-4 md:grid-cols-2">
					<div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
						<div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
							Your Draft
						</div>

						<pre className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
							{draft || "Start typing your practice answer to compare here."}
						</pre>
					</div>

					<div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
						<div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
							Reference Prompt
						</div>

						<pre className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
							{practice.referencePrompt}
						</pre>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default function PracticeExerciseCard({ practice }) {
	const navigate = useNavigate();
	const [draft, setDraft] = useState("");
	const [showSolution, setShowSolution] = useState(false);
	const [showComparison, setShowComparison] = useState(false);

	const handleCopyReference = async () => {
		if (!practice.referencePrompt) return;

		try {
			await navigator.clipboard.writeText(practice.referencePrompt);
			toast.success("Reference prompt copied to clipboard");
		} catch {
			toast.error("Unable to copy reference prompt");
		}
	};

	const handleTryInStudio = () => {
		if (!practice.referencePrompt) return;

		PromptRepository.save(practice.referencePrompt);
		navigate("/studio");
	};

	const exerciseHeader = useMemo(
		() => `${practice.sectionTitle || "Practice Exercise"}`,
		[practice.sectionTitle]
	);

	return (
		<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
			<div className="flex flex-wrap items-start justify-between gap-3">
				<div>
					<p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
						Practice Exercise
					</p>

					<h3 className="mt-1 text-xl font-semibold text-slate-900">
						{exerciseHeader}
					</h3>
				</div>

				<span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
					{practice.frameworkTitle || practice.lessonTitle}
				</span>
			</div>

			<div className="mt-4 rounded-xl bg-blue-50 p-4">
				<div className="text-xs font-semibold uppercase tracking-wide text-blue-700">
					Exercise Prompt
				</div>

				<p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
					{practice.exercisePrompt}
				</p>
			</div>

			<div className="mt-4 space-y-2">
				<label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
					Student Workspace
				</label>

				<textarea
					value={draft}
					onChange={(event) => setDraft(event.target.value)}
					placeholder="Write your answer or improved prompt here."
					className="min-h-32 w-full rounded-xl border border-slate-300 bg-white p-4 text-sm leading-6 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
				/>
			</div>

			<div className="mt-4 flex flex-wrap gap-2">
				<button
					type="button"
					onClick={() => setShowSolution((previous) => !previous)}
					className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
				>
					{showSolution ? "Hide Solution" : "Reveal Solution"}
				</button>

				<button
					type="button"
					onClick={() => setShowComparison((previous) => !previous)}
					className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
				>
					{showComparison ? "Hide Comparison" : "Compare with Reference"}
				</button>
			</div>

			{showSolution ? (
				<div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
					<ReferencePanel
						practice={{
							...practice,
							onCopyReference: handleCopyReference,
							onTryInStudio: handleTryInStudio,
						}}
						showComparison={showComparison}
						draft={draft}
					/>
				</div>
			) : null}
		</article>
	);
}
