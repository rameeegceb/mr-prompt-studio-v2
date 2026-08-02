# Prompt Library

## Purpose

The Prompt Library feature provides a searchable repository of enterprise prompt templates. It is intended to help users browse reusable prompt patterns, preview prompt text, mark templates as favorites, and track recent template usage.

## Scope

The feature covers the library page, filter controls, prompt template browsing, favorite toggling, recent usage tracking, prompt preview, local persistence of favorites and recent prompt selections, and direct handoff of a selected template into Prompt Studio.
It does not currently include an advanced sorting UI for all query state fields.

## Runtime Entry

- Route: `/library`
- Navigation: configured in `src/config/modules.js` and surfaced as the Prompt Library dashboard card in `src/features/dashboard/data/dashboardCards.js`
- Page: `src/features/library/pages/PromptLibrary.jsx`
- Provider: `src/features/library/state/PromptLibraryProvider.jsx`
- Context: `src/features/library/state/PromptLibraryContext.jsx`
- Hook: `src/features/library/hooks/usePromptLibrary.js`

## Directory Structure

`src/features/library/`
- `pages/` - page entry points for the feature
- `layouts/` - layout composition for library page sections
- `panels/` - panel-level UI for filters, gallery, preview
- `components/` - reusable library UI components
- `state/` - context provider and hook integration
- `hooks/` - feature-specific state and behavior
- `services/` - query and template behavior
- `repository/` - persistence logic for favorites and recent use
- `models/` - runtime data shape for prompt templates
- `constants/` - shared library constants such as categories and sort options
- `utils/` - helper utilities for template sorting
- `data/` - source prompt template data modules

## Feature Architecture

- Pages
  - `PromptLibrary.jsx` is the root feature page.
- Components
  - `PromptLibraryLayout.jsx` composes statistics, filters, gallery, preview.
  - `LibraryStatistics.jsx` renders template, category, favorite, and recent counts.
  - `FilterPanel.jsx` renders search and category filter controls.
  - `GalleryPanel.jsx` renders individual `TemplateCard` items.
  - `PreviewPanel.jsx` renders detail preview for the selected template.
  - `TemplateSearch.jsx`, `CategoryFilter.jsx`, `TemplateCard.jsx`, badges, and score display components support the UI.
- Hooks
  - `usePromptLibrary.js` owns library state and orchestrates template querying, favorites, and recent tracking.
- Providers
  - `PromptLibraryProvider.jsx` wraps the page and provides context values.
- Contexts
  - `PromptLibraryContext.jsx` and `usePromptLibraryContext.js` expose the library state object to child components.
- Services
  - `TemplateService.js` performs template querying and delegates persistence operations.
- Repositories
  - `TemplateRepository.js` stores favorites and recent IDs in `localStorage`.
- Models
  - `PromptTemplate.js` defines the template object shape.
- Utilities
  - `sortTemplates.js` provides sort ordering logic.
- Configuration
  - `categories.js` defines category buttons.
  - `sortOptions.js` defines sort option metadata.

## Runtime Lifecycle

1. Application startup loads `AppRoutes.jsx`.
2. `/library` is routed to `PromptLibrary.jsx` inside `DashboardLayout`.
3. `PromptLibrary` wraps the content in `PromptLibraryProvider`.
4. `usePromptLibrary` initializes state for search, category, framework, difficulty, sort, selected template, and refresh.
5. `TemplateService.query` computes `templates` based on current search and category filters.
6. `FilterPanel`, `GalleryPanel`, and `PreviewPanel` render using context state.
7. User actions update context state and repository persistence.
8. A template can be saved into `PromptRepository` and then opened in Prompt Studio through route navigation.

## Runtime Flow

Dashboard
↓
Prompt Library
↓
Provider
↓
Repository
↓
Search / Categories
↓
Prompt Selection
↓
User Interaction
↓
Prompt Studio Handoff

### Dashboard

- Navigation to Prompt Library is available from `src/config/modules.js` (`path: "/library"`) and the dashboard card in `src/features/dashboard/data/dashboardCards.js`.
- `AppRoutes.jsx` maps `/library` to the `PromptLibrary` page.

### Prompt Library

- `PromptLibrary.jsx` renders a header, statistics, and the library workbench.
- It computes summary statistics from template counts, favorite IDs, recent IDs, and categories.

### Provider

- `PromptLibraryProvider.jsx` invokes `usePromptLibrary()` and exposes the returned object via `PromptLibraryContext.Provider`.

### Repository

- `TemplateRepository.js` persists two localStorage keys:
  - `mrpromptstudio.library.favorites`
  - `mrpromptstudio.library.recent`
- It supports get/add/remove favorite IDs and add/get recent IDs with a 20-item limit.

### Search / Categories

