export default function BookmarkPanel({
  bookmarks = [],
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">
        Bookmarks
      </h3>

      {bookmarks.length === 0 && (
        <p className="text-sm text-slate-500">
          No bookmarks yet.
        </p>
      )}

      {bookmarks.map((bookmark) => (
        <div
          key={bookmark}
          className="rounded-lg border p-3"
        >
          {bookmark}
        </div>
      ))}
    </div>
  );
}