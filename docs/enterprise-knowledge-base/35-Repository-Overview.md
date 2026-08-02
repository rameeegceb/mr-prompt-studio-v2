# Repository Overview

## Purpose

This repository implements Mr. Prompt Studio as a React single-page application built with Vite. It is the canonical source for the current application runtime, feature modules, AI runtime integration, knowledge runtime initialization, local persistence, and enterprise onboarding documentation.

## Repository Structure

- `src/`
  - Primary application source code, feature modules, shared UI, runtime startup, routing, and application state.
- `docs/`
  - Enterprise knowledge base and implementation documentation for governance, architecture, runtime, and system status.
- `public/`
  - Static public assets served by Vite at runtime.
- `assets/`
  - Shared design assets, logos, icons, and application imagery.
- `package.json`, `vite.config.js`, `eslint.config.js`
  - Project build, dependency, and lint configuration.
- `README.md`
  - Repository introduction and workspace entry point.

## Source Code Structure

- `components/`
  - Shared UI components and reusable presentational elements consumed across feature pages.
- `config/`
  - Application configuration modules and constants used by the runtime.
- `core/`
  - Core services, utilities, and shared infrastructure such as storage.
- `features/`
  - Domain feature modules for dashboard, learning, studio, library, AI, knowledge, settings, and related subsystems.
- `hooks/`
  - Reusable React hooks for shared state and feature behavior.
- `layouts/`
  - Page layout components used to compose the application shell.
- `models/`
  - Domain models representing course, framework, prompt, and other data shapes.
- `providers/`
  - Shared provider implementations and runtime abstractions.
- `repositories/`
  - Application repositories for feature data access and persistence.
- `services/`
  - Shared services used by application features and runtime flows.
- `utils/`
  - General utility helpers and support functions.
- `pages/`
  - Top-level page components used by route definitions.
- `routes/`
  - Application route configuration and route composition.

## Feature Modules

| Feature | Primary Folder | Purpose | Main Route | Main Documentation |
|---|---|---|---|---|
| Dashboard | `src/features/dashboard/` | Home page and status view for the application shell. | `/` | `docs/enterprise-knowledge-base/02-Implementation/17-Current-Implementation-Status.md` |
| Learning Hub | `src/features/learning/` | Learning Hub with course content, bookmarks, progress, and search. | `/learning` | `docs/enterprise-knowledge-base/02-Implementation/24-Learning-Feature.md` |
| Prompt Studio | `src/features/studio/` | Prompt engineering workspace with evaluation, improvement, conversion, and comparison. | `/studio` | `docs/enterprise-knowledge-base/02-Implementation/25-Prompt-Studio.md` |
| Prompt Library | `src/features/library/` | Prompt template browsing, filtering, favorites, and recent history. | `/library` | `docs/enterprise-knowledge-base/02-Implementation/26-Prompt-Library.md` |
| Best Practices | `src/features/best-practices/` | Prompt engineering guidance and example patterns. | `/best-practices` | `docs/enterprise-knowledge-base/02-Implementation/17-Current-Implementation-Status.md` |
| Knowledge | `src/features/knowledge/` | Knowledge runtime initialization, caching, indexing, search, and context building. | internal runtime only | `docs/enterprise-knowledge-base/02-Implementation/27-Knowledge-System.md` |
| AI | `src/features/ai/` | AI runtime abstraction, provider selection, and test console. | `/ai-test` | `docs/enterprise-knowledge-base/02-Implementation/28-AI-System.md` |
| Settings | `src/features/settings/` | Settings page and AI provider configuration UI. | `/settings` | `docs/enterprise-knowledge-base/02-Implementation/29-Settings.md` |

## Shared Components

The repository uses shared UI components for consistent layout and navigation.

