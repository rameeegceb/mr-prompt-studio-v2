const roles = [
  "Enterprise Architect",
  "Business Analyst",
  "Scrum Master",
  "Product Owner",
  "Software Engineer",
  "QA Engineer",
  "Technical Writer",
  "Cloud Architect",
  "Prompt Engineer",
];

export default function RoleStep({
  value,
  onChange,
}) {
  return (
    <div>

      <h3 className="text-xl font-semibold">
        Choose an AI Role
      </h3>

      <div className="mt-6 grid gap-3 md:grid-cols-3">

        {roles.map((role) => (

          <button
            key={role}
            onClick={() =>
              onChange(role)
            }
            className={`rounded-lg border p-4 text-left ${
              value === role
                ? "border-blue-600 bg-blue-50"
                : ""
            }`}
          >
            {role}
          </button>

        ))}

      </div>

    </div>
  );
}