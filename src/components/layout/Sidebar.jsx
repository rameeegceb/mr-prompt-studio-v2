import { NavLink } from "react-router-dom";
import { modules } from "../../config/modules";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-slate-900 text-white">

      <div className="border-b border-slate-700 p-6">
        <h1 className="text-2xl font-bold">
          Mr. Prompt Studio
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Enterprise Prompt Engineering Platform
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">

        {modules.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.title}</span>

            </NavLink>
          );

        })}

      </nav>

    </aside>
  );
}