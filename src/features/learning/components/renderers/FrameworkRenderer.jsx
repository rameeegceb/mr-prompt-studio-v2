import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PromptRepository from "../../../studio/repository/PromptRepository";

function PromptBody({ html }) {
	return (
		<div
			className="prose prose-slate max-w-none text-sm"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}

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

export default function FrameworkRenderer({ framework }) {
	const navigate = useNavigate();

	if (!framework) {
		return (
			<section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 shadow-sm">
				Select a framework to view its detail panel.
			</section>
		);
	}

	const template = framework.template || "";
	const existingExamples = framework.examples ?? [];

	const handleCopyTemplate = async () => {
		if (!template) return;

		try {
			await navigator.clipboard.writeText(template);
			toast.success("Framework template copied to clipboard");
		} catch {
			toast.error("Unable to copy framework template");
		}
	};

	const handleTryInStudio = () => {
		if (!template) return;

		PromptRepository.save(template);
		navigate("/studio");
	};

	return (
		<section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
			<div className="border-b border-slate-100 px-6 py-5">
				<p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
					Framework Detail Panel
				</p>

				<h2 className="mt-1 text-2xl font-semibold text-slate-900">
					{framework.name}
				</h2>

				<p className="mt-2 text-sm leading-6 text-slate-600">
					{framework.purpose || "A reusable prompt framework from the course content."}
				</p>
			</div>

			<div className="space-y-4 px-6 py-5">
				<SectionBlock title="Purpose">
					{framework.purpose || "Derived from the framework description in the course JSON."}
				</SectionBlock>

				<SectionBlock title="When to use">
					{framework.whenToUse || "Derived from the framework content."}
				</SectionBlock>

				<SectionBlock title="Structure">
					{framework.structure ? (
						<PromptBody html={framework.structure.replace(/\n/g, "<br />")} />
					) : (
						"Derived from the framework content."
					)}
				</SectionBlock>

				<SectionBlock title="Template">
					<PromptBody html={template.replace(/\n/g, "<br />")} />
				</SectionBlock>

				<SectionBlock title="Best practices">
					{framework.bestPractices || "Derived from the framework content."}
				</SectionBlock>

				{existingExamples.length > 0 ? (
					<div className="space-y-3 rounded-xl bg-slate-50 p-4">
						<div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
							Existing examples
						</div>

						<div className="space-y-3">
							{existingExamples.map((example) => (
								<div
									key={example.id}
									className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
								>
									<div className="text-sm font-semibold text-slate-900">
										{example.title}
									</div>

									<p className="mt-1 text-sm leading-6 text-slate-700">
										{example.prompt || "Prompt text not available."}
									</p>

									{example.output ? (
										<p className="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
											<strong className="font-semibold text-slate-800">
												Output:
											</strong>{" "}
											{example.output}
										</p>
									) : null}
								</div>
							))}
						</div>
					</div>
				) : null}
			</div>

			<div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 px-6 py-5">
				<button
					type="button"
					onClick={handleTryInStudio}
					disabled={!template}
					className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
				>
					Try Framework in Prompt Studio
				</button>

				<button
					type="button"
					onClick={handleCopyTemplate}
					disabled={!template}
					className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
				>
					Copy Framework Template
				</button>
			</div>
		</section>
	);
}

