import usePromptLibraryContext from "../state/usePromptLibraryContext";

export default function GalleryPanel() {
  const library = usePromptLibraryContext();

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="border-b p-5">
        <h2 className="text-lg font-semibold">
          Templates
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {library.templates.length} Templates
        </p>
      </div>

      <div className="flex min-h-[600px] items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-semibold">
            Enterprise Template Gallery
          </h3>

          <p className="mt-3 text-slate-500">
            Responsive template cards will be added
            in the next implementation.
          </p>
        </div>
      </div>
    </div>
  );
}