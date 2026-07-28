import { Link } from "react-router-dom";

export default function QuickActions() {
  const actions = [
    {
      title: "Learning Hub",
      path: "/learning",
    },
    {
      title: "Prompt Studio",
      path: "/studio",
    },
    {
      title: "Prompt Library",
      path: "/library",
    },
    {
      title: "Best Practices",
      path: "/best-practices",
    },
  ];

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-slate-800">
        Quick Actions
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => (
          <Link
            key={action.path}
            to={action.path}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="font-semibold text-slate-900">
              {action.title}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Open module
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}