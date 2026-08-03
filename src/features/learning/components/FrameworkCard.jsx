export default function FrameworkCard({
	framework,
	active,
	onSelect,
}) {
	return (
		<button
			type="button"
			onClick={() => onSelect(framework.id)}
			className={`rounded-2xl border p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
				active
					? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
					: "border-slate-200 bg-white"
			}`}
		>
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
						Framework
					</p>

					<h3 className="mt-1 text-lg font-semibold text-slate-900">
						{framework.name}
					</h3>
				</div>

				<span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
					{framework.examples.length} examples
				</span>
			</div>

			<p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
				{framework.purpose || "Derived from the course framework content."}
			</p>

			<div className="mt-4 grid gap-2 text-xs text-slate-500 sm:grid-cols-2">
				<div className="rounded-lg bg-slate-50 px-3 py-2">
					<p className="font-semibold uppercase tracking-wide text-slate-400">
						Use
					</p>
					<p className="mt-1 line-clamp-2 text-slate-600">
						{framework.whenToUse || "Available in the framework detail panel."}
					</p>
				</div>

				<div className="rounded-lg bg-slate-50 px-3 py-2">
					<p className="font-semibold uppercase tracking-wide text-slate-400">
						Source
					</p>
					<p className="mt-1 line-clamp-2 text-slate-600">
						{framework.chapterTitle}
					</p>
				</div>
			</div>

			<div className="mt-4 flex items-center justify-between text-sm">
				<span className="text-slate-500">
					{framework.sectionTitle || "Framework explorer"}
				</span>

				<span className="font-medium text-blue-700">
					View details
				</span>
			</div>
		</button>
	);
}
