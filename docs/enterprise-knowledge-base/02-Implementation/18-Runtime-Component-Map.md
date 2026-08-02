# Document Information

| Property | Value |
|----------|-------|
| Document ID | IMP-018 |
| Document Name | Runtime Component Map |
| Version | 1.0 |
| Status | Living Document |
| Owner | Enterprise Architecture |
| Classification | Internal |
| Source of Truth | Current Source Code |
| Audience | Enterprise Architects, Solution Architects, Technical Architects, Senior Developers |
| Related Documents | IMP-017, ARC-007, ARC-008 |
| Last Reviewed | 2026-07-31 |

---

# Purpose

This document describes the runtime component architecture of Mr. Prompt Studio.

Unlike the Application Architecture document, which describes the intended architecture, this document describes the actual runtime implementation derived from the source code.

The purpose of this document is to document:

- Runtime execution
- Component relationships
- Runtime dependencies
- State ownership
- Service interactions
- Repository usage
- Provider hierarchy
- Runtime data flow

This document does not define business requirements, future architecture, or product strategy.

# Document Information

Document ID: 18-Runtime-Component-Map

Version: 1.0

Status: Draft

Purpose: Document the runtime execution architecture of Mr. Prompt Studio MVP 2 based on the current source code.

Audience: Enterprise Architects, Solution Architects, Technical Architects, Senior Developers

---

# Runtime Overview

Mr. Prompt Studio executes as a client-side React single-page application. Runtime execution begins in `src/main.jsx` and passes through a global React root, browser router, AI runtime context, and dashboard shell before rendering feature routes. Each feature route mounts its own provider and context where applicable, delegating state and behavior to service and repository layers.

The runtime architecture is composed of:
- root startup and React host
- global runtime providers
- route-based feature shells
- feature-specific providers and contexts
- domain services and repositories
- knowledge and AI runtime engines
- browser local persistence via `localStorage`

---

# Application Startup

main.jsx
?
React Root
?
BrowserRouter
?
AIProvider
?
Toaster
?
App
?
DashboardLayout
?
AppRoutes
?
Feature Route
?
Feature Provider
?
Feature Context
?
Feature Components

The startup sequence in the source is:
1. `src/main.jsx` imports and executes `KnowledgeRepository.initialize()` before rendering.
2. `ReactDOM.createRoot(document.getElementById("root")).render(...)` establishes the React root.
3. The root render hierarchy wraps `App` in:
   - `React.StrictMode`
   - `BrowserRouter`
   - `AIProvider`
   - `Toaster`
4. `App` returns `AppRoutes`.
5. `AppRoutes` renders `DashboardLayout` around the route switch.
6. `AppRoutes` maps route paths to feature entry page components.
7. Feature entry components mount feature providers as needed.
8. Feature providers expose context values to nested components.
9. Components render UI and invoke services/repositories.

---

# Route Runtime Map

## `/`
- Entry Component: `src/features/dashboard/pages/DashboardPage.jsx`
- Layout: `src/layouts/DashboardLayout.jsx`
- Provider: none
- Context: none
- Primary Panels: `WelcomeBanner`, `DashboardCards`, `QuickActions`
- Primary Components: `PageHeader`
- Primary Services: none
- Repositories: none
- Dependencies: `Sidebar`, `Header`, `PageHeader`, route navigation

## `/learning`
- Entry Component: `src/features/learning/pages/LearningHub.jsx`
- Layout: `DashboardLayout`
- Provider: `src/features/learning/state/LearningProvider.jsx`
- Context: `src/features/learning/state/LearningContext.jsx`
- Primary Panels: `LearningSidebar`, `BookmarkPanel`, `FavoritesPanel`
- Primary Components: `LearningToolbar`, `LearningContent`, `LearningProgress`, `ContinueLearningCard`
- Primary Services: `CourseRepository` (load/search workflow)
- Repositories: `src/features/learning/repository/CourseRepository.js`
- Dependencies: `PageHeader`, `LessonRenderer`, `LearningToolbar`, `LearningSidebar`, `localStorage`

