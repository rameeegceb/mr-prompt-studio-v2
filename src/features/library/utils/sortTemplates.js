export default function sortTemplates(
  templates,
  sort,
  favorites,
  recent
) {
  const items = [...templates];

  switch (sort) {
    case "difficulty":
      return items.sort((a, b) =>
        a.difficulty.localeCompare(
          b.difficulty
        )
      );

    case "framework":
      return items.sort((a, b) =>
        a.framework.localeCompare(
          b.framework
        )
      );

    case "department":
      return items.sort((a, b) =>
        a.department.localeCompare(
          b.department
        )
      );

    case "score":
      return items.sort(
        (a, b) =>
          b.estimatedScore -
          a.estimatedScore
      );

    case "favorites":
      return items.sort(
        (a, b) =>
          Number(
            favorites.includes(b.id)
          ) -
          Number(
            favorites.includes(a.id)
          )
      );

    case "recent":
      return items.sort(
        (a, b) =>
          recent.indexOf(a.id) -
          recent.indexOf(b.id)
      );

    default:
      return items.sort((a, b) =>
        a.title.localeCompare(
          b.title
        )
      );
  }
}