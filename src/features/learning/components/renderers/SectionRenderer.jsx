import ExampleRenderer from "./ExampleRenderer";
import FrameworkRenderer from "./FrameworkRenderer";
import { buildFrameworkRecord } from "../../utils/frameworkExplorer";

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
        <FrameworkRenderer
          key={framework.id}
          framework={buildFrameworkRecord({
            framework,
            chapter: { title: chapterTitle },
            section,
          })}
        />
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