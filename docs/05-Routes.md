# Mr. Prompt Studio — Routes

## Route definitions
The app routes are defined in `src/routes/AppRoutes.jsx`.

### `/`
- Page component: `src/features/dashboard/pages/DashboardPage.jsx`
- Feature: Dashboard
- Protected or public: Public
- Navigation relationships: default landing page

### `/learning`
- Page component: `src/features/learning/pages/LearningHub.jsx`
- Feature: Learning Hub
- Protected or public: Public
- Navigation relationships: accessible from main navigation

### `/studio`
- Page component: `src/features/studio/pages/PromptStudio.jsx`
- Feature: Prompt Studio
- Protected or public: Public
- Navigation relationships: core workspace route for prompt engineering

### `/library`
- Page component: `src/features/library/pages/PromptLibrary.jsx`
- Feature: Prompt Library
- Protected or public: Public
- Navigation relationships: prompt template discovery

### `/best-practices`
- Component: placeholder `Placeholder` defined inline in `AppRoutes.jsx`
- Feature: Best Practices (placeholder)
- Protected or public: Public
- Navigation relationships: future feature placeholder

### `/settings`
- Page component: `src/features/settings/pages/SettingsPage.jsx`
- Feature: Settings
- Protected or public: Public
- Navigation relationships: configuration and provider setup

### `/ai-test`
- Page component: `src/features/ai/pages/AITestPage.jsx`
- Feature: AI Test Console
- Protected or public: Public
- Navigation relationships: developer/test route

### `*`
- Redirect: Navigate to `/`
- Feature: fallback
- Protected or public: Public
- Navigation relationships: fallback for unknown routes
