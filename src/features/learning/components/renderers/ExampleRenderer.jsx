import { ChevronDown } from "lucide-react";

function stripHtml(value = "") {
	return value
		.replace(/<br\s*\/?>/gi, "\n")
		.replace(/<[^>]*>/g, "")
		.replace(/&nbsp;/gi, " ")
		.replace(/&amp;/gi, "&")
		.replace(/&lt;/gi, "<")
		.replace(/&gt;/gi, ">")
		.replace(/&quot;/gi, '"')
		.replace(/&#39;/gi, "'")
		.replace(/\s+\n/g, "\n")
		.replace(/\n\s+/g, "\n")
		.replace(/[ \t]{2,}/g, " ")
		.trim();
}

function escapeHtml(value = "") {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

function toParagraph(value = "") {
	return `<p>${escapeHtml(value).replace(/\n/g, "<br />")}</p>`;
}

function normalizePrompt(value = "") {
	return stripHtml(value).replace(/\s+/g, " ").trim();
}

function simplifyPrompt(value = "") {
	const text = normalizePrompt(value);
	const withoutRole = text
		.replace(/^act as an? [^.]+[.\s-]*/i, "")
		.replace(/^you are an? [^.]+[.\s-]*/i, "")
		.replace(/^as an? [^.]+[.\s-]*/i, "");

	const shortened =
		withoutRole || text.split(".")[0] || text;

	return shortened.replace(/\s+/g, " ").trim();
}

function inferTechnique({
	frameworkTitle,
	promptText,
}) {
	const source = `${frameworkTitle ?? ""} ${promptText ?? ""}`.toLowerCase();

	if (source.includes("zero-shot")) return "Zero-shot prompting";
	if (source.includes("few-shot")) return "Few-shot prompting";
	if (source.includes("chain-of-thought")) return "Chain-of-thought reasoning";
	if (source.includes("least-to-most")) return "Least-to-most prompting";
	if (source.includes("react")) return "ReAct";
	if (source.includes("self-consistency")) return "Self-consistency";
	if (source.includes("role")) return "Role prompting";
	if (source.includes("step-by-step")) return "Reasoning prompt";

	return "Structured prompting";
}

function buildExpectedOutput({
	frameworkOutput,
	stageKey,
	promptText,
}) {
	if (frameworkOutput?.content) {
		return frameworkOutput.content;
	}

	if (stageKey === "excellent") {
		return toParagraph(
			`Expected AI output should be clearer, more structured, and more reliable for ${promptText}.`
		);
	}

	if (stageKey === "good") {
		return toParagraph(
			`Expected AI output should better match the goal and context of ${promptText}.`
		);
	}

	return toParagraph(
		`Expected AI output may be incomplete or inconsistent for ${promptText}.`
	);
}

function buildStages({
	example,
	chapterTitle,
	sectionTitle,
	frameworkTitle,
	frameworkOutput,
}) {
	const sourcePrompt = normalizePrompt(
		example?.content ?? example?.prompt ?? example?.title ?? ""
	);
	const goodPrompt = sourcePrompt;
	const badPrompt = simplifyPrompt(sourcePrompt) || sourcePrompt;
	const excellentPrompt = sourcePrompt
		? `${sourcePrompt}\n\nUse a concise, structured response. Include assumptions, steps, and the final answer clearly.`
		: "";

	const technique = inferTechnique({
		frameworkTitle,
		promptText: goodPrompt,
	});

	const contextLabel = sectionTitle || chapterTitle || "Learning Hub";

	return [
		{
			key: "bad",
			title: "Bad Prompt",
			prompt: badPrompt,
			description:
				"Too broad, underspecified, or missing enough context for the model to respond reliably.",
			principle: "Missing specificity and structure",
			framework: frameworkTitle || null,
			technique,
			expectedOutput: buildExpectedOutput({
				promptText: goodPrompt || contextLabel,
				frameworkOutput,
				stageKey: "bad",
			}),
			tone: "border-slate-200 bg-slate-50 text-slate-700",
		},
		{
			key: "good",
			title: "Good Prompt",
			prompt: goodPrompt,
			description:
				"Adds a clearer request and more useful context so the model can stay on task.",
			principle: "Role, task, and context",
			framework: frameworkTitle || null,
			technique,
			expectedOutput: buildExpectedOutput({
				promptText: goodPrompt || contextLabel,
				frameworkOutput,
				stageKey: "good",
			}),
			tone: "border-sky-200 bg-sky-50 text-sky-700",
		},
		{
			key: "excellent",
			title: "Excellent Prompt",
			prompt: excellentPrompt,
			description:
				"Adds output guidance and stronger constraints for more consistent enterprise-quality results.",
			principle: "Structure + constraints + output format",
			framework: frameworkTitle || null,
			technique,
			expectedOutput: buildExpectedOutput({
				promptText: goodPrompt || contextLabel,
				frameworkOutput,
				stageKey: "excellent",
			}),
			tone: "border-emerald-200 bg-emerald-50 text-emerald-700",
		},
	];
}

function PromptBody({ html }) {
	return (
		<div
			className="prose prose-slate max-w-none text-sm"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}

function StagePanel({ stage }) {
	return (
		<div className={`rounded-xl border p-4 ${stage.tone}`}>
			<div className="flex flex-wrap items-start justify-between gap-3">
				<div>
					<div className="text-xs font-semibold uppercase tracking-wide opacity-80">
						{stage.title}
					</div>

					<p className="mt-1 text-sm leading-6 text-slate-700">
						{stage.description}
					</p>
				</div>

				{stage.framework ? (
					<div className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-700">
						Framework used: {stage.framework}
					</div>
				) : null}
			</div>

			<div className="mt-4 rounded-lg border border-white/70 bg-white p-4 shadow-sm">
				<PromptBody html={stage.prompt ? toParagraph(stage.prompt) : "<p>Prompt unavailable.</p>"} />
			</div>

			<div className="mt-4 grid gap-3 md:grid-cols-2">
				<div className="rounded-lg bg-white/75 p-3">
					<div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
						Why it improved
					</div>

					<p className="mt-1 text-sm text-slate-700">
						{stage.description}
					</p>
				</div>

				<div className="rounded-lg bg-white/75 p-3">
					<div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
						Prompt engineering principle
					</div>

					<p className="mt-1 text-sm text-slate-700">
						{stage.principle}
					</p>
				</div>

				{stage.technique ? (
					<div className="rounded-lg bg-white/75 p-3">
						<div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
							Technique used
						</div>

						<p className="mt-1 text-sm text-slate-700">
							{stage.technique}
						</p>
					</div>
				) : null}

				{stage.expectedOutput ? (
					<div className="rounded-lg bg-white/75 p-3 md:col-span-2">
						<div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
							Expected AI output
						</div>

						<div className="mt-1">
							<PromptBody html={stage.expectedOutput || "<p>Output unavailable.</p>"} />
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default function ExampleRenderer({
	example,
	exampleIndex = 0,
	chapterTitle,
	sectionTitle,
	frameworkTitle = null,
	frameworkOutput = null,
	sourceType = "section",
}) {
	const stages = buildStages({
		example,
		chapterTitle,
		sectionTitle,
		frameworkTitle,
		frameworkOutput,
	});

	const sourceLabel =
		sourceType === "framework"
			? frameworkTitle ?? "Framework example"
			: sectionTitle || chapterTitle || "Lesson example";

	return (
		<details className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" open={exampleIndex === 0}>
			<summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 text-left transition hover:bg-slate-50">
				<div className="min-w-0">
					<div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
						{sourceLabel}
					</div>

					<h4 className="truncate text-base font-semibold text-slate-900">
						{example?.title ?? `Example ${exampleIndex + 1}`}
					</h4>
				</div>

				<div className="flex items-center gap-2 text-slate-500">
					<span className="hidden text-xs font-medium md:inline">
						Expand
					</span>
					<ChevronDown size={18} />
				</div>
			</summary>

			<div className="space-y-4 p-5">
				<div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
					{example?.title ?? `Example ${exampleIndex + 1}`}
				</div>

				{stages.map((stage) => (
					<StagePanel
						key={stage.key}
						stage={stage}
					/>
				))}
			</div>
		</details>
	);
}
