const frameworkRules = [
  {
    intent: "Learning",
    framework: "RACE",
    reason:
      "Detected educational intent. RACE is well suited for instructional prompts.",
  },

  {
    intent: "Planning",
    framework: "COAST",
    reason:
      "Detected planning language. COAST structures planning prompts effectively.",
  },

  {
    intent: "Analysis",
    framework: "TRACE",
    reason:
      "Detected analytical language requiring structured reasoning.",
  },

  {
    intent: "Brainstorming",
    framework: "CARE",
    reason:
      "Detected creative language encouraging idea generation.",
  },

  {
    intent: "Writing",
    framework: "APE",
    reason:
      "Detected writing-focused intent.",
  },

  {
    intent: "Decision",
    framework: "BROKE",
    reason:
      "Detected evaluation and decision-making intent.",
  },

  {
    intent: "General",
    framework: "SMART",
    reason:
      "General purpose prompting framework.",
  },
];

export default frameworkRules;