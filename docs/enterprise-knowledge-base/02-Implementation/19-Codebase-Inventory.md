# Document Information

Document ID: 19-Codebase-Inventory

Version: 1.0

Status: Draft

Purpose: Describe the physical structure of the Mr. Prompt Studio codebase based on current source files.

Audience: Enterprise Architects, Solution Architects, Technical Leads, Developers

---

# Executive Summary

The Mr. Prompt Studio repository is organized around a React single-page application with a clear separation of top-level assets, configuration, core utilities, feature modules, and documentation. The codebase includes a central `src` directory that contains application source, plus `docs`, `public`, and configuration files at the repository root. Features are grouped by business domain inside `src/features`, while shared infrastructure lives in `src/core`, `src/components`, `src/layouts`, `src/routes`, and `src/utils`.

The physical architecture is a hybrid of feature modules and shared layers. Each feature supplies pages, state providers, hooks, services, and repositories where required. Cross-cutting concerns such as storage and AI runtime configuration are centralized in core services and providers.

---

# Top-Level Project Structure

`src/`
- Primary application source. Contains React entry points, feature modules, layouts, shared components, utilities, and application-level configuration.

`docs/`
- Documentation content, including enterprise knowledge base documents and project documentation.

`public/`
- Static public assets served by the application.

`content/`
- Application content resources such as `course.json` used by learning and knowledge features.

`assets/`
- Asset files and static resources referenced by the UI.

`config/`
- Application configuration helpers and module definitions.

`package.json`
- Dependency manifest and scripts.

`vite.config.js`
- Vite build configuration.

`index.html`
- Application HTML host template.

`README.md`
- Project overview and instructions.

`eslint.config.js`
- Linting configuration.

---

# Source Code Organization

## `src/core/`
Purpose: shared infrastructure and cross-cutting services.
Responsibilities:
- application services
- shared components and providers
- utility helpers and constants
- validation and accessibility support
Dependencies: internal features and shared UI components.
Major Subfolders:
- `services/`
- `providers/`
- `repository/`
- `utils/`
- `components/`
- `constants/`
- `hooks/`
- `layouts/`
- `validation/`
- `ai/`

## `src/layouts/`
Purpose: application-level layout components.
Responsibilities:
- dashboard shell
- page structural layout
Dependencies: shared layout components and route rendering.
Major Files:
- `DashboardLayout.jsx`

## `src/routes/`
Purpose: route definitions and navigation mapping.
Responsibilities:
- route-to-page mapping
- route fallback handling
Dependencies: React Router DOM, feature page components.
Major Files:
- `AppRoutes.jsx`

## `src/components/`
Purpose: shared UI components and reusable building blocks.
Responsibilities:
- common UI controls
- layout primitives
- icon wrappers and feedback components
Dependencies: React and shared styles.
Major Subfolders:
- `common/`
- `feedback/`
- `icons/`
- `layout/`
- `ui/`

## `src/features/`
Purpose: feature modules representing business capabilities.
Responsibilities:
- feature pages
- components and panels specific to each feature
- feature state and providers
- feature services and repositories
Dependencies: core services, shared components, and feature-specific logic.
Major Subfolders:
- `dashboard/`
- `learning/`
- `studio/`
- `library/`
- `settings/`
- `ai/`
- `knowledge/`
- plus supporting feature domains like `analysis/`, `framework/`, `compare/`, and more.

## `src/content/`
Purpose: static content used by features.
Responsibilities:
- source data for learning and knowledge features.
Dependencies: features that consume course and framework content.
Major Files:
- `course.json`

## `src/models/`
Purpose: domain model abstractions.
Responsibilities:
- entity definitions for course, chapter, framework, section, example.
Dependencies: feature repositories and business logic.
Major Files:
- `Chapter.js`
- `Course.js`
- `Example.js`
- `Framework.js`
- `Section.js`