## `/studio`
- Entry Component: `src/features/studio/pages/PromptStudio.jsx`
- Layout: `DashboardLayout`
- Provider: `src/features/studio/state/PromptStudioProvider.jsx`
- Context: `src/features/studio/state/PromptStudioContext.jsx`
- Primary Panels: `PromptWorkbench`, `BuilderPanel`, `EditorPanel`, `AnalysisPanel`
- Primary Components: `PromptBuilder`, `PromptEditor`, `PromptOutput`, `PromptActions`, `EditorStatistics`, `FrameworkReason`
- Primary Services: `PromptEngine`, `ImprovementService`, `PromptAnalyzer`, `PromptScorer`, `PromptComparer`, `PromptConverter`
- Repositories: `src/features/studio/repository/PromptRepository.js` (present, unused by current flow)
- Dependencies: `usePromptStudio`, `AIService`, `StorageService`, `defaultConfig`, `improvePromptTemplate`

## `/library`
- Entry Component: `src/features/library/pages/PromptLibrary.jsx`
- Layout: `DashboardLayout`
- Provider: `src/features/library/state/PromptLibraryProvider.jsx`
- Context: `src/features/library/state/PromptLibraryContext.jsx`
- Primary Panels: `FilterPanel`, `GalleryPanel`, `PreviewPanel`
- Primary Components: `LibraryStatistics`, `PromptLibraryLayout`
- Primary Services: `TemplateService`
- Repositories: `src/features/library/repository/TemplateRepository.js`
- Dependencies: `usePromptLibrary`, `localStorage`, static prompt template data

## `/settings`
- Entry Component: `src/features/settings/pages/SettingsPage.jsx`
- Layout: `DashboardLayout`
- Provider: root `AIProvider`
- Context: `src/features/ai/context/AIContext.jsx`
- Primary Panels: `AIProviderSettings`, `SettingsSidebar`
- Primary Components: `SettingsLayout`, `ProviderSelector`, `ProviderConfiguration`
- Primary Services: `AIService` (configuration consumption)
- Repositories: none
- Dependencies: `useAI`, `StorageService`, provider configuration panel components

## `/best-practices`
- Entry Component: inline placeholder in `src/routes/AppRoutes.jsx`
- Layout: `DashboardLayout`
- Provider: none
- Context: none
- Primary Panels: placeholder panel
- Primary Components: placeholder render
- Primary Services: none
- Repositories: none
- Dependencies: none

## `/ai-test`
- Entry Component: `src/features/ai/pages/AITestPage.jsx`
- Layout: `DashboardLayout`
- Provider: root `AIProvider`
- Context: `AIContext`
- Primary Panels: none
- Primary Components: prompt text area, response panel
- Primary Services: `AIService`
- Repositories: none
- Dependencies: `useAI`, `useState`, `localStorage` via AI configuration

---

# Dashboard Runtime

Dashboard
?
Components
?
Dependencies
?
Navigation
?
Feature Launch Points

`DashboardPage` is rendered by the `/` route within `DashboardLayout`.

Components:
- `PageHeader`
- `WelcomeBanner`
- `DashboardCards`
- `QuickActions`

Dependencies:
- layout chrome from `DashboardLayout`
- sidebar and header chrome from `Sidebar` and `Header`
- route navigation through `react-router-dom`
- UI components for cards and quick action links

Navigation:
- Dashboard cards and quick actions target feature routes: `/learning`, `/studio`, `/library`, `/best-practices`.
- The dashboard serves as a launch point for the main application features.

Feature Launch Points:
- Learning Hub
- Prompt Studio
- Prompt Library
- Best Practices placeholder

---

# Learning Runtime

LearningHub
?
LearningProvider
?
LearningContext
?
Hooks
?
CourseRepository
?
Services
?
Components
?
Renderers
?
UI

`LearningHub` mounts `LearningProvider` and renders `LearningHubContent`.

