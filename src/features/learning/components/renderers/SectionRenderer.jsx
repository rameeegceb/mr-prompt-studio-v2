import ExampleRenderer from "./ExampleRenderer";

export default function SectionRenderer({
  section,
  chapterTitle,
}) {
  return (
    <section className="space-y-8">

      {/* Section Title */}
      {section.title && (
        <h2 className="text-2xl font-bold text-slate-800">
          {section.title}
        </h2>
      )}

      {/* Section Content */}
      {section.content && (
        <div
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{
            __html: section.content,
          }}
        />
      )}

      {/* Frameworks */}
      {section.frameworks?.map((framework) => (
        <div
          key={framework.id}
          className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold text-teal-700">
            {framework.title}
          </h3>

          {framework.description && (
            <p className="mt-2 text-slate-700">
              {framework.description}
            </p>
          )}

          {framework.content && (
            <div
              className="prose prose-slate mt-4 max-w-none"
              dangerouslySetInnerHTML={{
                __html: framework.content,
              }}
            />
          )}

          {framework.examples?.length > 0 ? (
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-800">
                Interactive Examples
              </h4>

              {framework.examples.map((example, index) => (
                <ExampleRenderer
                  key={index}
                  example={example}
                  exampleIndex={index}
                  chapterTitle={chapterTitle}
                  sectionTitle={section.title}
                  frameworkTitle={framework.title}
                  frameworkOutput={framework.aiOutputs?.[index] ?? null}
                  sourceType="framework"
                />
              ))}
            </div>
          ) : null}
        </div>
      ))}

      {/* Section Examples */}
      {section.examples?.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-slate-800">
            Interactive Examples
          </h3>

          {section.examples.map((example, index) => (
            <ExampleRenderer
              key={index}
              example={example}
              exampleIndex={index}
              chapterTitle={chapterTitle}
              sectionTitle={section.title}
              frameworkTitle={null}
              frameworkOutput={null}
              sourceType="section"
            />
          ))}
        </div>
      )}

    </section>
  );
}