## `src/providers/`
Purpose: provider modules for AI runtime and external integration.
Responsibilities:
- provider implementations for AI execution.
Dependencies: AI service and feature usage.
Major Files:
- `AIProvider.js`
- `AzureOpenAIProvider.js`
- `CopilotProvider.js`
- `OllamaProvider.js`
- `OpenAIProvider.js`

## `src/repositories/`
Purpose: persistence and data access layer.
Responsibilities:
- access to repositories used by features.
Dependencies: feature services and local state.
Major Files:
- `CourseRepository.js`

## `src/services/`
Purpose: application services and business logic.
Responsibilities:
- encapsulate reusable service behavior.
Dependencies: providers, repositories, and feature modules.

## `src/utils/`
Purpose: shared utilities.
Responsibilities:
- helper functions and common utilities.
Dependencies: application code across features.

---

# Feature Inventory

## Dashboard
Purpose: Home page and navigation launch point.
Entry Page: `src/features/dashboard/pages/DashboardPage.jsx`
Primary Components: `WelcomeBanner`, `DashboardCards`, `QuickActions`, `PageHeader`
Providers: none
Contexts: none
Hooks: none
Services: none
Repositories: none
Models: none
Utilities: none
Status: implemented as route entry and navigation shell.

## Learning
Purpose: learning hub for course content and progress.
Entry Page: `src/features/learning/pages/LearningHub.jsx`
Primary Components: `LearningSidebar`, `LearningToolbar`, `LearningContent`, `LearningProgress`, `BookmarkPanel`, `FavoritesPanel`, `ContinueLearningCard`
Providers: `src/features/learning/state/LearningProvider.jsx`
Contexts: `src/features/learning/state/LearningContext.jsx`
Hooks: `src/features/learning/hooks/useLearning.js`, `useLearningContext.js`, `useCourse.js`
Services: `CourseRepository` also functions as the feature service layer
Repositories: `src/features/learning/repository/CourseRepository.js`
Models: course-related domain models under `src/models/`
Utilities: feature utilities under `src/features/learning` as required
Status: implemented with course data, persistence, and UI composition.

## Prompt Studio
Purpose: prompt authoring, evaluation, improvement, and analysis.
Entry Page: `src/features/studio/pages/PromptStudio.jsx`
Primary Components: `PromptWorkbench`, `BuilderPanel`, `EditorPanel`, `AnalysisPanel`, `PromptBuilder`, `PromptEditor`, `PromptActions`, `PromptOutput`
Providers: `src/features/studio/state/PromptStudioProvider.jsx`
Contexts: `src/features/studio/state/PromptStudioContext.jsx`
Hooks: `src/features/studio/hooks/usePromptStudio.js`, `usePromptStudioContext.js`
Services: `PromptEngine`, `ImprovementService`, `PromptAnalyzer`, `PromptScorer`, `PromptComparer`, `PromptConverter`, `FrameworkEngine`, `PromptEnhancer`, `PromptImprover`
Repositories: `src/features/studio/repository/PromptRepository.js` (present but not wired into main flows)
Models: `EvaluationResult` and related analysis models under `src/features/studio/models`
Utilities: prompt builder components and converters
Status: implemented for prompt tooling and AI improvement path.

## Prompt Library
Purpose: browse prompt templates, filters, and preview templates.
Entry Page: `src/features/library/pages/PromptLibrary.jsx`
Primary Components: `FilterPanel`, `GalleryPanel`, `PreviewPanel`, `LibraryStatistics`, `PromptLibraryLayout`
Providers: `src/features/library/state/PromptLibraryProvider.jsx`
Contexts: `src/features/library/state/PromptLibraryContext.jsx`
Hooks: `src/features/library/hooks/usePromptLibrary.js`, `usePromptLibraryContext.js`
Services: `src/features/library/services/TemplateService.js`
Repositories: `src/features/library/repository/TemplateRepository.js`
Models: template data structures are defined in feature data
Utilities: local filtering and persistence utilities
Status: implemented with browsing and persisted favorites/recent support.

