import TemplateSearch from "../components/TemplateSearch";
import CategoryFilter from "../components/CategoryFilter";

import usePromptLibraryContext from "../state/usePromptLibraryContext";

export default function FilterPanel() {
  const library = usePromptLibraryContext();

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="border-b p-5">
        <h2 className="text-lg font-semibold">
          Filters
        </h2>
      </div>

      <div className="space-y-6 p-5">
        <TemplateSearch
          value={library.search}
          onChange={library.setSearch}
          onClear={() => library.setSearch("")}
        />

        <CategoryFilter
          value={library.category}
          onChange={library.setCategory}
        />
      </div>
    </div>
  );
}