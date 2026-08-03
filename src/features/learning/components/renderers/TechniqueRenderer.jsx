import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PromptRepository from "../../../studio/repository/PromptRepository";

function SectionBlock({ title, children }) {
	return (
		<div className="rounded-xl bg-slate-50 p-4">
			<div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
				{title}
			</div>

			<div className="mt-2 text-sm leading-6 text-slate-700">
				{children}
			</div>
		</div>
	);
}

function ExampleCard({ example, onCopy, onTryInStudio }) {
	return (
		<div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
			<div className="flex flex-wrap items-start justify-between gap-3">
				<div>
					<h4 className="text-sm font-semibold text-slate-900">
						{example.title}
					</h4>

					<p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
						{example.prompt || "Example prompt unavailable."}
					</p>
				</div>

				<div className="flex flex-wrap gap-2">
					<button
						type="button"
						onClick={() => onTryInStudio(example.prompt)}
						disabled={!example.prompt}
						className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
					>
						Try in Prompt Studio
					</button>

					<button
						type="button"
						onClick={() => onCopy(example.prompt)}
						disabled={!example.prompt}
						className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
					>
						Copy Technique Example
					</button>
				</div>
			</div>

			{example.output ? (
				<div className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
					<strong className="font-semibold text-slate-800">
						Output:
					</strong>{" "}
					{example.output}
				</div>
			) : null}
		</div>
	);
}

export default function TechniqueRenderer({ technique }) {
	const navigate = useNavigate();

	if (!technique) {
		return (
			<section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 shadow-sm">
				Select a technique to view its detail panel.
			</section>
		);
	}

	const handleCopyExample = async (prompt) => {
		if (!prompt) return;

		try {
			await navigator.clipboard.writeText(prompt);
			toast.success("Technique example copied to clipboard");
		} catch {
			toast.error("Unable to copy technique example");
		}
	};

	const handleTryInStudio = (prompt) => {
		if (!prompt) return;

		PromptRepository.save(prompt);
		navigate("/studio");
	};

	return (
		<section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
			<div className="border-b border-slate-100 px-6 py-5">
				<p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
					Technique Detail Panel
				</p>

				<h2 className="mt-1 text-2xl font-semibold text-slate-900">
					{technique.name}
				</h2>

				<p className="mt-2 text-sm leading-6 text-slate-600">
					{technique.purpose || "A reusable prompt technique from the course content."}
				</p>
			</div>

			<div className="space-y-4 px-6 py-5">
				<SectionBlock title="Purpose">
					{technique.purpose || "Derived from the course technique content."}
				</SectionBlock>

				<SectionBlock title="When to use">
					{technique.whenToUse || "Derived from the course technique content."}
				</SectionBlock>

				<SectionBlock title="Benefits">
					{technique.benefits || "Derived from the course technique content."}
				</SectionBlock>

				<SectionBlock title="Limitations">
					{technique.limitations || "Derived from the course technique content."}
				</SectionBlock>

				<SectionBlock title="Best practices">
					{technique.bestPractices || "Derived from the course technique content."}
				</SectionBlock>

				{technique.examples.length > 0 ? (
					<div className="space-y-3 rounded-xl bg-slate-50 p-4">
						<div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
							Existing examples
						</div>

						<div className="space-y-3">
							{technique.examples.map((example) => (
								<ExampleCard
									key={example.id}
									example={example}
									onCopy={handleCopyExample}
									onTryInStudio={handleTryInStudio}
								/>
							))}
						</div>
					</div>
				) : null}
			</div>
		</section>
	);
}