## Settings
Purpose: AI provider configuration and runtime selection.
Entry Page: `src/features/settings/pages/SettingsPage.jsx`
Primary Components: `SettingsLayout`, `SettingsSidebar`, `AIProviderSettings`, `ProviderSelector`, `ProviderConfiguration`, provider-specific config panels
Providers: root `AIProvider` in `src/features/ai/context/AIProvider.jsx`
Contexts: `src/features/ai/context/AIContext.jsx`
Hooks: `src/features/ai/hooks/useAI.js`
Services: `AIService` (consumption of config)
Repositories: none specific to settings
Models: AI config shapes are inferred from `defaultConfig`
Utilities: provider configuration utilities
Status: implemented as UI with provider selection and panels.

## Knowledge
Purpose: knowledge runtime and framework search/indexing.
Entry Page: none dedicated in current source
Primary Components: not surfaced as page UI in current codebase
Providers: none
Contexts: none direct to UI
Hooks: feature hooks in `src/features/knowledge/hooks/`
Services: knowledge services under `src/features/knowledge/services/`
Repositories: `src/features/knowledge/repository/KnowledgeRepository.ts`
Models: `Framework`, `SearchResult`, `PromptAnalysis`, and recommendation models under `src/features/knowledge/models/`
Utilities: indexing, ranking, and search engine functionality
Status: implemented as runtime service layer but without dedicated route UI.

## AI
Purpose: runtime AI provider abstraction and execution.
Entry Page: `src/features/ai/pages/AITestPage.jsx`
Primary Components: AI test page UI and prompt panels
Providers: `src/features/ai/context/AIProvider.jsx`
Contexts: `src/features/ai/context/AIContext.jsx`
Hooks: `src/features/ai/hooks/useAI.js`
Services: `src/features/ai/services/AIService.js`
Repositories: none
Models: AI provider config shapes and request/response handling
Utilities: prompt templates and provider wrappers
Status: implemented with provider abstraction and test console.

## Best Practices
Purpose: placeholder route for future best practices content.
Entry Page: inline placeholder in `src/routes/AppRoutes.jsx`
Primary Components: placeholder render content
Providers: none
Contexts: none
Hooks: none
Services: none
Repositories: none
Models: none
Utilities: none
Status: placeholder only.

---

# Core Layer

## StorageService
Purpose: centralized browser storage wrapper.
Responsibilities:
- key building
- get/set/remove operations
- availability checks
- clearing application-specific keys
- export/import and statistics
Dependencies: browser `localStorage`
Status: implemented.

## Configuration
Purpose: central configuration management for AI provider defaults.
Responsibilities:
- default AI settings
Dependencies: used by AI runtime and improvement service
Status: implemented via `src/features/ai/config/defaultConfig.js`.

## Utilities
Purpose: shared helpers and cross-cutting logic.
Responsibilities:
- accessibility, validation, and generic helpers
Dependencies: used by core and feature modules
Status: present in `src/core/utils/` and `src/utils/`.

## Constants
Purpose: application constants and design tokens.
Responsibilities:
- color palettes
- spacing, typography, radius, shadows
- navigation definitions
Dependencies: UI styling and layout code
Status: implemented under `src/constants/`.

## Shared Helpers
Purpose: reusable component and state helpers.
Responsibilities:
- standard UI building blocks
- shared layout components and props
Dependencies: used across the app
Status: implemented in `src/components/` and `src/core/components/`.

---

# Shared Layer

## Components
Purpose: reusable UI elements and primitives.
Responsibilities:
- common controls
- feedback components
- icon components
- layout primitives
Dependencies: used by multiple feature modules
Status: implemented in `src/components/`

## Hooks
Purpose: reusable custom hooks.
Responsibilities:
- access shared contexts
- simplify state consumption
Dependencies: shared contexts and providers
Status: implemented in feature and core hooks directories

