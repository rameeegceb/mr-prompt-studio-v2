export default function SectionRenderer({ section }) {
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
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
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

          {/* Framework Examples */}
          {framework.examples?.length > 0 && (
            <div className="mt-6 space-y-4">
              <h4 className="font-semibold text-slate-800">
                Examples
              </h4>

              {framework.examples.map((example, index) => (
                <div
                  key={index}
                  className="rounded-lg border-l-4 border-orange-500 bg-orange-50 p-4"
                >
                  <div className="font-semibold text-orange-800">
                    {example.title}
                  </div>

                  <div
                    className="prose prose-sm mt-2 max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: example.content,
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* AI Outputs */}
          {framework.aiOutputs?.length > 0 && (
            <div className="mt-6 space-y-4">
              <h4 className="font-semibold text-green-700">
                Sample AI Output
              </h4>

              {framework.aiOutputs.map((output, index) => (
                <div
                  key={index}
                  className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4"
                >
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: output.content,
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Section Examples */}
      {section.examples?.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-slate-800">
            Examples
          </h3>

          {section.examples.map((example, index) => (
            <div
              key={index}
              className="rounded-lg border-l-4 border-orange-500 bg-orange-50 p-4"
            >
              <div className="font-semibold text-orange-800">
                {example.title}
              </div>

              <div
                className="prose prose-sm mt-2 max-w-none"
                dangerouslySetInnerHTML={{
                  __html: example.content,
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Section AI Outputs */}
      {section.aiOutputs?.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-green-700">
            Sample AI Outputs
          </h3>

          {section.aiOutputs.map((output, index) => (
            <div
              key={index}
              className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4"
            >
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html: output.content,
                }}
              />
            </div>
          ))}
        </div>
      )}

    </section>
  );
}