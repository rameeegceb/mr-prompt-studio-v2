export default function filterTemplates(
  templates,
  filters
) {
  return templates.filter((template) => {
    if (
      filters.category !== "All" &&
      template.department !== filters.category &&
      template.category !== filters.category
    ) {
      return false;
    }

    if (
      filters.framework !== "All" &&
      template.framework !== filters.framework
    ) {
      return false;
    }

    if (
      filters.difficulty !== "All" &&
      template.difficulty !== filters.difficulty
    ) {
      return false;
    }

    return true;
  });
}