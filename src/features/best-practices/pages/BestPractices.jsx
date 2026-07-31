import PageHeader from "../../../components/ui/PageHeader";

import BestPracticeSection from "../components/BestPracticeSection";
import PromptExampleCard from "../components/PromptExampleCard";

import {
  practiceSections,
  promptExamples,
  commonMistakes,
  promptTips,
} from "../data/bestPractices";

export default function BestPractices() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Best Practices"
        description="Prompt Engineering guidance for writing clear, effective AI prompts and avoiding common mistakes."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)]">
        <div className="space-y-6">
          <BestPracticeSection
            title="Do's"
            items={practiceSections[0].items}
          />

          <BestPracticeSection
            title="Don'ts"
            items={practiceSections[1].items}
          />
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Good Prompt vs Bad Prompt
                </h2>
                <p className="mt-2 text-slate-500">
                  Compare prompt clarity, context, and instruction quality.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {promptExamples.map((example) => (
                <PromptExampleCard
                  key={example.id}
                  variant={example.variant}
                  title={example.title}
                  prompt={example.prompt}
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Common Mistakes
            </h2>

            <ul className="mt-5 space-y-3 text-slate-700">
              {commonMistakes.map((mistake) => (
                <li key={mistake} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  {mistake}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Prompt Engineering Tips
            </h2>

            <ol className="mt-5 space-y-3 text-slate-700">
              {promptTips.map((tip) => (
                <li key={tip} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  {tip}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