- Shared UI: `src/components/ui/` contains elements such as `PageHeader`, cards, panels, and form controls.
- Layouts: `src/layouts/` and `src/features/*/layouts/` contain page shells and feature-specific layout compositions.
- Navigation: `src/components/layout/Sidebar.jsx` and `src/components/layout/Header.jsx` provide application navigation and header UI.
- Cards: shared card-style components are used in feature dashboards and information panels.
- Forms: shared form controls are used across settings and feature input pages.
- Panels: feature panel components provide preview, filter, and sidebar regions.
- Headers: common page headers are implemented with `PageHeader` and feature-specific title sections.
- Sidebar: the application shell sidebar is rendered by `Sidebar` in `DashboardLayout`.
- Utility components: `src/components/common/` and `src/components/ui/` contain reusable utility components and presentation patterns.

## Application Startup

- `src/main.jsx`
  - Imports React, ReactDOM, `BrowserRouter`, `Toaster`, global CSS, `App`, and `AIProvider`.
  - Calls `KnowledgeRepository.initialize()` before rendering the React application.
  - Renders the app within `BrowserRouter` and `AIProvider`.
- `src/App.jsx`
  - Exposes `StorageService` globally on `window.StorageService`.
  - Renders `AppRoutes` as the root application component.
- `src/routes/AppRoutes.jsx`
  - Wraps the route tree with `DashboardLayout`.
  - Defines routes for `/`, `/learning`, `/studio`, `/library`, `/best-practices`, `/settings`, and `/ai-test`, plus a fallback redirect.
- `src/layouts/DashboardLayout.jsx`
  - Composes the application shell with `Sidebar`, `Header`, and a main content area.
- `src/features/ai/context/AIProvider.jsx`
  - Provides global AI configuration via React context.
  - Persists AI configuration through `StorageService` under the `ai-config` key.
- Knowledge initialization
  - `src/features/knowledge/repository/KnowledgeRepository.ts` loads frameworks with `KnowledgeLoader`, caches them in `KnowledgeCache`, and builds the search index with `KnowledgeIndexer`.

## State Management

- Contexts: feature-level React contexts are used for Learning, Prompt Studio, Prompt Library, and AI configuration.
- Providers: `LearningProvider`, `PromptStudioProvider`, `PromptLibraryProvider`, and `AIProvider` provide state and persistence.
- Hooks: feature hooks such as `useLearning`, `usePromptStudio`, `usePromptLibrary`, and `useAI` access provider state.
- Feature state: feature modules store UI state, selected items, search text, favorites, history, and prompt versions.
- Persistence: `StorageService` centralizes localStorage access and is also used directly by feature repositories such as `TemplateRepository` and `PromptRepository`.

## Repository Layer

- `CourseRepository` (`src/features/learning/repository/CourseRepository.js`)
  - Loads static course content from `content/course.json`.
  - Provides access to course, chapters, sections, and search results.
- `TemplateRepository` (`src/features/library/repository/TemplateRepository.js`)
  - Persists favorites and recent template IDs in localStorage.
  - Supports add, remove, query, and clear operations.
- `PromptRepository` (`src/features/studio/repository/PromptRepository.js`)
  - Persists prompt text, history, and version records in localStorage.
  - Supports prompt save/load, history management, versioning, and removal.
- `KnowledgeRepository` (`src/features/knowledge/repository/KnowledgeRepository.ts`)
  - Initializes the knowledge runtime and caches framework metadata.
  - Exposes framework lookup and count operations.
- `StorageService` (`src/core/services/StorageService.js`)
  - Central localStorage wrapper for the application.
  - Provides key building, availability checks, get/set/remove, export/import, and statistics.

## Service Layer

- `AIService` (`src/features/ai/services/AIService.js`)
  - Delegates AI requests to a provider created by `ProviderFactory`.
  - Supports `execute`, `getModels`, and `testConnection`.
- `TemplateService` (`src/features/library/services/TemplateService.js`)
  - Queries prompt templates and delegates favorite/recent storage to `TemplateRepository`.
