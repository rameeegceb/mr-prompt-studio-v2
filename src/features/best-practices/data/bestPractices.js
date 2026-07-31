export const practiceSections = [
  {
    title: "Do's",
    items: [
      "Be specific about the goal, expected format, and audience.",
      "Include relevant context and constraints before asking for a response.",
      "Use examples to show the style, tone, or structure you want.",
      "Ask for a structured output when you need lists, tables, or bullet points.",
      "Break complex tasks into smaller steps or sub-requests.",
    ],
  },
  {
    title: "Don'ts",
    items: [
      "Don't ask vague or open-ended questions without context.",
      "Don't rely on the model to infer too many hidden assumptions.",
      "Don't mix unrelated requests in a single prompt.",
      "Don't omit the desired output format or length guidance.",
      "Don't use abstract language when you need concrete results.",
    ],
  },
];

export const promptExamples = [
  {
    id: "good",
    title: "Good Prompt",
    variant: "Good",
    prompt:
      "You are an enterprise prompt engineering coach. Explain the difference between agile and waterfall project management in a concise comparison with 5 bullet points, and include one recommendation for when each approach is best suited.",
  },
  {
    id: "bad",
    title: "Bad Prompt",
    variant: "Bad",
    prompt:
      "Tell me about agile and waterfall.",
  },
];

export const commonMistakes = [
  "Skipping important background information about the user, audience, or business context.",
  "Leaving the desired output format undefined or unclear.",
  "Using vague verbs like 'help' or 'improve' without specifying how.",
  "Combining multiple unrelated goals in one prompt.",
  "Ignoring assumptions that the model may need to make to complete the task.",
];

export const promptTips = [
  "Use clear labels and sections such as 'Task:', 'Context:', and 'Output Format:'.",
  "Prefer concrete examples instead of broad descriptions.",
  "Keep prompts focused on one primary objective at a time.",
  "Validate prompt outputs by asking for a short summary of the result.",
  "Iterate quickly: refine wording based on the model's response quality.",
];