- `FilterPanel.jsx` exposes search input via `TemplateSearch.jsx` and category buttons via `CategoryFilter.jsx`.
- Search filters `template.title`, `template.description`, and `template.prompt`.
- Category filters by `template.category`.
- The current implementation does not surface framework, difficulty, or sort selection controls through the UI, although `usePromptLibrary` holds those state values.

### Prompt Selection

- `GalleryPanel.jsx` renders the filtered `templates` list with `TemplateCard`.
- Selecting a template via `onSelect` sets `selectedTemplate` in library state.
- `PreviewPanel.jsx` displays the selected template detail and provides `Use Prompt` and `Use in Studio` actions.

### User Interaction

- `TemplateCard` renders a `Favorite` button, a view button, and a `Use in Studio` action.
- `toggleFavorite(id)` in `usePromptLibrary` toggles favorite status through `TemplateService.toggleFavorite`.
- `useTemplate(template)` in `usePromptLibrary` records usage through `TemplateService.useTemplate` and updates `selectedTemplate`.
- Favorite count and recent count are computed from repository state and reflected in statistics.

### Prompt Studio Handoff

- `PromptLibrary.jsx` owns the handoff workflow.
- When `Use in Studio` is triggered, the page:
  - records template usage through the existing library hook
  - saves `template.prompt` through `PromptRepository.save(...)`
  - navigates to `/studio` with `react-router-dom`
- Prompt Studio then loads the selected template from `PromptRepository` through `usePromptStudio` initialization.

## Page Structure

`src/features/library/pages/PromptLibrary.jsx`
- Root page function `PromptLibrary` wraps page content in `PromptLibraryProvider`.
- `PromptLibraryContent` reads library context and renders:
  - `PageHeader`
  - statistics cards
  - `PromptLibraryLayout` with `FilterPanel`, `GalleryPanel`, and `PreviewPanel`

`PromptLibraryLayout.jsx`
- Renders `LibraryStatistics` and a three-column layout for filters, gallery, and preview.

## Component Inventory

- `PromptLibraryLayout.jsx`
  - Purpose: layout shell for library sections.
  - Runtime Status: active.
  - Evidence: imported and rendered by `PromptLibrary.jsx`.

- `LibraryStatistics.jsx`
  - Purpose: display counts for templates, categories, favorites, recent.
  - Runtime Status: active.
  - Evidence: rendered by `PromptLibraryLayout.jsx`.

- `FilterPanel.jsx`
  - Purpose: search and category filter UI.
  - Runtime Status: active.
  - Evidence: rendered by `PromptLibrary.jsx`.

- `GalleryPanel.jsx`
  - Purpose: render template cards and selection controls.
  - Runtime Status: active.
  - Evidence: rendered by `PromptLibrary.jsx`.

- `PreviewPanel.jsx`
  - Purpose: show selected template detail and `Use Prompt` / `Use in Studio` actions.
  - Runtime Status: active.
  - Evidence: rendered by `PromptLibrary.jsx`.

- `TemplateSearch.jsx`
  - Purpose: search input component.
  - Runtime Status: active.
  - Evidence: used in `FilterPanel.jsx`.

- `CategoryFilter.jsx`
  - Purpose: category picker UI.
  - Runtime Status: active.
  - Evidence: used in `FilterPanel.jsx`.

- `TemplateCard.jsx`
  - Purpose: display template preview, favorite action, and direct studio handoff.
  - Runtime Status: active.
  - Evidence: used in `GalleryPanel.jsx`.

- `DepartmentBadge.jsx`, `DifficultyBadge.jsx`, `FrameworkBadge.jsx`, `ScoreBadge.jsx`
  - Purpose: badges for template metadata.
  - Runtime Status: active.
  - Evidence: used in `PreviewPanel.jsx`.

- `EmptyState.jsx`, `FavoriteButton.jsx`, `TemplateGrid.jsx`, `TemplatePreview.jsx`
  - Purpose: present in library folder but not referenced by the current runtime under `src/features/library`.
  - Runtime Status: inactive/unreferenced.

## State Management

- Provider: `PromptLibraryProvider.jsx` provides context values.
- Context: `PromptLibraryContext.jsx` and `usePromptLibraryContext.js` expose state.
- Hook: `usePromptLibrary.js` owns state for search, category, framework, difficulty, sort, selected template, and refresh.
- State ownership: component-local hook state, not global app state.
- Persistence: favorites and recent template IDs persisted in localStorage via `TemplateRepository.js`.

## Repository Integration

- `TemplateRepository.js` stores favorites and recent template IDs.
- Favorite operations: `getFavorites()`, `addFavorite()`, `removeFavorite()`, `isFavorite()`, `clearFavorites()`.
- Recent operations: `getRecent()`, `addRecent()`, `isRecent()`, `clearRecent()`, `clearAll()`.
- Recent IDs are capped at 20 items.
- Prompt Library does not persist template prompt content in `TemplateRepository`; studio handoff reuses `PromptRepository` as the source of truth for the editor prompt.

## Services

