# Mr. Prompt Studio — Application Architecture

## Overall architecture
Mr. Prompt Studio is a React single-page application built with Vite. The app entry point is `src/main.jsx`, which initializes global providers and renders the app inside `BrowserRouter`.

## Folder organization
- `src/app/`: app-level layout and provider composition.
- `src/features/`: feature domains including AI, Learning, Library, Studio, Settings, and more.
- `src/core/`: reusable core components, layouts, and providers.
- `src/routes/`: application route definitions.
- `src/components/`: shared UI components.
- `src/layouts/`: top-level page layout(s).
- `src/providers/`: provider implementations for AI and related services.
- `src/repositories/`: repository abstractions for data access.
- `src/services/`: shared services used across the application.
- `src/content/`: static learning content.

## Application layers
- Presentation: React pages, components, layouts, UI
- State: React context providers and hooks
- Domain: feature services, repositories, models, and business logic
- Data: static JSON and template sources

## Provider hierarchy
- `src/main.jsx` wraps the app with `BrowserRouter`, `AIProvider`, and `Toaster`.
- `src/features/studio/pages/PromptStudio.jsx` adds `PromptStudioProvider` around the workbench.
- `src/features/learning/pages/LearningHub.jsx` adds `LearningProvider` around the learning content.
- `src/features/library/pages/PromptLibrary.jsx` adds `PromptLibraryProvider` around the library.

## Feature hierarchy
- Learning: course content, chapters, bookmarks, favorites, search
- Studio: prompt workbench, editor, analysis, output, improvement services
- Library: prompt templates, filtering, preview, favorites, recent
- Settings: AI provider configuration
- AI: provider context and test console

## Routing architecture
- `src/routes/AppRoutes.jsx` defines routes:
  - `/` → DashboardPage
  - `/learning` → LearningHub
  - `/studio` → PromptStudio
  - `/library` → PromptLibrary
  - `/best-practices` → placeholder
  - `/settings` → SettingsPage
  - `/ai-test` → AITestPage

## Dependency flow
- `App` → `AppRoutes` → page routes
- page routes instantiate feature providers and layouts
- feature pages compose panels/components and use feature hooks
- services are called from hooks or business logic in feature modules

## State management
- Global state is mainly provider/context-based per feature.
- `PromptStudioProvider` and `LearningProvider` are feature-level contexts.
- React hooks are used for local component state and effects.

## Data flow
- `main.jsx` boots providers and routers.
- route pages load feature providers.
- feature providers expose state and actions to child components.
- UI components dispatch user actions through context hooks.
- services perform analysis, improvement, rating, or repository access.

## Component hierarchy
- App → AppRoutes → DashboardLayout → pages
- PromptStudio → PromptStudioProvider → PromptWorkbench → EditorPanel + AnalysisPanel + BuilderPanel
- LearningHub → LearningProvider → LearningHubContent → LearningSidebar + LearningToolbar + LearningContent
- PromptLibrary → PromptLibraryProvider → PromptLibraryContent → PromptLibraryLayout
