import PageHeader from "../../../components/ui/PageHeader";

import LearningSidebar from "../components/LearningSidebar";
import LearningToolbar from "../components/LearningToolbar";
import LearningContent from "../components/LearningContent";

import useLearning from "../hooks/useLearning";

export default function LearningHub() {
  const {
    selectedChapter,
    setSelectedChapter,
  } = useLearning();

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Learning Hub"
        description="Master Enterprise Prompt Engineering"
      />

      <div className="mt-6 flex flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <LearningSidebar
          selectedChapter={selectedChapter}
          onSelectChapter={setSelectedChapter}
        />

        <div className="flex flex-1 flex-col">
          <LearningToolbar />

          <div className="flex-1 overflow-y-auto p-6">
            <LearningContent
              selectedChapter={selectedChapter}
            />
          </div>
        </div>
      </div>
    </div>
  );
}