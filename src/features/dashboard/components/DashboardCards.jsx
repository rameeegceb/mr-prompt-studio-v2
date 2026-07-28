import { Link } from "react-router-dom";
import { dashboardCards } from "../data/dashboardCards";

export default function DashboardCards() {
  return (
    <section>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {dashboardCards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.id}
              to={card.path}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${card.color}`}
              >
                <Icon size={24} />
              </div>

              <h3 className="text-xl font-semibold text-slate-900">
                {card.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {card.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}