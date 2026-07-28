import FilterPanel from "../panels/FilterPanel";
import GalleryPanel from "../panels/GalleryPanel";
import PreviewPanel from "../panels/PreviewPanel";

export default function PromptLibraryLayout() {
  return (
    <div className="grid gap-6 xl:grid-cols-12">

      <aside className="xl:col-span-3">
        <FilterPanel />
      </aside>

      <main className="xl:col-span-6">
        <GalleryPanel />
      </main>

      <aside className="xl:col-span-3">
        <PreviewPanel />
      </aside>

    </div>
  );
}