import VersionCard from "./VersionCard";

export default function VersionTimeline({
  versions,
  compareSelection,
  onRestore,
  onDelete,
  onComment,
  onToggleCompare,
}) {
  return (
    <div className="relative space-y-4 before:absolute before:bottom-0 before:left-5 before:top-0 before:w-px before:bg-slate-200 before:content-['']">
      {versions.map((version) => (
        <div
          key={version.id}
          className="relative pl-10"
        >
          <span className="absolute left-5 top-6 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-slate-400 shadow-sm" />

          <VersionCard
            version={version}
            isCompareSelected={compareSelection.includes(
              version.id
            )}
            onRestore={onRestore}
            onDelete={onDelete}
            onComment={onComment}
            onToggleCompare={onToggleCompare}
          />
        </div>
      ))}
    </div>
  );
}