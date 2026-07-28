import PromptBuilder from "../components/builder/PromptBuilder";
import usePromptStudioContext from "../state/usePromptStudioContext";

export default function BuilderPanel() {
  const studio = usePromptStudioContext();

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="border-b p-5">
        <h2 className="text-lg font-semibold">
          Create Prompt
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Build a structured enterprise prompt.
        </p>
      </div>

      <div className="p-5">
        <PromptBuilder
          onGenerate={(prompt) =>
            studio.setPrompt(prompt)
          }
        />
      </div>
    </div>
  );
}