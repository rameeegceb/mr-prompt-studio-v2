export default function FavoritesPanel({
  course,
  favorites = [],
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">
        Favorites
      </h3>

      {favorites.length === 0 && (
        <p className="text-sm text-slate-500">
          No favorite chapters yet.
        </p>
      )}

      {favorites.map((favorite) => {
        const chapter = course?.getChapter(favorite);

        return (
          <div
            key={favorite}
            className="rounded-lg border p-3"
          >
            {chapter?.title ?? favorite}
          </div>
        );
      })}
    </div>
  );
}