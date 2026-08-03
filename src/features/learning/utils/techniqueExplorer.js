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

function getBlocks(html = "") {
	if (!html) return [];

	if (typeof DOMParser === "undefined") {
		return normalizeText(html) ? [{ tag: "p", text: normalizeText(html) }] : [];
	}

	const document = new DOMParser().parseFromString(html, "text/html");
	const nodes = Array.from(
		document.body.querySelectorAll(
			"h1,h2,h3,h4,h5,h6,p,li,blockquote,pre,td,th"
		)
	);

	return nodes
		.map((node) => ({
			tag: node.tagName.toLowerCase(),
			text: normalizeText(node.innerHTML ?? node.textContent ?? ""),
		}))
		.filter((block) => block.text);
}

function buildChapterMap(course) {
	const sections = [];

	(course?.chapters ?? []).forEach((chapter, chapterIndex) => {
		(chapter?.sections ?? []).forEach((section, sectionIndex) => {
			sections.push({ chapter, chapterIndex, section, sectionIndex });
		});
	});

	return sections;
}

function findFramework(course, matcher) {
	for (const { chapter, chapterIndex, section, sectionIndex } of buildChapterMap(course)) {
		for (const [frameworkIndex, framework] of (section?.frameworks ?? []).entries()) {
			const haystack = [
				framework?.id,
				framework?.title,
				framework?.description,
				framework?.content,
				framework?.examples?.map((example) => example?.content).join(" "),
			]
				.filter(Boolean)
				.join(" ")
				.toLowerCase();

			if (matcher(haystack, framework, chapter, section)) {
				return {
					chapter,
					chapterIndex,
					section,
					sectionIndex,
					framework,
					frameworkIndex,
				};
			}
		}
	}

	return null;
}

function findSection(course, matcher) {
	for (const { chapter, chapterIndex, section, sectionIndex } of buildChapterMap(course)) {
		const haystack = [section?.id, section?.title, section?.content]
			.filter(Boolean)
			.join(" ")
			.toLowerCase();

		if (matcher(haystack, chapter, section)) {
			return { chapter, chapterIndex, section, sectionIndex };
		}
	}

	return null;
}

function extractSectionSummary(section, fallback = "") {
	const blocks = getBlocks(section?.content ?? "");
	const textBlocks = blocks
		.map((block) => block.text)
		.filter(Boolean);

	if (textBlocks.length === 0) return fallback;

	return textBlocks.join(" ");
}

function firstMatchingBlock(section, pattern) {
	const blocks = getBlocks(section?.content ?? "");
	const match = blocks.find((block) => pattern.test(block.text));
	return match?.text ?? "";
}

function exampleFromFramework(framework, index) {
	const example = framework?.examples?.[index];
	if (!example) return null;

	return {
		id: `${framework.id}-example-${index}`,
		title: example?.title ?? `Example ${index + 1}`,
		prompt: normalizeText(example?.content ?? example?.prompt ?? example?.title ?? ""),
		output: normalizeText(framework?.aiOutputs?.[index]?.content ?? example?.output ?? ""),
	};
}

function examplesFromFramework(framework, indexes) {
	return indexes
		.map((index) => exampleFromFramework(framework, index))
		.filter(Boolean);
}

function examplesFromSection(section, indexes) {
	return indexes
		.map((index) => {
			const example = section?.examples?.[index];
			if (!example) return null;

			return {
				id: `${section.id}-example-${index}`,
				title: example?.title ?? `Example ${index + 1}`,
				prompt: normalizeText(example?.content ?? example?.prompt ?? example?.title ?? ""),
				output: normalizeText(example?.output ?? ""),
			};
		})
		.filter(Boolean);
}

function makeRecord({
	id,
	name,
	purpose,
	whenToUse,
	benefits,
	limitations,
	bestPractices,
	examples,
	chapterTitle,
	sectionTitle,
	chapterIndex = 0,
	sectionIndex = 0,
	sourceKind,
}) {
	return {
		id,
		name,
		purpose: normalizeText(purpose),
		whenToUse: normalizeText(whenToUse),
		benefits: normalizeText(benefits),
		limitations: normalizeText(limitations),
		bestPractices: normalizeText(bestPractices),
		examples: examples ?? [],
		chapterTitle: chapterTitle ?? "",
		sectionTitle: sectionTitle ?? "",
		chapterIndex,
		sectionIndex,
		sourceKind,
	};
}

