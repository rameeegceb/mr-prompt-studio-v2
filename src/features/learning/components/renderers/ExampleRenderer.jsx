import { useMemo, useState } from "react";
import { Copy, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import PromptRepository from "../../../studio/repository/PromptRepository";
import { useNavigate } from "react-router-dom";

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
	promptText,
	frameworkOutput,
	stageKey,
}) {
	if (frameworkOutput?.content) {
		return frameworkOutput.content;
	}

	const subject = promptText
		? promptText.replace(/^.*?\bfor\b\s+/i, "")
		: "the task";

	if (stageKey === "bad") {
		return toParagraph(
			`An inconsistent response that may miss the intended role, structure, or scope for ${subject}.`
		);
	}

	if (stageKey === "good") {
		return toParagraph(
			`A focused response aligned to ${subject}, with better context and clearer direction.`
		);
	}

	return toParagraph(
		`A structured, enterprise-ready response with clearer output format, stronger constraints, and more reliable quality for ${subject}.`
	);
}

function buildStages({
	example,
	chapterTitle,
	sectionTitle,
	frameworkTitle,
	frameworkOutput,
}) {
	const goodPrompt = normalizePrompt(example?.content ?? example?.prompt ?? example?.title ?? "");
	const badPrompt = simplifyPrompt(goodPrompt) || goodPrompt;
	const excellentPrompt = goodPrompt
		? `${goodPrompt}\n\nReturn the result in a concise, well-structured format with any assumptions, action items, or examples clearly labeled.`
		: "";

	const technique = inferTechnique({
		frameworkTitle,
		promptText: goodPrompt,
	});

	const frameworkLabel = frameworkTitle ?? "Not applicable";
	const contextLabel = sectionTitle || chapterTitle || "Learning Hub";

	return [
		{
			key: "bad",
			title: "Bad Prompt",
			prompt: badPrompt,
			description:
				"Too broad, underspecified, or missing enough context for the model to respond reliably.",
			principle: "Missing specificity and structure",
			framework: frameworkLabel,
			technique,
			expectedOutput: buildExpectedOutput({
				promptText: goodPrompt || contextLabel,
				frameworkOutput,
				stageKey: "bad",
			}),
			actionTone: "border-slate-200 bg-slate-50 text-slate-700",
		},
		{
			key: "good",
			title: "Good Prompt",
			prompt: goodPrompt,
			description:
				"Adds a clearer request and more useful context so the model can stay on task.",
			principle: "Role, task, and context",
			framework: frameworkLabel,
			technique,
			expectedOutput: buildExpectedOutput({
				promptText: goodPrompt || contextLabel,
				frameworkOutput,
				stageKey: "good",
			}),
			actionTone: "border-sky-200 bg-sky-50 text-sky-700",
		},
		{
			key: "excellent",
			title: "Excellent Prompt",
			prompt: excellentPrompt,
			description:
				"Adds output guidance and stronger constraints for more consistent enterprise-quality results.",
			principle: "Structure + constraints + output format",
			framework: frameworkLabel,
			technique,
			expectedOutput: buildExpectedOutput({
				promptText: goodPrompt || contextLabel,
				frameworkOutput,
				stageKey: "excellent",
			}),
			actionTone: "border-emerald-200 bg-emerald-50 text-emerald-700",
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

function StagePanel({ stage, onCopy, onTry }) {
	return (
		<div className={`rounded-xl border p-4 ${stage.actionTone}`}>
			<div className="flex flex-wrap items-start justify-between gap-3">
				<div>
					<div className="text-xs font-semibold uppercase tracking-wide opacity-80">
						{stage.title}
					</div>

					<p className="mt-1 text-sm leading-6 text-slate-700">
						{stage.description}
					</p>
				</div>

				<div className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-700">
					{stage.framework}
				</div>
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
						Principle and technique
					</div>

					<p className="mt-1 text-sm text-slate-700">
						{stage.principle}
					</p>

					<p className="mt-1 text-sm text-slate-700">
						Technique: {stage.technique}
					</p>
				</div>

				<div className="rounded-lg bg-white/75 p-3 md:col-span-2">
					<div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
						Expected AI output
					</div>

					<div className="mt-1">
						<PromptBody html={stage.expectedOutput || "<p>Output unavailable.</p>"} />
					</div>
				</div>
			</div>

			<div className="mt-4 flex flex-wrap items-center gap-2">
				<button
					onClick={() => onCopy(stage.prompt)}
					className="inline-flex items-center gap-2 rounded-lg border border-white/80 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
				>
					<Copy size={16} />
					Copy Prompt
				</button>

				<button
					onClick={() => onTry(stage.prompt)}
					className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
				>
					<ExternalLink size={16} />
					Try in Prompt Studio
				</button>
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
	const navigate = useNavigate();
	const [expanded, setExpanded] = useState(exampleIndex === 0);

	const stages = useMemo(
		() =>
			buildStages({
				example,
				chapterTitle,
				sectionTitle,
				frameworkTitle,
				frameworkOutput,
			}),
		[
			example,
			chapterTitle,
			sectionTitle,
			frameworkTitle,
			frameworkOutput,
		]
	);

	const handleCopy = async (prompt) => {
		if (!prompt) return;

		try {
			await navigator.clipboard.writeText(prompt);
		} catch {
			// Intentionally silent; copy is a convenience action.
		}
	};

	const handleTryInStudio = async (prompt) => {
		if (!prompt) return;

		PromptRepository.save(prompt);
		navigate("/studio");
	};

	const sourceLabel =
		sourceType === "framework"
			? frameworkTitle ?? "Framework example"
			: sectionTitle || chapterTitle || "Lesson example";

	return (
		<article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
			<button
				type="button"
				onClick={() => setExpanded((current) => !current)}
				className="flex w-full items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 text-left transition hover:bg-slate-50"
				aria-expanded={expanded}
			>
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
						{expanded ? "Collapse" : "Expand"}
					</span>
					{expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
				</div>
			</button>

			{expanded ? (
				<div className="space-y-4 p-5">
					{stages.map((stage) => (
						<StagePanel
							key={stage.key}
							stage={stage}
							onCopy={handleCopy}
							onTry={handleTryInStudio}
						/>
					))}
				</div>
			) : (
				<div className="px-5 py-4 text-sm text-slate-500">
					Expand to review the bad, good, and excellent prompt progression.
				</div>
			)}
		</article>
	);
}
