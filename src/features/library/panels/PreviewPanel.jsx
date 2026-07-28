import usePromptLibraryContext from "../state/usePromptLibraryContext";

export default function PreviewPanel() {
  const library = usePromptLibraryContext();

  if (!library.selectedTemplate) {
    return (
      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <h2 className="text-lg font-semibold">
          Template Preview
        </h2>

        <p className="mt-4 text-slate-500">
          Select a prompt template to preview it.
        </p>
      </div>
    );
  }

  const template = library.selectedTemplate;

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="border-b p-5">
        <h2 className="text-xl font-semibold">
          {template.title}
        </h2>
      </div>

      <div className="space-y-6 p-5">
        <section>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Description
          </h3>

          <p className="text-sm leading-6 text-slate-700">
            {template.description}
          </p>
        </section>

        <section>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Framework
          </h3>

          <p>{template.framework}</p>
        </section>

        <section>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Prompt
          </h3>

          <pre className="overflow-auto rounded-lg bg-slate-100 p-4 text-sm whitespace-pre-wrap">
            {template.prompt}
          </pre>
        </section>
      </div>
    </div>
  );
}