function buildFrameworkTechnique({
	id,
	name,
	purpose,
	framework,
	chapter,
	section,
	chapterIndex,
	sectionIndex,
	frameworkIndex,
	bestPractices,
	exampleIndexes = [],
	benefits,
	limitations,
}) {
	const contentSummary = extractSectionSummary(section, framework?.description ?? "");
	const whenToUse = firstMatchingBlock(section, /when to use|best for|ideal for/i);

	return makeRecord({
		id,
		name,
		purpose: purpose ?? framework?.description ?? contentSummary,
		whenToUse:
			whenToUse ||
			framework?.description ||
			contentSummary,
		benefits:
			benefits ||
			framework?.description ||
			contentSummary,
		limitations:
			limitations ||
			(/overkill|slower|more expensive|requires|needs/i.test(contentSummary)
				? contentSummary
				: "Best for cases where the technique's structure or extra reasoning adds value; less useful for simple, direct tasks."),
		bestPractices:
			bestPractices ||
			firstMatchingBlock(section, /how to use it|best practices|remember|tip/i) ||
			framework?.content ||
			framework?.description ||
			contentSummary,
		examples: examplesFromFramework(framework, exampleIndexes),
		chapterTitle: chapter?.title ?? "",
		sectionTitle: section?.title ?? "",
		chapterIndex,
		sectionIndex,
		sourceKind: `framework-${frameworkIndex}`,
	});
}

function buildSectionTechnique({
	id,
	name,
	purpose,
	chapter,
	section,
	chapterIndex,
	sectionIndex,
	bestPractices,
	benefits,
	limitations,
	examples,
	whenToUse,
}) {
	const summary = extractSectionSummary(section, purpose ?? "");

	return makeRecord({
		id,
		name,
		purpose: purpose ?? summary,
		whenToUse: whenToUse ?? summary,
		benefits: benefits ?? summary,
		limitations: limitations ?? "Useful when the prompt structure or output needs are explicit; not ideal for very short or highly open-ended prompts.",
		bestPractices: bestPractices ?? firstMatchingBlock(section, /best practices|remember|use|common delimiters|provide/i) ?? summary,
		examples,
		chapterTitle: chapter?.title ?? "",
		sectionTitle: section?.title ?? "",
		chapterIndex,
		sectionIndex,
		sourceKind: "section",
	});
}

