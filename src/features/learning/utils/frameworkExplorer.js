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

function joinBlocks(blocks, limit = blocks.length) {
	return blocks
		.slice(0, limit)
		.map((block) => block.text)
		.filter(Boolean)
		.join("\n");
}

function extractSection(blocks, matcher) {
	const index = blocks.findIndex((block, blockIndex) =>
		matcher(block, blockIndex)
	);

	if (index === -1) return [];

	const section = [];

	for (let indexOffset = index + 1; indexOffset < blocks.length; indexOffset += 1) {
		const block = blocks[indexOffset];

		if (/^h[1-6]$/.test(block.tag)) {
			break;
		}

		section.push(block);
	}

	return section;
}

function pickContextSummary(framework) {
	const description = normalizeText(framework?.description ?? "");
	if (description) return description;

	const blocks = getBlocks(framework?.content ?? framework?.syntax ?? "");
	const firstParagraph = blocks.find((block) => block.tag === "p");
	return firstParagraph?.text ?? "";
}

function pickWhenToUse(framework) {
	const blocks = getBlocks(framework?.content ?? framework?.syntax ?? "");
	const section = extractSection(blocks, (block) =>
		/when to use|best for|use it when|ideal for/i.test(block.text)
	);

	if (section.length > 0) {
		return joinBlocks(section, 3);
	}

	const text = pickContextSummary(framework);
	return text;
}

function pickStructure(framework) {
	const blocks = getBlocks(framework?.content ?? framework?.syntax ?? "");

	const structuredBlocks = blocks.filter((block) =>
		/^h[1-6]$/.test(block.tag) || block.tag === "li"
	);

	if (structuredBlocks.length > 0) {
		return joinBlocks(structuredBlocks, 8);
	}

	return joinBlocks(blocks, 6);
}

function pickTemplate(framework) {
	const templateSource =
		framework?.syntax || framework?.content || framework?.description || "";

	const templateText = normalizeText(templateSource);

	return templateText || pickContextSummary(framework);
}

function pickBestPractices(framework) {
	const blocks = getBlocks(framework?.content ?? framework?.syntax ?? "");
	const matches = blocks.filter((block) =>
		/(best practice|best practices|avoid|tip|tips|remember|consider|should|must|do not|don't)/i.test(
			block.text
		)
	);

	if (matches.length > 0) {
		return joinBlocks(matches, 6);
	}

	return joinBlocks(blocks.slice(0, 2), 2);
}

function normalizeExamplePrompt(example) {
	return normalizeText(
		example?.prompt ?? example?.content ?? example?.title ?? ""
	);
}

export function buildFrameworkRecord({
	framework,
	chapter,
	section,
	chapterIndex = 0,
	sectionIndex = 0,
	frameworkIndex = 0,
}) {
	const id = framework?.id ?? `${chapter?.id ?? "chapter"}-${section?.id ?? "section"}-${frameworkIndex}`;
	const examples = (framework?.examples ?? []).map((example, exampleIndex) => ({
		id: `${id}-example-${exampleIndex}`,
		title: example?.title ?? `Example ${exampleIndex + 1}`,
		prompt: normalizeExamplePrompt(example),
		output: normalizeText(
			framework?.aiOutputs?.[exampleIndex]?.content ?? example?.output ?? ""
		),
	}));

	return {
		id,
		name: framework?.title ?? framework?.name ?? `Framework ${frameworkIndex + 1}`,
		purpose: pickContextSummary(framework),
		whenToUse: pickWhenToUse(framework),
		structure: pickStructure(framework),
		template: pickTemplate(framework),
		bestPractices: pickBestPractices(framework),
		examples,
		chapterTitle: chapter?.title ?? "",
		sectionTitle: section?.title ?? "",
		chapterIndex,
		sectionIndex,
		frameworkIndex,
	};
}

export function buildFrameworkExplorer(course) {
	const frameworks = [];
	const seen = new Set();

	(course?.chapters ?? []).forEach((chapter, chapterIndex) => {
		(chapter?.sections ?? []).forEach((section, sectionIndex) => {
			(section?.frameworks ?? []).forEach((framework, frameworkIndex) => {
				const record = buildFrameworkRecord({
					framework,
					chapter,
					section,
					chapterIndex,
					sectionIndex,
					frameworkIndex,
				});

				const key = `${record.id}`.toLowerCase();

				if (seen.has(key)) return;
				seen.add(key);

				frameworks.push(record);
			});
		});
	});

	return frameworks;
}
