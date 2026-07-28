export default function DepartmentBadge({
  department,
}) {
  return (
    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
      {department}
    </span>
  );
}