export function buildTechniqueExplorer(course) {
	const records = [];
	const seen = new Set();

	const addRecord = (record) => {
		if (!record) return;

		const key = record.id.toLowerCase();
		if (seen.has(key)) return;

		seen.add(key);
		records.push(record);
	};

	const zeroShot = findFramework(course, (haystack) =>
		haystack.includes("zero-shot")
	);
	addRecord(
		zeroShot
			? buildFrameworkTechnique({
				id: zeroShot.framework.id,
				name: "Zero-Shot Prompting",
				framework: zeroShot.framework,
				chapter: zeroShot.chapter,
				section: zeroShot.section,
				chapterIndex: zeroShot.chapterIndex,
				sectionIndex: zeroShot.sectionIndex,
				frameworkIndex: zeroShot.frameworkIndex,
				exampleIndexes: [0, 1, 2],
				benefits: "Fast, simple, and useful when you do not have example pairs to provide.",
				limitations: "Relies entirely on the model's existing knowledge and can be weaker for ambiguous or specialized tasks.",
			})
			: null
	);

	const fewShot = findFramework(course, (haystack) =>
		haystack.includes("few-shot")
	);
	addRecord(
		fewShot
			? buildFrameworkTechnique({
				id: fewShot.framework.id,
				name: "Few-Shot Prompting",
				framework: fewShot.framework,
				chapter: fewShot.chapter,
				section: fewShot.section,
				chapterIndex: fewShot.chapterIndex,
				sectionIndex: fewShot.sectionIndex,
				frameworkIndex: fewShot.frameworkIndex,
				exampleIndexes: [0, 1, 2],
				benefits: "Helps the model follow the desired pattern, style, or output shape by seeing a few examples first.",
				limitations: "Takes more prompt space and depends on picking examples that are representative and unambiguous.",
			})
			: null
	);

	const cot = findFramework(course, (haystack) =>
		haystack.includes("chain-of-thought")
	);
	addRecord(
		cot
			? buildFrameworkTechnique({
				id: cot.framework.id,
				name: "Chain of Thought",
				framework: cot.framework,
				chapter: cot.chapter,
				section: cot.section,
				chapterIndex: cot.chapterIndex,
				sectionIndex: cot.sectionIndex,
				frameworkIndex: cot.frameworkIndex,
				exampleIndexes: [0, 1, 2],
				benefits: "Improves reasoning quality by encouraging the model to break complex problems into explicit steps.",
				limitations: "Can be slower and still produce incorrect reasoning if the task is underspecified.",
			})
			: null
	);

	const leastToMost = findFramework(course, (haystack) =>
		haystack.includes("least-to-most")
	);
	addRecord(
		leastToMost
			? buildFrameworkTechnique({
				id: leastToMost.framework.id,
				name: "Least-to-Most Prompting",
				framework: leastToMost.framework,
				chapter: leastToMost.chapter,
				section: leastToMost.section,
				chapterIndex: leastToMost.chapterIndex,
				sectionIndex: leastToMost.sectionIndex,
				frameworkIndex: leastToMost.frameworkIndex,
				exampleIndexes: [0, 1, 2],
				benefits: "Turns a hard task into a sequence of smaller, more reliable prompts.",
				limitations: "Requires multiple prompt turns and more orchestration than a single prompt.",
			})
			: null
	);

	const selfConsistency = findFramework(course, (haystack) =>
		haystack.includes("self-consistency")
	);
	addRecord(
		selfConsistency
			? buildFrameworkTechnique({
				id: selfConsistency.framework.id,
				name: "Self Consistency",
				framework: selfConsistency.framework,
				chapter: selfConsistency.chapter,
				section: selfConsistency.section,
				chapterIndex: selfConsistency.chapterIndex,
				sectionIndex: selfConsistency.sectionIndex,
				frameworkIndex: selfConsistency.frameworkIndex,
				exampleIndexes: [0, 1, 2],
				benefits: "Reduces the risk of taking the first plausible answer by comparing multiple reasoning paths.",
				limitations: "More expensive and unnecessary for simple factual questions.",
			})
			: null
	);

	const react = findFramework(course, (haystack) =>
		haystack.includes("react (reason + act)") || haystack.includes("thought → action → observation")
	);
	addRecord(
		react
			? buildFrameworkTechnique({
				id: react.framework.id,
				name: "ReAct",
				framework: react.framework,
				chapter: react.chapter,
				section: react.section,
				chapterIndex: react.chapterIndex,
				sectionIndex: react.sectionIndex,
				frameworkIndex: react.frameworkIndex,
				exampleIndexes: [0, 1, 2],
				benefits: "Useful when the model needs to reason while interacting with tools or actions in a loop.",
				limitations: "Adds operational complexity and is best suited for tool-using workflows.",
			})
			: null
	);

	const promptChaining = findFramework(course, (haystack) =>
		haystack.includes("prompt chaining") || haystack.includes("pipelining")
	);
	addRecord(
		promptChaining
			? buildFrameworkTechnique({
				id: promptChaining.framework.id,
				name: "Prompt Chaining / Pipelining",
				framework: promptChaining.framework,
				chapter: promptChaining.chapter,
				section: promptChaining.section,
				chapterIndex: promptChaining.chapterIndex,
				sectionIndex: promptChaining.sectionIndex,
				frameworkIndex: promptChaining.frameworkIndex,
				exampleIndexes: [0],
				benefits: "Breaks a complex workflow into smaller, easier-to-review steps.",
				limitations: "Can introduce coordination overhead if the chain becomes too long.",
			})
			: null
	);

	const roleSection = findSection(course, (haystack) =>
		haystack.includes("role: assigning a persona or expertise")
	);
	if (roleSection) {
		addRecord(
			buildSectionTechnique({
				id: "role-prompting",
				name: "Role Prompting",
				chapter: roleSection.chapter,
				section: roleSection.section,
				chapterIndex: roleSection.chapterIndex,
				sectionIndex: roleSection.sectionIndex,
				purpose: "Assign a persona or expertise so the model responds from a more specific point of view.",
				whenToUse: "Use when tone, expertise, or point of view matters and the response should feel grounded in a clear role.",
				benefits: "Improves alignment with the intended audience and encourages more focused responses.",
				limitations: "By itself, role setting does not define the task or the expected output format.",
				examples: examplesFromSection(roleSection.section, [0, 1, 2]),
				bestPractices: firstMatchingBlock(roleSection.section, /role:|tone:|format:/i) || "Combine the role with a task, context, and output format for stronger results.",
			})
		);
	}

	const delimitersSection = findSection(course, (haystack) =>
		haystack.includes("structuring your prompt with delimiters")
	);
	if (delimitersSection) {
		addRecord(
			buildSectionTechnique({
				id: "delimiters",
				name: "Delimiters",
				chapter: delimitersSection.chapter,
				section: delimitersSection.section,
				chapterIndex: delimitersSection.chapterIndex,
				sectionIndex: delimitersSection.sectionIndex,
				purpose: "Separate instructions, input data, and output constraints so the model can parse the prompt more clearly.",
				whenToUse: "Use when prompts contain raw input, multiple sections, or explicit boundaries between instructions and data.",
				benefits: "Makes prompt boundaries clearer and reduces confusion between instructions and content.",
				limitations: "Delimiters help structure the prompt, but they do not replace clear instructions or examples.",
				examples: examplesFromSection(delimitersSection.section, [18]),
				bestPractices: firstMatchingBlock(delimitersSection.section, /common delimiters include|triple backticks|tags|separator/i) || "Use consistent markers such as backticks or section headings.",
			})
		);
	}

	const structuredOutputSection = findSection(course, (haystack) =>
		haystack.includes("format: the specific structure for the output") || haystack.includes("structured output")
	);
	if (structuredOutputSection) {
		addRecord(
			buildSectionTechnique({
				id: "structured-output",
				name: "Structured Output",
				chapter: structuredOutputSection.chapter,
				section: structuredOutputSection.section,
				chapterIndex: structuredOutputSection.chapterIndex,
				sectionIndex: structuredOutputSection.sectionIndex,
				purpose: "Specify the format you want the model to return, such as a table, JSON object, or Gherkin.",
				whenToUse: "Use when the output must be machine-readable, repeatable, or easy to review.",
				benefits: "Makes downstream processing easier and keeps responses predictable.",
				limitations: "Requires precise formatting instructions and may still need validation.",
				examples: examplesFromSection(structuredOutputSection.section, [16, 17, 18]),
				bestPractices: firstMatchingBlock(structuredOutputSection.section, /markdown table|json object|gherkin|given\/when\/then/i) || "Name the output schema explicitly and include a concrete example when possible.",
			})
		);
	}

	const stepByStepSection = findSection(course, (haystack) =>
		haystack.includes("think step-by-step")
	);
	if (stepByStepSection) {
		addRecord(
			buildSectionTechnique({
				id: "step-by-step",
				name: "Step-by-Step Reasoning",
				chapter: stepByStepSection.chapter,
				section: stepByStepSection.section,
				chapterIndex: stepByStepSection.chapterIndex,
				sectionIndex: stepByStepSection.sectionIndex,
				purpose: "Encourage the model to break a complex task into a sequence of smaller reasoning steps.",
				whenToUse: "Use for logic puzzles, planning, estimation, and other tasks where explicit reasoning improves reliability.",
				benefits: "Makes reasoning more transparent and usually improves complex problem-solving.",
				limitations: "Adds verbosity and can still be wrong if the prompt lacks enough context.",
				examples: examplesFromFramework(
					cot?.framework ?? null,
					[0, 1, 2]
				),
				bestPractices: "Pair the instruction with a clear objective and ask for concise reasoning if you only need a summary.",
			})
		);
	}

	return records;
}