`LearningProvider`:
- uses `useState` for `course`, `loading`, `selectedChapter`, `selectedSection`, `search`, `bookmarks`, `favorites`, `completedLessons`
- persists UI state to `localStorage` under `learning-state`
- loads course data via `CourseRepository.load()` on mount
- exposes operations: `setSearch`, `setSelectedChapter`, `setSelectedSection`, `toggleBookmark`, `toggleFavorite`, `completeLesson`

`LearningContext` is created by `createContext(null)`.

Hooks and consumers:
- `useLearning` returns context values from `LearningContext`
- `LearningContent`, `LearningSidebar`, `LearningToolbar`, `BookmarkPanel`, `FavoritesPanel`, `LearningProgress`, `ContinueLearningCard` consume the context

`CourseRepository`:
- loads static JSON from `src/content/course.json`
- converts it to `Course` domain object
- provides helper methods: `loadCourse`, `getCourse`, `getChapters`, `getChapter`, `getSection`, `search`
- contains a `clearCache()` placeholder

Services:
- `CourseRepository` acts as the primary service/repository layer for course data.

Components and renderers:
- `LearningSidebar` renders chapter navigation and state indicators
- `LearningToolbar` renders search controls
- `LearningContent` renders a `LessonRenderer` for selected chapter content
- `BookmarkPanel` and `FavoritesPanel` render saved state
- `LearningProgress` computes progress from context state

UI:
- page header, content panels, sidebar, details panels, and progress summary
- state-driven rendering depending on `course` and `loading`

---

# Prompt Studio Runtime

PromptStudio
?
PromptStudioProvider
?
PromptStudioContext
?
PromptWorkbench
?
BuilderPanel
?
EditorPanel
?
AnalysisPanel
?
PromptActions
?
PromptEngine
?
AIService
?
ProviderFactory
?
Provider

`PromptStudio` mounts `PromptStudioProvider` and displays `PromptWorkbench`.

`PromptStudioProvider`:
- creates `studio` state via `usePromptStudio()`
- exposes the state object through `PromptStudioContext`

`PromptStudioContext` is created by `createContext(null)`.

`PromptWorkbench`:
- composes feature panes: `BuilderPanel`, `EditorPanel`, `AnalysisPanel`
- reads context via `usePromptStudioContext()`

`BuilderPanel`:
- includes `PromptBuilder`
- delegates generated prompt values to `studio.setPrompt`

`EditorPanel`:
- renders `EditorStatistics`, `PromptEditor`, `PromptActions`, `PromptOutput`
- binds prompt and improved prompt values from context
- forwards action handlers from context

`AnalysisPanel`:
- renders analysis dashboard when `studio.evaluation` exists
- includes `EnterpriseScoreCard`, `PromptHealthIndicator`, `ConfidenceMeter`, `FrameworkReason`, `PromptMetadata`, `StrengthsPanel`, `WeaknessesPanel`, `Recommendations`

`PromptActions`:
- exposes buttons for Improve, Evaluate, Convert, Clear
- invokes the hook handlers from `usePromptStudio`

`usePromptStudio`:
- manages prompt text, improvedPrompt, evaluation state
- debounces evaluation via `useEffect`
- calls `PromptEngine.evaluate`, `PromptEngine.improve`, and `PromptEngine.convert`

`PromptEngine`:
- `evaluate(prompt)` analyzes prompt using `PromptAnalyzer` and scores it using `PromptScorer`
- recommends a framework using `FrameworkEngine`
- builds a result object with analysis, score, strengths, weaknesses, recommendations, and improvements
- `improve(prompt)` uses `ImprovementService.improve(prompt)`, re-evaluates the improved prompt, and compares original/improved prompts with `PromptComparer`
- `convert(prompt, format)` delegates to `PromptConverter`

`ImprovementService`:
- loads AI configuration from `StorageService.get("ai-config")` or `defaultConfig`
- instantiates `AIService` with config
- builds a system prompt from `src/features/ai/prompts/ImprovePrompt.js`
- executes the AI request and returns the trimmed response