## Utilities
Purpose: shared helper functions.
Responsibilities:
- cross-feature utilities
- data transformation and formatting
Dependencies: broad application usage
Status: implemented in `src/utils/` and `src/core/utils/`

## Types
Purpose: type definitions and domain shapes.
Responsibilities:
- structured data models for features like knowledge
Dependencies: feature services and repositories
Status: partially implemented in TypeScript files under `src/features/knowledge/types/`.

## Icons
Purpose: iconography support.
Responsibilities:
- reusable icon components and imports
Dependencies: UI components
Status: implemented in `src/components/icons/`

## UI Elements
Purpose: reusable user interface components.
Responsibilities:
- buttons, cards, panels, text elements, statistics
Dependencies: feature pages and layouts
Status: implemented in shared UI component directories

---

# Layout Layer

## DashboardLayout
Purpose: application shell for authenticated/primary UI.
Responsibilities:
- sidebar placement
- header placement
- content viewport
Dependencies: `Sidebar`, `Header`
Status: implemented in `src/layouts/DashboardLayout.jsx`

## Header
Purpose: top application header.
Responsibilities:
- global navigation and branding
Dependencies: layout and route components
Status: implemented under `src/components/layout/`

## Sidebar
Purpose: navigation menu and application links.
Responsibilities:
- route navigation
- feature launch points
Dependencies: dashboard layout and routing
Status: implemented under `src/components/layout/`

## Navigation
Purpose: route and menu structure.
Responsibilities:
- static navigation definitions in `src/constants/navigation.js`
- integration with sidebar and header
Status: implemented via constants and layout components

## PageHeader
Purpose: page-level title and description header.
Responsibilities:
- consistent page presentation
Dependencies: page components across features
Status: implemented in `src/components/ui/PageHeader.jsx`

## Layout Components
Purpose: reusable structural containers.
Responsibilities:
- panel layouts
- grid and sectional composition
Dependencies: feature pages and content components
Status: implemented across `src/components/layout/` and feature layouts

---

# Routing Layer

## AppRoutes
Purpose: define application routes and fallback behavior.
Responsibilities:
- page route mapping
- route containment in `DashboardLayout`
- placeholder route rendering
Dependencies: `react-router-dom`, feature pages
Status: implemented in `src/routes/AppRoutes.jsx`

## Route Definitions
Purpose: map URL paths to feature entry components.
Responsibilities:
- `"/"` ? `DashboardPage`
- `"/learning"` ? `LearningHub`
- `"/studio"` ? `PromptStudio`
- `"/library"` ? `PromptLibrary`
- `"/best-practices"` ? placeholder
- `"/settings"` ? `SettingsPage`
- `"/ai-test"` ? `AITestPage`
- fallback wildcard route to `/`
Status: implemented.

## Protected Routes
Purpose: none apparent in current source.
Responsibilities: N/A
Dependencies: none
Status: not implemented.

## Navigation Strategy
Purpose: use React Router DOM for client-side navigation.
Responsibilities:
- static route definitions in `AppRoutes`
- route-based feature pages
Status: implemented.

---

# Service Inventory

## `StorageService`
Purpose: browser storage wrapper and persistence helper.
Consumers: `AIProvider`, feature providers, improvement service.
Dependencies: browser `localStorage`.
Status: implemented.

## `AIService`
Purpose: abstract AI execution across providers.
Consumers: `AITestPage`, `ImprovementService`.
Dependencies: `ProviderFactory`.
Status: implemented.

## `TemplateService`
Purpose: filter prompt templates and manage favorites/recent.
Consumers: `usePromptLibrary()`.
Dependencies: `TemplateRepository`, static prompt data.
Status: implemented.

## `PromptEngine`
Purpose: prompt evaluation, improvement orchestration, conversion.
Consumers: `usePromptStudio()`.
Dependencies: prompt analysis, scoring, comparing, improvement, conversion services.
Status: implemented.

