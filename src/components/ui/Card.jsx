export default function Card({
    icon,
    title,
    description,
    footer,
    className = "",
}) {
    return (
        <div
            className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm ${className}`.trim()}
        >
            {icon && <div className="mb-3 text-slate-700">{icon}</div>}

            {title && (
                <h3 className="text-base font-semibold text-slate-900">
                    {title}
                </h3>
            )}

            {description && (
                <p className="mt-1 text-sm text-slate-600">{description}</p>
            )}

            {footer && <div className="mt-4">{footer}</div>}
        </div>
    );
}