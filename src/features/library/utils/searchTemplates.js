export default function searchTemplates(
  templates,
  searchText
) {
  const query = searchText
    .trim()
    .toLowerCase();

  if (!query) return templates;

  return templates.filter((template) => {
    const searchable = [
      template.title,
      template.description,
      template.department,
      template.category,
      template.framework,
      ...template.tags,
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(query);
  });
}