## `KnowledgeSearchService`
Purpose: search knowledge frameworks.
Consumers: `KnowledgeAnalyzer`, `KnowledgeEngine`.
Dependencies: `SearchEngine`.
Status: implemented.

## `KnowledgeRepository`
Purpose: initialize and expose cached knowledge frameworks.
Consumers: startup and knowledge runtime services.
Dependencies: loader, cache, indexer.
Status: implemented.

## `CourseRepository`
Purpose: load learning content from static JSON.
Consumers: `LearningProvider`, learning hooks.
Dependencies: static course JSON and `Course` model.
Status: implemented.

---

# Repository Inventory

## `CourseRepository`
Purpose: access static learning content.
Persistence: none (static data only).
Consumers: learning features and hooks.
Status: implemented.

## `TemplateRepository`
Purpose: persist template favorites and recently used IDs.
Persistence: browser `localStorage`.
Consumers: `TemplateService`.
Status: implemented.

## `PromptRepository`
Purpose: persist prompt object state.
Persistence: browser `localStorage`.
Consumers: none in current flow.
Status: present but unused.

## `KnowledgeRepository`
Purpose: manage knowledge framework initialization and cache.
Persistence: runtime memory cache.
Consumers: knowledge services.
Status: implemented.

---

# Provider Inventory

## `AIProvider`
Purpose: manage AI runtime configuration.
Context: `AIContext`.
Consumers: feature settings and AI execution flows.
State Ownership: AI provider config.
Status: implemented.

## `LearningProvider`
Purpose: manage learning module state.
Context: `LearningContext`.
Consumers: learning components.
State Ownership: course state, selection, bookmarks, favorites, progress.
Status: implemented.

## `PromptStudioProvider`
Purpose: manage prompt studio state.
Context: `PromptStudioContext`.
Consumers: prompt studio components.
State Ownership: prompt text, improved prompt, evaluation.
Status: implemented.

## `PromptLibraryProvider`
Purpose: manage prompt library state.
Context: `PromptLibraryContext`.
Consumers: library components.
State Ownership: filters, selection, favorites, recent.
Status: implemented.

---

# Context Inventory

## `AIContext`
Purpose: provide AI configuration state.
Consumers: `useAI()`, provider configuration UI, `AIService` consumers.
State Managed: `config`, `updateConfig`.

## `LearningContext`
Purpose: provide learning module state.
Consumers: learning components and hooks.
State Managed: course, loading, selected chapter/section, search, bookmarks, favorites, completed lessons.

## `PromptStudioContext`
Purpose: provide prompt studio state.
Consumers: prompt studio UI components.
State Managed: prompt, improvedPrompt, evaluation, action handlers.

## `PromptLibraryContext`
Purpose: provide prompt library state.
Consumers: library components.
State Managed: search, filters, sort, selectedTemplate, favorites, recent.

---

# Hook Inventory

## `useAI()`
Purpose: consume AI runtime context.
Consumers: settings and AI pages.
Dependencies: `AIContext`.

## `useLearning()`
Purpose: consume learning context and expose state.
Consumers: `LearningHub`, learning components.
Dependencies: `LearningContext`.

## `useLearningContext()`
Purpose: access `LearningContext` directly.
Consumers: learning feature components.
Dependencies: React context.

## `useCourse()`
Purpose: load course data via repository.
Consumers: learning hooks.
Dependencies: `CourseRepository`.

## `usePromptStudio()`
Purpose: manage prompt studio business state.
Consumers: `PromptStudioProvider`.
Dependencies: `PromptEngine`, browser state hooks.

## `usePromptStudioContext()`
Purpose: access prompt studio context.
Consumers: prompt studio UI components.
Dependencies: React context.

## `usePromptLibrary()`
Purpose: manage prompt library state and filtering.
Consumers: `PromptLibraryProvider`.
Dependencies: `TemplateService`.