`AIService`:
- constructs a provider via `ProviderFactory.create(config)`
- executes prompts and exposes `getModels()` and `testConnection()` methods

`ProviderFactory`:
- currently supports `ollama` and defaults to `MockProvider`
- returns provider instance based on `config.provider`

Concrete providers:
- `OllamaProvider` uses fetch to call `endpoint/api/chat` and `endpoint/api/tags`
- `MockProvider` returns simulated responses and a mock model list

Dependencies:
- `PromptBuilder` uses internal local state for prompt composition
- `PromptEditor` and `PromptOutput` render prompt text and improved prompt
- Analyzer, scorer, comparer, converter services execute synchronously in the browser
- Improvement path depends on `AIService` and external provider execution

---

# Prompt Library Runtime

PromptLibrary
?
PromptLibraryProvider
?
PromptLibraryContext
?
Layouts
?
Panels
?
TemplateService
?
TemplateRepository
?
Data Sources

`PromptLibrary` mounts `PromptLibraryProvider` and renders `PromptLibraryContent`.

`PromptLibraryProvider`:
- creates library state via `usePromptLibrary()`
- provides the state through `PromptLibraryContext`

`PromptLibraryContext` is created by `createContext(null)`.

Layouts:
- `PromptLibraryLayout` arranges statistics, filters, gallery, preview
- `LibraryStatistics` renders summary counts

Panels:
- `FilterPanel` reads context and renders search/filter controls
- `GalleryPanel` renders template list cards
- `PreviewPanel` shows details for the selected template and provides `onUse`

`usePromptLibrary`:
- manages search, category, framework, difficulty, sort, selectedTemplate, and refresh state
- memoizes filtered templates from `TemplateService.query`
- exposes `toggleFavorite`, `useTemplate`, `clearFilters`
- reads favorites and recent from `TemplateService`

`TemplateService`:
- queries static template data by search, category, framework, difficulty, and sort
- delegates favorites and recent operations to `TemplateRepository`
- and returns templates from static `../data`

`TemplateRepository`:
- persists favorites and recent IDs in `localStorage`
- manages add/remove and list operations for favorites/recent
- exposes clear operations

Data Sources:
- static prompt templates imported from `src/features/library/data`
- browser `localStorage` for favorites and recent history

---

# Settings Runtime

Settings
?
AI Context
?
Configuration
?
Provider Selection
?
Provider Configuration Panels
?
Persistence

`SettingsPage` renders `SettingsLayout` within the `/settings` route.

`SettingsLayout`:
- renders `SettingsSidebar`
- renders `AIProviderSettings`

AI Context:
- `AIProvider` in `src/features/ai/context/AIProvider.jsx` manages `config` state
- `config` is initialized from `StorageService.get("ai-config", defaultConfig)`
- `updateConfig` updates state and persists to storage

Configuration:
- `ProviderSelector` renders a select control for provider type
- `ProviderConfiguration` chooses provider-specific panel based on `config.provider`

Provider Selection:
- options: `mock`, `ollama`, `azure`, `openai`, `copilot`
- runtime selection is resolved by `ProviderFactory`

Provider Configuration Panels:
- `MockProviderConfig`
- `OllamaProviderConfig`
- `AzureProviderConfig`
- `OpenAIProviderConfig`
- `CopilotProviderConfig`

Persistence:
- AI provider configuration is stored through `StorageService`
- `StorageService` wraps browser `localStorage`
- provider selection affects `AIService` runtime provider resolution

---

# AI Runtime

AIContext
?
AIProvider
?
AIService
?
ProviderFactory
?
Concrete Providers
?
Execution

`AIContext` is created with `createContext(null)` and provides `config` and `updateConfig`.

`AIProvider`:
- manages AI configuration state
- persists changes using `StorageService`
- exposes provider runtime configuration to the application

`AIService`:
- constructs the concrete provider from `ProviderFactory`
- executes prompt requests through the provider
- supports `execute`, `getModels`, and `testConnection`

`ProviderFactory`:
- returns `OllamaProvider` when `config.provider === "ollama"`
- returns `MockProvider` for all other values

