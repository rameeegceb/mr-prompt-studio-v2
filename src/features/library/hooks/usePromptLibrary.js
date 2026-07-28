import { useMemo, useState } from "react";

import TemplateService from "../services/TemplateService";
import usePromptStudioContext from "../../studio/state/usePromptStudioContext";

export default function usePromptLibrary() {
  const studio = usePromptStudioContext();

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [framework, setFramework] = useState("All");

  const [difficulty, setDifficulty] = useState("All");

  const [sort, setSort] = useState("title");

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [refresh, setRefresh] = useState(0);

  const templates = useMemo(() => {
    return TemplateService.query({
      search,
      category,
      framework,
      difficulty,
      sort,
    });
  }, [
    search,
    category,
    framework,
    difficulty,
    sort,
    refresh,
  ]);

  function toggleFavorite(id) {
    TemplateService.toggleFavorite(id);

    setRefresh((value) => value + 1);
  }

  function useTemplate(template) {
    TemplateService.useTemplate(template.id);

    studio.setPrompt(template.prompt);

    setSelectedTemplate(template);

    setRefresh((value) => value + 1);
  }

  function clearFilters() {
    setSearch("");

    setCategory("All");

    setFramework("All");

    setDifficulty("All");

    setSort("title");
  }

  return {
    templates,

    search,
    setSearch,

    category,
    setCategory,

    framework,
    setFramework,

    difficulty,
    setDifficulty,

    sort,
    setSort,

    selectedTemplate,
    setSelectedTemplate,

    favorites: TemplateService.getFavorites(),

    recent: TemplateService.getRecent(),

    toggleFavorite,

    useTemplate,

    clearFilters,
  };
}