- `PromptEngine` (`src/features/studio/services/PromptEngine.js`)
  - Central prompt processing engine for evaluate, improve, convert, and compare flows.
  - Coordinates `PromptAnalyzer`, `PromptScorer`, `PromptComparer`, `PromptConverter`, `ImprovementService`, and `FrameworkEngine`.
- `ImprovementService` (`src/features/studio/services/ImprovementService.js`)
  - Uses AI configuration and provider state to perform prompt improvement.
- `FrameworkEngine` (`src/features/studio/services/FrameworkEngine.js`)
  - Recommends frameworks for prompt analysis and evaluation.
- `PromptAnalyzer` (`src/features/studio/services/PromptAnalyzer.js`)
  - Analyzes prompts for the studio evaluation workflow.
- `PromptScorer` (`src/features/studio/services/PromptScorer.js`)
  - Scores prompt quality based on analysis results.
- `PromptConverter` (`src/features/studio/services/PromptConverter.js`)
  - Converts prompts into alternate formats.
- `PromptComparer` (`src/features/studio/services/PromptComparer.js`)
  - Compares prompt variations as part of the studio workflow.

## AI Layer

- `AIContext` and `AIProvider` (`src/features/ai/context/AIContext.jsx`, `src/features/ai/context/AIProvider.jsx`)
  - Context layer for AI configuration and runtime state.
- `AIProvider` (`src/features/ai/providers/AIProvider.js`)
  - Provider infrastructure base class.
- `ProviderFactory` (`src/features/ai/providers/ProviderFactory.js`)
  - Provider selection infrastructure.
- `MockProvider`, `OllamaProvider`, `OpenAIProvider`, `AzureOpenAIProvider`, `CopilotProvider`
  - Provider implementations present in the repository.
- `ConfigurationService`
  - ConfigurationService exists but is not currently part of the active runtime.
- `AITestPage` (`src/features/ai/pages/AITestPage.jsx`)
  - Internal AI test console route for runtime provider testing.

## Knowledge Layer

- `KnowledgeRepository` (`src/features/knowledge/repository/KnowledgeRepository.ts`)
  - Initializes knowledge framework data and caches it globally.
- `KnowledgeLoader` (`src/features/knowledge/services/KnowledgeLoader.ts`)
  - Loads framework metadata from course content into the knowledge runtime.
- `KnowledgeCache` (`src/features/knowledge/services/KnowledgeCache.ts`)
  - Stores loaded frameworks and supports framework lookup.
- `KnowledgeIndexer` (`src/features/knowledge/indexing/KnowledgeIndexer.ts`)
  - Builds a search index for knowledge runtime data.
- `KnowledgeSearchService` (`src/features/knowledge/search/KnowledgeSearchService.ts`)
  - Executes search operations against indexed knowledge data.
- `KnowledgeEngine` (`src/features/knowledge/engine/KnowledgeEngine.ts`)
  - Coordinates analysis, recommendations, and context building for knowledge requests.
- `KnowledgeAnalyzer` (`src/features/knowledge/analysis/KnowledgeAnalyzer.ts`)
  - Analyzes prompt input against loaded knowledge data.
- `RecommendationEngine` (`src/features/knowledge/recommendation/RecommendationEngine.ts`)
  - Recommends knowledge artifacts based on prompt analysis.
- `ContextBuilder` (`src/features/knowledge/context/ContextBuilder.ts`)
  - Builds knowledge context payloads for runtime execution.
- `RuntimeEngine` (`src/features/knowledge/runtime/RuntimeEngine.ts`)
  - Executes requests through the knowledge runtime pipeline.
- `RequestPipeline` (`src/features/knowledge/pipeline/RequestPipeline.ts`)
  - Routes runtime requests through `KnowledgeEngine`.

## Routing