Concrete Providers:
- `OllamaProvider` calls external HTTP endpoints for model discovery and chat completion
- `MockProvider` returns simulated response objects and a mock model list
- `OpenAIProvider` file exists but contains no implementation
- `CopilotProvider` file exists but contains no implementation

Execution:
- runtime provider selection occurs at `AIService` construction using the current `config.provider`
- `ImprovementService` uses `AIService` to execute the `ImprovePrompt` system prompt against the selected provider
- `AITestPage` uses `AIService` directly to execute user-entered prompts

---

# Knowledge Runtime

KnowledgeRepository
?
KnowledgeLoader
?
KnowledgeCache
?
KnowledgeIndexer
?
SearchIndex
?
KnowledgeEngine
?
RecommendationEngine
?
RuntimeEngine

Startup Initialization:
- `src/main.jsx` imports `KnowledgeRepository` from `src/features/knowledge`
- `KnowledgeRepository.initialize()` runs before React rendering
- initialization loads framework data, caches it, and builds the search index

`KnowledgeRepository`:
- uses `KnowledgeLoader.loadFrameworks()`
- stores frameworks in `KnowledgeCache`
- invokes `KnowledgeIndexer.build()`
- exposes framework lookup and count operations

`KnowledgeLoader`:
- reads `course.json` from `src/content/course.json`
- converts course chapter/section framework metadata into `Framework` domain objects

`KnowledgeCache`:
- stores frameworks in a Map keyed by framework ID
- provides retrieval and clearing operations

`KnowledgeIndexer`:
- clears `SearchIndex`
- extracts keywords, tags, roles, domains, lifecycle values, and related frameworks from cached frameworks
- adds frameworks to `SearchIndex`

`SearchIndex`:
- stores frameworks by ID
- supports retrieval of all frameworks

`KnowledgeEngine`:
- initializes the knowledge runtime
- executes prompt analysis and recommendation flows
- builds runtime context for AI/system prompts

`KnowledgeAnalyzer`:
- searches frameworks via `KnowledgeSearchService`
- detects prompt intent and complexity
- returns analysis including recommended framework and confidence

`RecommendationEngine`:
- receives prompt text
- consults `KnowledgeAnalyzer`
- builds recommendation context and system instructions from the recommended framework

Runtime Interactions:
- the knowledge runtime is initialized globally on startup
- it is available as a runtime service layer, though no dedicated route currently consumes it directly
- analysis and recommendation functions rely on the indexed framework data and search engine

---

# State Ownership

Global State:
- AI configuration in `AIProvider`
- Knowledge runtime cache and index in `KnowledgeRepository` and `KnowledgeCache`
- `StorageService` wrapper state is global utility state

Feature State:
- `LearningProvider` state for course data, selection, search, bookmarks, favorites, completed lessons
- `PromptStudioProvider` state for prompt text, improved prompt, and evaluation
- `PromptLibraryProvider` state for library filters, selected template, and refresh control

Local State:
- `PromptBuilder` wizard state for step and prompt model fields
- `AITestPage` local state for prompt text, response, and loading
- individual component UI state where used

Persistent State:
- AI config persisted by `StorageService` to browser `localStorage`
- Learning Hub state persisted under `learning-state` to browser `localStorage`
- Prompt Library favorites and recent lists persisted to browser `localStorage`
- `PromptRepository` persistence exists in source but is not wired into runtime flows

Transient State:
- evaluation results in prompt studio
- improved prompt text before persistence
- search/filter session state in prompt library
- runtime selection state in the prompt builder wizard

---

# Repository Relationships

`CourseRepository`
- Consumers: `LearningProvider`, `useCourse` hook
- Dependencies: static course JSON from `src/content/course.json`, `Course` domain model
- Persistence: none beyond in-memory conversion of static content
- Storage: none

`TemplateRepository`
- Consumers: `TemplateService`
- Dependencies: browser `localStorage`
- Persistence: favorites and recent template IDs
- Storage: `localStorage` under keys `mrpromptstudio.library.favorites` and `mrpromptstudio.library.recent`

