import PageHeader from "../../../components/ui/PageHeader";

import categories from "../constants/categories";

import PromptLibraryLayout from "../layouts/PromptLibraryLayout";

import PromptLibraryProvider from "../state/PromptLibraryProvider";
import usePromptLibraryContext from "../state/usePromptLibraryContext";

import FilterPanel from "../panels/FilterPanel";
import GalleryPanel from "../panels/GalleryPanel";
import PreviewPanel from "../panels/PreviewPanel";

export default function PromptLibrary() {
  return (
    <PromptLibraryProvider>
      <PromptLibraryContent />
    </PromptLibraryProvider>
  );
}

function PromptLibraryContent() {
  const library = usePromptLibraryContext();

  const statistics = {
    total: library.templates.length,
    categories: categories.length - 1,
    favorites: library.favorites.length,
    recent: library.recent.length,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Prompt Library"
        description="Enterprise Prompt Templates"
      />

      <div className="rounded-xl border bg-white p-10 shadow-sm">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            Enterprise Prompt Library
          </h2>

          <p className="mt-3 text-slate-500">
            Browse enterprise-ready prompt templates,
            search by category,
            preview prompts,
            and load prompts into the library view.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <StatCard
              title="Templates"
              value={statistics.total}
            />

            <StatCard
              title="Favorites"
              value={statistics.favorites}
            />

            <StatCard
              title="Recent"
              value={statistics.recent}
            />

            <StatCard
              title="Categories"
              value={statistics.categories}
            />
          </div>
        </div>
      </div>

      <PromptLibraryLayout
        statistics={statistics}
        filters={<FilterPanel />}
        gallery={
          <GalleryPanel
            templates={library.templates}
            selected={library.selectedTemplate}
            onSelect={library.setSelectedTemplate}
            onFavorite={library.toggleFavorite}
          />
        }
        preview={
          <PreviewPanel
            template={library.selectedTemplate}
            onUse={library.useTemplate}
          />
        }
      />
    </div>
  );
}

function StatCard({
  title,
  value,
}) {
  return (
    <div className="rounded-lg border bg-slate-50 p-6">
      <div className="text-sm text-slate-500">
        {title}
      </div>

      <div className="mt-2 text-3xl font-bold">
        {value}
      </div>
    </div>
  );
}