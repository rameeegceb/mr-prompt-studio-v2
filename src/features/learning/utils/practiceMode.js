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

function normalizeText(value = "") {
	return stripHtml(value).replace(/\s+/g, " ").trim();
}

function buildReflectionTips(text = "") {
	const source = text.toLowerCase();
	const tips = [];

	if (source.includes("role") || source.includes("act as")) {
		tips.push("Name the role clearly before the task so the model has a stable point of view.");
	}

	if (source.includes("delimiter") || source.includes("```") || source.includes("###")) {
		tips.push("Use clear separators when the prompt mixes instructions, input data, and output format.");
	}

	if (source.includes("format") || source.includes("json") || source.includes("gherkin") || source.includes("table")) {
		tips.push("Describe the expected output shape so the result is easier to review and reuse.");
	}

	if (source.includes("step-by-step") || source.includes("chain of thought") || source.includes("reason")) {
		tips.push("Break complex work into smaller reasoning steps to reduce ambiguity.");
	}

	if (tips.length === 0) {
		tips.push("Keep the request specific, add context, and define the output you expect.");
		tips.push("If the result feels vague, tighten the scope before adding more detail.");
	}

	return tips.slice(0, 3);
}

function buildWhyItWorks(referencePrompt, lessonText = "") {
	const source = `${referencePrompt} ${lessonText}`.toLowerCase();
	const reasons = [];

	if (source.includes("role") || source.includes("act as") || source.includes("you are")) {
		reasons.push("it assigns a clear role");
	}

	if (source.includes("example") || source.includes("few-shot")) {
		reasons.push("it shows the model the pattern to follow");
	}

	if (source.includes("step-by-step") || source.includes("chain of thought")) {
		reasons.push("it encourages explicit reasoning for complex tasks");
	}

	if (source.includes("delimiter") || source.includes("```") || source.includes("###")) {
		reasons.push("it separates instructions from raw content");
	}

	if (source.includes("format") || source.includes("json") || source.includes("gherkin") || source.includes("table")) {
		reasons.push("it defines a reusable output structure");
	}

	if (reasons.length === 0) {
		reasons.push("it is clear, specific, and aligned with the lesson goal");
	}

	return `This solution works because ${reasons.join(", ")}.`;
}

function buildExercisePrompt(exampleTitle, referencePrompt) {
	return `Practice Exercise: Rewrite this lesson prompt so it is clearer, more specific, and ready to reuse.\n\n${exampleTitle ? `Prompt: ${exampleTitle}\n` : ""}Reference input: ${referencePrompt}`;
}

function buildPracticeItem({
	id,
	lessonTitle,
	sectionTitle,
	frameworkTitle = null,
	sourceType = "section",
	example,
	frameworkOutput = null,
	lessonText = "",
}) {
	const referencePrompt = normalizeText(
		example?.content ?? example?.prompt ?? example?.title ?? ""
	);

	return {
		id,
		lessonTitle,
		sectionTitle,
		frameworkTitle,
		sourceType,
		example,
		frameworkOutput,
		exercisePrompt: buildExercisePrompt(example?.title ?? "", referencePrompt),
		referencePrompt,
		whySolutionWorks: buildWhyItWorks(referencePrompt, lessonText),
		reflectionTips: buildReflectionTips(`${referencePrompt} ${lessonText}`),
	};
}

export function buildPracticeExercises(chapter) {
	if (!chapter) return [];

	const exercises = [];

	(chapter.sections ?? []).forEach((section) => {
		const lessonText = normalizeText(section.content ?? "");

		if (section.frameworks?.length > 0) {
			section.frameworks.forEach((framework) => {
				if (framework.examples?.length > 0) {
					framework.examples.forEach((example, exampleIndex) => {
						exercises.push(
							buildPracticeItem({
								id: `${section.id}-framework-${framework.id}-example-${exampleIndex}`,
								lessonTitle: chapter.title,
								sectionTitle: section.title || framework.title,
								frameworkTitle: framework.title,
								sourceType: "framework",
								example: {
									id: `${framework.id}-example-${exampleIndex}`,
									title: example.title,
									content: example.content,
									output: framework.aiOutputs?.[exampleIndex]?.content ?? "",
								},
								frameworkOutput: framework.aiOutputs?.[exampleIndex] ?? null,
								lessonText,
							})
						);
					});
				}
			});
		}

		if (section.examples?.length > 0) {
			section.examples.forEach((example, exampleIndex) => {
				exercises.push(
					buildPracticeItem({
						id: `${section.id}-example-${exampleIndex}`,
						lessonTitle: chapter.title,
						sectionTitle: section.title,
						sourceType: "section",
						example,
						lessonText,
					})
				);
			});
		}
	});

	return exercises;
}