`PromptRepository`
- Consumers: none in current runtime flow
- Dependencies: browser `localStorage`
- Persistence: prompt object under `mrpromptstudio.prompt`
- Storage: `localStorage`

`KnowledgeRepository`
- Consumers: startup initialization and knowledge runtime services
- Dependencies: `KnowledgeLoader`, `KnowledgeCache`, `KnowledgeIndexer`
- Persistence: runtime cache only
- Storage: memory-based Map

---

# Service Relationships

`AIService`
? consumed by: `AITestPage`, `ImprovementService`
? dependencies: `ProviderFactory`, provider implementations
? output: provider response objects and prompt execution results

`ProviderFactory`
? consumed by: `AIService`
? dependencies: runtime `config.provider`
? output: concrete provider instance

`PromptEngine`
? consumed by: `usePromptStudio`
? dependencies: `PromptAnalyzer`, `PromptScorer`, `PromptComparer`, `PromptConverter`, `ImprovementService`, `FrameworkEngine`
? output: prompt evaluation, improvement results, conversion outputs

`ImprovementService`
? consumed by: `PromptEngine`
? dependencies: `AIService`, `StorageService`, `defaultConfig`, `ImprovePrompt` template
? output: improved prompt text

`TemplateService`
? consumed by: `usePromptLibrary`
? dependencies: static template data and `TemplateRepository`
? output: filtered template lists, favorites, recent templates

`KnowledgeEngine`
? consumed by: global runtime and knowledge service layer
? dependencies: `KnowledgeRepository`, `KnowledgeAnalyzer`, `RecommendationEngine`, `ContextBuilder`
? output: runtime knowledge context and recommendations

---

# Runtime Dependency Graph

Major runtime dependencies include:
- React runtime and host components
- `react-router-dom` for route resolution and navigation
- global `AIProvider` for runtime configuration state
- feature providers for Learning, Studio, and Library state ownership
- repository layers for local persistence and static content access
- service layers for AI execution, prompt analysis, prompt improvement, and template filtering
- knowledge runtime layers for framework loading, indexing, search, and recommendation
- browser localStorage via `StorageService`

The dependency graph is layered with root host components at the top, feature providers and routers in the middle, and service/repository layers below.

---

# External Dependencies

- React
- React DOM
- React Router DOM
- Tailwind CSS
- Framer Motion (package dependency)
- Lucide React
- React Hot Toast
- React Hook Form
- React Icons
- Browser APIs
- `localStorage`
- `fetch` for external AI provider calls

---

# Runtime Observations

- The application startup sequence includes a pre-render knowledge initialization path.
- The route map is implemented through `AppRoutes` and a shared dashboard shell.
- Feature execution is isolated by providers and contexts, with feature-specific state contained in hooks.
- AI runtime provider selection is driven by configuration but currently resolves only Ollama and mock implementations.
- Knowledge runtime is initialized globally but is not exposed through a dedicated route.
- Browser local storage is the primary persistence mechanism for configuration and feature state.

---

# Evidence Classification

This document is classified as an **Implementation Evidence Document**.

The content has been derived exclusively from the current source code.

It documents:

- Runtime execution
- Component hierarchy
- State ownership
- Service dependencies
- Repository interactions
- Runtime initialization

This document shall not be used to define:

- Product Vision
- Business Requirements
- Enterprise Architecture
- Future Roadmap

Those concerns are governed by the Enterprise Architecture documentation.

---

# Review Status

| Area | Status |
|-------|--------|
| Runtime Startup | Reviewed |
| Routing | Reviewed |
| Feature Runtime | Reviewed |
| Learning Runtime | Reviewed |
| Prompt Studio Runtime | Reviewed |
| Prompt Library Runtime | Reviewed |
| AI Runtime | Reviewed |
| Knowledge Runtime | Reviewed |
| State Ownership | Reviewed |
| Dependency Mapping | Reviewed |

---

END OF DOCUMENT
