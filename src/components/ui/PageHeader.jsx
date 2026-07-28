export default function PageHeader({
  title,
  description,
  children,
}) {
  return (
    <div className="mb-8 flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          {title}
        </h1>

        {description && (
          <p className="mt-2 text-slate-600">
            {description}
          </p>
        )}
      </div>

      {children && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}