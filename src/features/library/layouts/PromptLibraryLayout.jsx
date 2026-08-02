import LibraryStatistics from "../components/LibraryStatistics";

export default function PromptLibraryLayout({
  statistics,
  toolbar,
  filters,
  gallery,
  preview,
}) {
  return (
    <div className="space-y-6">

      <LibraryStatistics
        stats={statistics}
      />

      {toolbar}

      <div className="grid gap-6 xl:grid-cols-12">

        <aside className="xl:col-span-3">
          {filters}
        </aside>

        <section className="xl:col-span-5">
          {gallery}
        </section>

        <aside className="xl:col-span-4">
          {preview}
        </aside>

      </div>

    </div>
  );
}