## `usePromptLibraryContext()`
Purpose: access prompt library context.
Consumers: library components.
Dependencies: React context.

---

# Component Inventory

## Dashboard Components
Grouped by home page functionality:
- `PageHeader`
- `WelcomeBanner`
- `DashboardCards`
- `QuickActions`
- route navigation and launch components

## Learning Components
Grouped by learning feature:
- sidebar/navigation: `LearningSidebar`
- toolbar/search: `LearningToolbar`
- content renderer: `LearningContent`, `LessonRenderer`
- panels: `BookmarkPanel`, `FavoritesPanel`, `LearningProgress`, `ContinueLearningCard`

## Prompt Studio Components
Grouped by prompt engineering feature:
- builder: `PromptBuilder`, step components (`GoalStep`, `RoleStep`, `ContextStep`, etc.)
- editor: `PromptEditor`, `PromptOutput`, `PromptActions`
- analysis: `EnterpriseScoreCard`, `PromptHealthIndicator`, `ConfidenceMeter`, `FrameworkReason`, `PromptMetadata`, `StrengthsPanel`, `WeaknessesPanel`, `Recommendations`
- layout: `PromptWorkbench`, `BuilderPanel`, `EditorPanel`, `AnalysisPanel`

## Prompt Library Components
Grouped by library feature:
- layout: `PromptLibraryLayout`, `LibraryStatistics`
- panels: `FilterPanel`, `GalleryPanel`, `PreviewPanel`

## Settings Components
Grouped by provider configuration:
- `SettingsLayout`, `SettingsSidebar`
- `AIProviderSettings`, `ProviderSelector`, `ProviderConfiguration`
- provider config panels: `MockProviderConfig`, `OllamaProviderConfig`, `AzureProviderConfig`, `OpenAIProviderConfig`, `CopilotProviderConfig`

## AI Components
Grouped by AI runtime console:
- `AITestPage`
- prompt text area and response display

## Knowledge Components
Grouped by runtime service only; no dedicated page components in current source

---

# Content Inventory

## `course.json`
Purpose: source learning and knowledge content.
Contains: course chapters, sections, framework references used by learning and knowledge loader.
Location: `src/content/course.json`

## `templates`
Purpose: prompt template data for library feature.
Contains: prompt definitions, categories, frameworks, difficulty, description, and prompt text.
Location: `src/features/library/data/`

## framework metadata
Purpose: knowledge framework objects derived from course content.
Contains: framework IDs, titles, descriptions, content, examples, and AI outputs.
Location: assembled by `src/features/knowledge/services/KnowledgeLoader.ts`

## prompt templates
Purpose: AI improvement and prompt building guidance.
Contains: fixed `ImprovePrompt` template for AI prompt improvement.
Location: `src/features/ai/prompts/ImprovePrompt.js`

## knowledge assets
Purpose: knowledge runtime source data and indexing assets.
Contains: knowledge loader, cache, indexer, and search engine artifacts.
Location: `src/features/knowledge/`

---

# AI Inventory

## `AIService`
Purpose: provider-agnostic AI execution.
Location: `src/features/ai/services/AIService.js`

## `ProviderFactory`
Purpose: select concrete AI provider implementation.
Location: `src/features/ai/providers/ProviderFactory.js`

## Providers
- `OllamaProvider` (`src/features/ai/providers/OllamaProvider.js`)
- `MockProvider` (`src/features/ai/providers/MockProvider.js`)
- `OpenAIProvider` (`src/features/ai/providers/OpenAIProvider.js`)
- `CopilotProvider` (`src/features/ai/providers/CopilotProvider.js`)
- base class: `src/features/ai/providers/AIProvider.js`

## Prompt Templates
Purpose: fixed AI prompts for improvement.
Location: `src/features/ai/prompts/ImprovePrompt.js`

## Configuration
Location: `src/features/ai/config/defaultConfig.js`
Purpose: default AI provider settings and endpoint configuration.

