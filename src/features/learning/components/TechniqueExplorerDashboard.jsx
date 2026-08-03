import { BookOpenText, Layers3, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import TechniqueCard from "./TechniqueCard";
import TechniqueRenderer from "./renderers/TechniqueRenderer";
import { buildTechniqueExplorer } from "../utils/techniqueExplorer";

export default function TechniqueExplorerDashboard({ course }) {
	const techniques = useMemo(
		() => buildTechniqueExplorer(course),
		[course]
	);

	const [selectedTechniqueId, setSelectedTechniqueId] = useState(
		techniques[0]?.id ?? null
	);

	const selectedTechnique =
		techniques.find((technique) => technique.id === selectedTechniqueId) ??
		techniques[0] ??
		null;

	if (techniques.length === 0) {
		return (
			<section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 shadow-sm">
				No techniques were found in the current course content.
			</section>
		);
	}

	const totalExamples = techniques.reduce(
		(count, technique) => count + technique.examples.length,
		0
	);

	return (
		<section className="space-y-6">
			<div className="grid gap-4 md:grid-cols-3">
				<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<div className="inline-flex rounded-lg bg-blue-100 p-2 text-blue-600">
						<Sparkles size={20} />
					</div>

					<p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
						Techniques
					</p>

					<p className="mt-1 text-2xl font-semibold text-slate-900">
						{techniques.length}
					</p>

					<p className="mt-1 text-sm text-slate-500">
						Derived from the course JSON only
					</p>
				</div>

				<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<div className="inline-flex rounded-lg bg-emerald-100 p-2 text-emerald-600">
						<BookOpenText size={20} />
					</div>

					<p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
						Examples
					</p>

					<p className="mt-1 text-2xl font-semibold text-slate-900">
						{totalExamples}
					</p>

					<p className="mt-1 text-sm text-slate-500">
						Existing examples reused from the curriculum
					</p>
				</div>

				<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<div className="inline-flex rounded-lg bg-amber-100 p-2 text-amber-600">
						<Layers3 size={20} />
					</div>

					<p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
						Independent browsing
					</p>

					<p className="mt-1 text-sm text-slate-500">
						Explore prompt techniques without opening a lesson.
					</p>
				</div>
			</div>

			<div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
				<div className="space-y-4">
					<div className="flex items-center justify-between gap-4">
						<div>
							<p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
								Technique Cards
							</p>

							<h2 className="mt-1 text-xl font-semibold text-slate-900">
								Browse the course techniques
							</h2>
						</div>
					</div>

					<div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
						{techniques.map((technique) => (
							<TechniqueCard
								key={technique.id}
								technique={technique}
								active={selectedTechnique?.id === technique.id}
								onSelect={setSelectedTechniqueId}
							/>
						))}
					</div>
				</div>

				<div className="xl:sticky xl:top-6 xl:self-start">
					<TechniqueRenderer technique={selectedTechnique} />
				</div>
			</div>
		</section>
	);
}
