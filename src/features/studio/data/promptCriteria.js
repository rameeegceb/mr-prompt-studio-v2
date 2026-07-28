export const promptCriteria = [
  {
    id: "goal",
    title: "Goal",
    weight: 20,
    detector: [
      "create",
      "build",
      "generate",
      "write",
      "learn",
      "explain",
      "analyze",
      "design",
      "develop",
      "review",
    ],
    recommendation: "Clearly define the objective.",
  },

  {
    id: "role",
    title: "Role",
    weight: 15,
    detector: [
      "you are",
      "act as",
      "role",
      "expert",
      "consultant",
    ],
    recommendation: "Assign an AI role.",
  },

  {
    id: "context",
    title: "Context",
    weight: 15,
    detector: [
      "context",
      "background",
      "scenario",
      "company",
      "organization",
      "project",
    ],
    recommendation: "Provide additional context.",
  },

  {
    id: "audience",
    title: "Audience",
    weight: 15,
    detector: [
      "audience",
      "user",
      "customer",
      "stakeholder",
      "developer",
      "manager",
    ],
    recommendation: "Specify the audience.",
  },

  {
    id: "constraints",
    title: "Constraints",
    weight: 15,
    detector: [
      "must",
      "avoid",
      "limit",
      "constraint",
      "do not",
      "only",
    ],
    recommendation: "Add constraints.",
  },

  {
    id: "output",
    title: "Output Format",
    weight: 10,
    detector: [
      "table",
      "markdown",
      "json",
      "bullet",
      "format",
      "csv",
    ],
    recommendation: "Specify the output format.",
  },

  {
    id: "examples",
    title: "Examples",
    weight: 10,
    detector: [
      "example",
      "sample",
      "illustration",
    ],
    recommendation: "Provide examples.",
  },
];