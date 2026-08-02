import { useState } from "react";

import GoalStep from "./GoalStep";
import RoleStep from "./RoleStep";
import ContextStep from "./ContextStep";
import AudienceStep from "./AudienceStep";
import TaskStep from "./TaskStep";
import ConstraintsStep from "./ConstraintsStep";
import OutputStep from "./OutputStep";
import ReviewStep from "./ReviewStep";

const steps = [
  "Goal",
  "Audience",
  "Role",
  "Context",
  "Task",
  "Output",
  "Constraints",
  "Review",
];

export default function PromptBuilder({ onGenerate }) {
  const [step, setStep] = useState(0);

  const [model, setModel] = useState({
    goal: "",
    audience: "",
    role: "",
    context: "",
    task: "",
    constraints: "",
    output: "Markdown",
  });

  const update = (field, value) => {
    setModel((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const next = () =>
    setStep((s) => Math.min(s + 1, 7));

  const previous = () =>
    setStep((s) => Math.max(s - 1, 0));

  const buildPrompt = () => {
    const sections = [
      ["Role", model.role],
      ["Audience", model.audience],
      ["Goal", model.goal],
      ["Context", model.context],
      ["Task", model.task],
      ["Constraints", model.constraints],
      ["Output Format", model.output],
    ]
      .filter(([, value]) => value.trim())
      .map(([label, value]) => `# ${label}\n${value.trim()}`);

    return [
      "You are an enterprise prompt engineer.",
      "Create a complete, production-ready prompt using the details below.",
      "",
      ...sections,
      "",
      "Return only the final prompt and keep it clear, specific, and ready to use.",
    ].join("\n");
  };

  const generate = () => {
    const prompt = buildPrompt();

    onGenerate(prompt);
  };

  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="border-b p-6">

        <h2 className="text-xl font-semibold">
          Enterprise Prompt Builder
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Step {step + 1} of {steps.length}
        </p>

        <div className="mt-6 flex gap-2">

          {steps.map((item, index) => (
            <div
              key={item}
              className={`h-2 flex-1 rounded-full ${
                index <= step
                  ? "bg-blue-600"
                  : "bg-slate-200"
              }`}
            />
          ))}

        </div>

      </div>

      <div className="p-8">

        {step === 0 && (
          <GoalStep
            value={model.goal}
            onChange={(v) =>
              update("goal", v)
            }
          />
        )}

        {step === 1 && (
          <AudienceStep
            value={model.audience}
            onChange={(v) =>
              update("audience", v)
            }
          />
        )}

        {step === 2 && (
          <RoleStep
            value={model.role}
            onChange={(v) =>
              update("role", v)
            }
          />
        )}

        {step === 3 && (
          <ContextStep
            value={model.context}
            onChange={(v) =>
              update("context", v)
            }
          />
        )}

        {step === 4 && (
          <TaskStep
            value={model.task}
            onChange={(v) =>
              update("task", v)
            }
          />
        )}

        {step === 5 && (
          <OutputStep
            value={model.output}
            onChange={(v) =>
              update("output", v)
            }
          />
        )}

        {step === 6 && (
          <ConstraintsStep
            value={model.constraints}
            onChange={(v) =>
              update("constraints", v)
            }
          />
        )}

        {step === 7 && (
          <ReviewStep
            model={model}
            prompt={buildPrompt()}
          />
        )}

      </div>

      <div className="flex justify-between border-t p-6">

        <button
          onClick={previous}
          disabled={step === 0}
          className="rounded-lg border px-5 py-2 disabled:opacity-40"
        >
          Previous
        </button>

        {step < 7 ? (
          <button
            onClick={next}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white"
          >
            Next
          </button>
        ) : (
          <button
            onClick={generate}
            className="rounded-lg bg-green-600 px-5 py-2 text-white"
          >
            Generate Prompt
          </button>
        )}

      </div>

    </div>
  );
}