- `TemplateService.js`
  - `query(filters)` returns filtered and sorted template list from `src/features/library/data`.
  - `getFavorites()` returns favorite IDs from repository.
  - `getRecent()` returns recent IDs from repository.
  - `toggleFavorite(id)` adds or removes favorites.
  - `useTemplate(id)` records recent usage and returns the template object.

## Cross-Feature Integration

- `PromptLibrary.jsx` imports `PromptRepository` from the studio feature.
- The library page does not create separate prompt persistence or routing state for studio loading.
- The existing studio repository and provider remain the single prompt-loading path.

## Models

- `PromptTemplate.js` defines the prompt template model with fields:
  - `id`, `title`, `description`, `department`, `category`, `framework`, `difficulty`, `tags`, `estimatedScore`, `prompt`, `examples`, `bestPractices`, `commonMistakes`, `version`, `author`
- The model is a runtime shape but the current implementation uses plain template objects from `src/features/library/data`.

## Search and Filtering

- Search is supported by the `search` state.
- Search logic matches `title`, `description`, and `prompt` text.
- Category filtering is supported by `category` state and `categories.js`.
- No tag, framework, or difficulty picker is present in the current UI.
- Sorting state exists in `usePromptLibrary` but there is no current UI consuming it.

## Prompt Templates

- Template source: `src/features/library/data/index.js` aggregates category files.
- Categories: defined in `src/features/library/constants/categories.js`.
- Runtime behavior: `TemplateService.query` filters templates from the imported data arrays.
- Current data status: all imported data modules currently export empty arrays, so `templates` resolves to an empty list in the current implementation.

## Dependencies

- Shared UI: uses `PageHeader` from shared `components/ui` and `lucide-react` icons.
- Dashboard: route and card configuration from `src/config/modules.js` and dashboard data.
- Prompt Studio: no evidence of runtime integration between selected templates and Prompt Studio in reviewed code.
- Knowledge/AI: none directly used by current library runtime.
- Repositories: `TemplateRepository.js` is the only persistence integration.

## Runtime Behavior

- Users navigate to `/library` to access prompt templates.
- The library page renders statistics, filters, template cards, and a preview panel.
- Searching and category selection reduce the visible template list.
- Selecting a template updates preview content.
- Favoriting toggles persisted favorite state.
- Using a prompt records recent template usage.

## Runtime Limitations

- The UI does not expose framework, difficulty, or sort controls even though state exists.
- Prompt templates are sourced from data modules that are currently empty.
- No active prompt injection into Prompt Studio is present from the library feature.

## Implementation Evidence

Reviewed files:
- `src/routes/AppRoutes.jsx`
- `src/config/modules.js`
- `src/features/dashboard/data/dashboardCards.js`
- `src/features/library/pages/PromptLibrary.jsx`
- `src/features/library/layouts/PromptLibraryLayout.jsx`
- `src/features/library/panels/FilterPanel.jsx`
- `src/features/library/panels/GalleryPanel.jsx`
- `src/features/library/panels/PreviewPanel.jsx`
- `src/features/library/components/LibraryStatistics.jsx`
- `src/features/library/components/TemplateSearch.jsx`
- `src/features/library/components/CategoryFilter.jsx`
- `src/features/library/components/TemplateCard.jsx`
- `src/features/library/components/DepartmentBadge.jsx`
- `src/features/library/components/DifficultyBadge.jsx`
- `src/features/library/components/FrameworkBadge.jsx`
- `src/features/library/components/ScoreBadge.jsx`
- `src/features/library/state/PromptLibraryProvider.jsx`
- `src/features/library/state/PromptLibraryContext.jsx`
- `src/features/library/state/usePromptLibraryContext.js`
- `src/features/library/hooks/usePromptLibrary.js`
- `src/features/library/services/TemplateService.js`
- `src/features/library/repository/TemplateRepository.js`
- `src/features/library/models/PromptTemplate.js`
- `src/features/library/constants/categories.js`
- `src/features/library/constants/sortOptions.js`
- `src/features/library/utils/sortTemplates.js`
- `src/features/library/data/index.js`
- `src/features/library/data/*Templates.js`

## Executive Summary

The Prompt Library is a routed feature at `/library` providing enterprise prompt template browsing. It is implemented as a context-backed page that queries static template data, exposes search and category filtering, and persists favorite and recent template IDs in localStorage.

State is owned by `usePromptLibrary`, with UI composed from `PromptLibraryLayout`, panels, and cards. The library data is sourced from `src/features/library/data/index.js`, but current data arrays are empty. Favorite and recent behavior are implemented through `TemplateRepository.js`.

Search and category filtering work on template title, description, and prompt content. The current runtime includes selected template preview and a `Use Prompt` action, but no cross-feature prompt transfer into Prompt Studio is present.

Files reviewed, components, hooks, providers, services, repositories, and models were verified against the current repository implementation.