---

# Knowledge Inventory

## `KnowledgeRepository`
Location: `src/features/knowledge/repository/KnowledgeRepository.ts`

## `KnowledgeLoader`
Location: `src/features/knowledge/services/KnowledgeLoader.ts`

## `KnowledgeCache`
Location: `src/features/knowledge/services/KnowledgeCache.ts`

## `KnowledgeIndexer`
Location: `src/features/knowledge/indexing/KnowledgeIndexer.ts`

## `SearchIndex`
Location: `src/features/knowledge/indexing/SearchIndex.ts`

## `KnowledgeEngine`
Location: `src/features/knowledge/engine/KnowledgeEngine.ts`

## `KnowledgeAnalyzer`
Location: `src/features/knowledge/analysis/KnowledgeAnalyzer.ts`

## `RecommendationEngine`
Location: `src/features/knowledge/recommendation/RecommendationEngine.ts`

## `ContextBuilder`
Location: `src/features/knowledge/context/ContextBuilder.ts`

---

# Configuration Inventory

## Default Configuration
Location: `src/features/ai/config/defaultConfig.js`
Purpose: initial AI provider defaults for the application.

## Environment Configuration
Location: project root `vite.config.js` and `package.json`
Purpose: build/runtime environment setup.

## AI Configuration
Location: `src/features/ai/context/AIProvider.jsx`, `src/features/ai/config/defaultConfig.js`
Purpose: runtime AI provider selection and persistence.

## Storage Configuration
Location: `src/core/services/StorageService.js`
Purpose: centralized key management and local storage wrapper.

---

# Third-party Dependencies

React / React DOM
Usage: application framework and rendering.

React Router DOM
Usage: client-side route management.

Tailwind CSS / @tailwindcss/vite
Usage: styling and UI layout.

Framer Motion
Usage: animation library dependency referenced in package manifest.

Lucide React
Usage: icon rendering in UI components.

React Hot Toast
Usage: toast notifications UI.

React Hook Form
Usage: form handling dependency listed in package manifest.

React Icons
Usage: supplemental icon components.

Browser APIs
Usage: `localStorage` persistence, `fetch` calls for AI providers.

---

# Architectural Classification

## Core Components
- `StorageService`
- `AIService`
- `ProviderFactory`
- `CourseRepository`
- `KnowledgeRepository`
- shared layout and route infrastructure

## Feature Components
- learning UI components
- prompt studio UI and analysis panels
- prompt library panels and layouts
- settings configuration panels

## Reusable Components
- `PageHeader`
- shared UI controls in `src/components/ui/`
- layout building blocks in `src/components/layout/`

## Infrastructure Components
- `AppRoutes`
- `DashboardLayout`
- `AIProvider`
- `StorageService`
- knowledge runtime services

## Experimental Components
- knowledge runtime modules under `src/features/knowledge/` (runtime service layer without dedicated UI)

## Placeholder Components
- best practices placeholder route
- provider configuration panel stubs for Azure, OpenAI, Copilot

## Deprecated Components
- `src/features/learning/services/CourseRepository.old.js` appears to be legacy source

## Unused Components
- `src/features/studio/repository/PromptRepository.js` is present but not consumed by current runtime flows

---

# Extension Points

Current extension points evident in the codebase include:
- feature module folders under `src/features/` for new business capabilities
- provider abstraction in `src/features/ai/providers/`
- knowledge runtime architecture under `src/features/knowledge/`
- shared storage infrastructure in `src/core/services/StorageService.js`
- route definitions in `src/routes/AppRoutes.jsx`

Only existing architectural extension points are documented.

---

# Overall Assessment

The codebase is organized around a React application with distinct feature packages, a shared core layer, and a centralized route/layout structure. Physical organization is feature-centric with cross-cutting services in core and shared UI components in `src/components`. The repository contains both implemented feature modules and placeholders for future capabilities, with several provider and route stubs included in the current source.
