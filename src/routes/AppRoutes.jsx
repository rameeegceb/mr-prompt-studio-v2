import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import DashboardPage from "../features/dashboard/pages/DashboardPage";
import LearningHub from "../features/learning/pages/LearningHub";
import PromptStudio from "../features/studio/pages/PromptStudio";
import PromptLibrary from "../features/library/pages/PromptLibrary";
import SettingsPage from "../features/settings/pages/SettingsPage";
import AITestPage from "../features/ai/pages/AITestPage";

const Placeholder = ({ title }) => (
  <div className="rounded-2xl bg-white p-10 shadow-sm">
    <h1 className="text-3xl font-bold text-slate-900">
      {title}
    </h1>

    <p className="mt-3 text-slate-500">
      Coming Soon
    </p>
  </div>
);

export default function AppRoutes() {
  return (
    <DashboardLayout>
      <Routes>

        {/* Dashboard */}
        <Route
          path="/"
          element={<DashboardPage />}
        />

        {/* Learning Hub */}
        <Route
          path="/learning"
          element={<LearningHub />}
        />

        {/* AI Studio */}
        <Route
          path="/studio"
          element={<PromptStudio />}
        />

        {/* Prompt Library */}
        <Route
          path="/library"
          element={<PromptLibrary />}
        />

        {/* Best Practices */}
        <Route
          path="/best-practices"
          element={<Placeholder title="Best Practices" />}
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={<SettingsPage />}
        />

        {/* Temporary AI Test */}
        <Route
          path="/ai-test"
          element={<AITestPage />}
        />

        {/* Fallback */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </DashboardLayout>
  );
}