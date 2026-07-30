import templates from "../data";
import TemplateRepository from "../repository/TemplateRepository";

class TemplateService {
  query({
    search = "",
    category = "All",
    framework = "All",
    difficulty = "All",
    sort = "title",
  }) {
    const normalizedSearch = search.trim().toLowerCase();

    let results = templates.filter((template) => {
      const matchesSearch =
        !normalizedSearch ||
        template.title.toLowerCase().includes(normalizedSearch) ||
        template.description.toLowerCase().includes(normalizedSearch) ||
        template.prompt.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        category === "All" ||
        template.category === category;

      const matchesFramework =
        framework === "All" ||
        template.framework === framework;

      const matchesDifficulty =
        difficulty === "All" ||
        template.difficulty === difficulty;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesFramework &&
        matchesDifficulty
      );
    });

    switch (sort) {
      case "title":
        results.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
      case "difficulty":
        results.sort((a, b) =>
          a.difficulty.localeCompare(b.difficulty)
        );
        break;
      default:
        break;
    }

    return results;
  }

  getFavorites() {
    return TemplateRepository.getFavorites();
  }

  getRecent() {
    return TemplateRepository.getRecent();
  }

  toggleFavorite(id) {
    if (TemplateRepository.isFavorite(id)) {
      TemplateRepository.removeFavorite(id);
    } else {
      TemplateRepository.addFavorite(id);
    }

    return TemplateRepository.getFavorites();
  }

  useTemplate(id) {
    TemplateRepository.addRecent(id);

    return templates.find(
      (template) => template.id === id
    );
  }
}

export default new TemplateService();