| Route | Feature | Page | Layout |
|---|---|---|---|
| `/` | Dashboard | `src/features/dashboard/pages/DashboardPage.jsx` | `DashboardLayout` |
| `/learning` | Learning | `src/features/learning/pages/LearningHub.jsx` | `DashboardLayout` |
| `/studio` | Prompt Studio | `src/features/studio/pages/PromptStudio.jsx` | `DashboardLayout` |
| `/library` | Prompt Library | `src/features/library/pages/PromptLibrary.jsx` | `DashboardLayout` |
| `/best-practices` | Best Practices | `src/features/best-practices/pages/BestPractices.jsx` | `DashboardLayout` |
| `/settings` | Settings | `src/features/settings/pages/SettingsPage.jsx` | `DashboardLayout` |
| `/ai-test` | AI | `src/features/ai/pages/AITestPage.jsx` | `DashboardLayout` |

## Runtime Flow

- Browser loads the Vite-hosted application and `src/main.jsx`.
- `main.jsx` initializes `KnowledgeRepository`, then renders React.
- `App.jsx` exposes `StorageService` globally and renders `AppRoutes`.
- `AppRoutes.jsx` composes the route tree inside `DashboardLayout`.
- `DashboardLayout.jsx` renders the shared sidebar, header, and main content area.
- Route page components mount the selected feature page.
- Feature pages initialize domain state via providers and hooks.
- Feature services and repositories handle prompt processing, template queries, course loading, AI execution, storage persistence, and knowledge runtime operations.

## Documentation

The enterprise knowledge base documents current implementation and architecture coverage.

- Governance: `docs/enterprise-knowledge-base/01-Governance/`
- Architecture: `docs/enterprise-knowledge-base/03-Architecture/`
- Implementation: `docs/enterprise-knowledge-base/02-Implementation/`
- ADR: `docs/enterprise-knowledge-base/04-ADR/`
- Roadmap: `docs/enterprise-knowledge-base/06-Roadmap/`
- Architecture Index: `docs/enterprise-knowledge-base/31-Architecture-Index.md`
- Glossary: `docs/enterprise-knowledge-base/32-Glossary.md`
- Traceability Matrix: `docs/enterprise-knowledge-base/33-Traceability-Matrix.md`
- Document Dependency Map: `docs/enterprise-knowledge-base/34-Document-Dependency-Map.md`
- Knowledge Base Release Notes: `docs/enterprise-knowledge-base/36-Knowledge-Base-Release-Notes.md`

## Repository Statistics

- Physical feature folders under `src/features`: 20
- AI context files under `src/features/ai/context`: 2
- AI provider infrastructure files under `src/features/ai/providers`: 2
- AI provider implementation files under `src/features/ai/providers`: 5
- Physical repository-layer files under `src/**/repository`: 12
- Physical service-layer files under `src/**/services`: 58
- Physical layout files under `src/**/layouts`: 12
- Physical root layout files under `src/layouts`: 1
- Physical page files under `src/**/pages`: 8
- Physical files under `src/**/context`: 5
- Physical hook files under `src/**/hooks`: 21
- Physical route files under `src/routes`: 1
- Physical implementation documents under `docs/enterprise-knowledge-base/02-Implementation`: 15

Repository statistics are based on the current physical repository structure at the time of documentation and are not intended to represent logical architectural module counts.

## Executive Summary

Mr. Prompt Studio is a Vite-based React SPA with a clear split between shared application infrastructure, feature modules, and documentation. The runtime is driven by `src/main.jsx`, which initializes knowledge data and mounts the app inside browser routing. `AIProvider` delivers shared AI configuration, while feature providers manage Learning, Prompt Studio, Prompt Library, and settings state. The prompt engineering workflow is centered in `src/features/studio/` with `PromptEngine`, `ImprovementService`, `PromptAnalyzer`, `PromptScorer`, `PromptConverter`, `PromptComparer`, and `FrameworkEngine`. The knowledge runtime is initialized at startup and exposes framework data through `KnowledgeRepository`, `KnowledgeLoader`, `KnowledgeIndexer`, and `KnowledgeEngine`.

The repository is documented through the enterprise knowledge base and implements the current application without future-facing speculation. All content in this overview is drawn from the repository source and the current documentation inventory.