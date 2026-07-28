import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Heart,
} from "lucide-react";

import { chapters } from "../data/chapters";
import { loadGuide } from "../services/guideLoader";

export default function LearningContent({
  selectedChapter,
}) {
  const [html, setHtml] = useState("");

  const contentRef = useRef(null);

  useEffect(() => {
    loadGuide()
      .then(setHtml)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;

    const element =
      contentRef.current.querySelector(`#${selectedChapter}`) ??
      contentRef.current.querySelector(
        `[data-chapter="${selectedChapter}"]`
      );

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      contentRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [selectedChapter]);

  const currentIndex = useMemo(
    () =>
      chapters.findIndex(
        (c) => c.id === selectedChapter
      ),
    [selectedChapter]
  );

  const previousChapter =
    currentIndex > 0
      ? chapters[currentIndex - 1]
      : null;

  const nextChapter =
    currentIndex < chapters.length - 1
      ? chapters[currentIndex + 1]
      : null;

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white px-8 py-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Enterprise Learning Hub
            </p>

            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              Prompt Engineering Guide
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Learn Prompt Engineering using structured chapters,
              frameworks, examples and enterprise best practices.
            </p>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">
              <Bookmark size={16} />
              Bookmark
            </button>

            <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">
              <Heart size={16} />
              Favorite
            </button>

            <button className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
              <CheckCircle2 size={16} />
              Mark Complete
            </button>
          </div>
        </div>
      </div>

      <div
        ref={contentRef}
        className="flex-1 overflow-auto bg-white p-8"
      >
        <div
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      </div>

      <div className="border-t border-slate-200 bg-slate-50 px-8 py-5">
        <div className="flex items-center justify-between">
          <div>
            {previousChapter && (
              <button className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100">
                <ArrowLeft size={16} />
                {previousChapter.title}
              </button>
            )}
          </div>

          <div>
            {nextChapter && (
              <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                {nextChapter.title}
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}