import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import DashboardPage from "../features/dashboard/pages/DashboardPage";
import LearningHub from "../features/learning/pages/LearningHub";
import PromptStudio from "../features/studio/pages/PromptStudio";
import PromptLibrary from "../features/library/pages/PromptLibrary";
import BestPractices from "../features/best-practices/pages/BestPractices";
import SettingsPage from "../features/settings/pages/SettingsPage";
import AITestPage from "../features/ai/pages/AITestPage";

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
          element={<BestPractices />}
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