import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import DashboardPage from "../features/dashboard/pages/DashboardPage";
import LearningHub from "../features/learning/pages/LearningHub";
import PromptStudio from "../features/studio/pages/PromptStudio";

const Placeholder = ({ title }) => (
  <div className="rounded-2xl bg-white p-10 shadow-sm">
    <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
  </div>
);

export default function AppRoutes() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />

        <Route path="/learning" element={<LearningHub />} />

        <Route path="/studio" element={<PromptStudio />} />

        <Route
          path="/library"
          element={<Placeholder title="Prompt Library" />}
        />

        <Route
          path="/best-practices"
          element={<Placeholder title="Best Practices" />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </DashboardLayout>
  );
}