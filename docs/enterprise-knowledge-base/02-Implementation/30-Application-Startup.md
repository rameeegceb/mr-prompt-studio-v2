# Application Startup

## Purpose

Document the current application startup sequence for Mr. Prompt Studio. This file describes how the app initializes browser routing, application providers, knowledge initialization, AI configuration, layout composition, and shared infrastructure.

## Scope

Covers startup implementation in:
- `src/main.jsx`
- `src/App.jsx`
- `src/routes/`
- `src/layouts/`
- shared providers
- knowledge initialization
- AI initialization
- dashboard registration
- router configuration
- global storage and styles

## Startup Entry Point

### `src/main.jsx`
- Entry point for browser startup.
- Imports application tests from `src/tests/intelligence-test` as a side effect.
- Imports React, ReactDOM, `BrowserRouter`, `Toaster`, global CSS, `App`, `AIProvider`, and the `KnowledgeRepository`.
- Calls `KnowledgeRepository.initialize()` once at startup before rendering React.
- Creates the React root with `ReactDOM.createRoot(document.getElementById("root"))`.
- Renders the app inside:
  - `React.StrictMode`
  - `BrowserRouter`
  - `AIProvider`
  - `Toaster`
  - `App`

### `src/App.jsx`
- Imports `AppRoutes` and `StorageService`.
- Exposes `StorageService` globally on `window.StorageService`.
- Renders `<AppRoutes />` as the application shell.

### React root
- Root element is the DOM node with id `root`.
- React root is created via `ReactDOM.createRoot(...)`.

### StrictMode
- The application is wrapped in `React.StrictMode`.
- This enables React development checks and runtime warnings.

### BrowserRouter
- `BrowserRouter` is the router wrapper used for all client-side navigation.
- It is mounted around `AIProvider`, `Toaster`, and `App`.

## Startup Architecture

### Root components
- `src/main.jsx` is the splash entrypoint and bootstraps the runtime.
- `src/App.jsx` is the root React component and renders the route tree.
- `src/routes/AppRoutes.jsx` defines application routes and the route wrapper.
- `src/layouts/DashboardLayout.jsx` composes the dashboard shell.

### Providers
- `AIProvider` from `src/features/ai/context/AIProvider.jsx` is the only application provider initialized at startup.
- `Toaster` from `react-hot-toast` is rendered globally for toast notifications.

### Routing
- Routes are defined in `src/routes/AppRoutes.jsx` and rendered inside `DashboardLayout`.
- The route tree is inside a `Routes` component from `react-router-dom`.

### Dashboard layout
- `DashboardLayout` composes the application shell with `Sidebar` and `Header`.
- It renders route-specific page content inside a `<main>` element.

### Shared infrastructure
- Global CSS is imported from `src/index.css`.
- `StorageService` is imported and exposed on the window object for developer access.

## Startup Lifecycle

1. Browser loads the application bundle and executes `src/main.jsx`.
2. `src/tests/intelligence-test.ts` is imported for side-effect execution.
3. `KnowledgeRepository.initialize()` is invoked.
4. React root is created for the DOM node with id `root`.
5. The app is rendered inside `React.StrictMode`.
6. `BrowserRouter` is mounted to enable SPA routing.
7. `AIProvider` is mounted to provide shared AI configuration state.
8. `Toaster` is mounted for toast notifications.
9. `App` renders `AppRoutes`.
10. `AppRoutes` renders `DashboardLayout`.
11. `DashboardLayout` renders `Sidebar`, `Header`, and the routed feature page content.
12. The appropriate feature page is displayed based on the current route.

## Runtime Registration

### Routes
- `src/routes/AppRoutes.jsx` registers the following routes:
  - `/` → `DashboardPage`
  - `/learning` → `LearningHub`
  - `/studio` → `PromptStudio`
  - `/library` → `PromptLibrary`
  - `/best-practices` → `BestPractices`
  - `/settings` → `SettingsPage`
  - `/ai-test` → `AITestPage`
  - wildcard `*` → redirect to `/`

### Feature modules
- Route targets are imported from the `src/features/*/pages/` directories.
- Features are registered directly in `AppRoutes.jsx`.

### Navigation modules
- `src/config/modules.js` defines dashboard navigation entries.
- `Sidebar` imports `modules` and renders navigation links from this array.
- Navigation items include the same routes plus a temporary `ai-test` entry.

### Providers
- `AIProvider` is the application-level provider initialized at startup.
- `Toaster` is the global notification provider for UI feedback.

### Layouts
- `DashboardLayout` provides the top-level layout for routed pages.
- `Sidebar` and `Header` are included in the dashboard shell.

## Provider Initialization

### `AIProvider`
- File: `src/features/ai/context/AIProvider.jsx`
- Purpose: provide shared AI configuration and update methods.
- Responsibilities:
  - load persisted AI configuration from `StorageService` using `ai-config`
  - expose `config` and `updateConfig()` through React context
  - persist configuration updates back to `StorageService`
- Initialization order: mounted after `BrowserRouter` and before `App`.

### `Toaster`
- File: `react-hot-toast` import in `src/main.jsx`
- Purpose: render a global toast container.
- Responsibilities: display toast notifications from anywhere in the application.
- Initialization order: mounted at startup before `App`.

## Knowledge Initialization

- `KnowledgeRepository` is imported from `src/features/knowledge` in `src/main.jsx`.
- `KnowledgeRepository.initialize()` is called once at application startup.
- `KnowledgeRepository.initialize()` loads frameworks and builds the knowledge index.
- This happens before React render begins.

## AI Initialization

- `AIProvider` initializes AI configuration at render time.
- It calls `StorageService.get("ai-config", defaultConfig)` from `src/features/ai/context/AIProvider.jsx`.
- The configured AI settings are loaded from local storage or defaulted.
- The AI context is then available to all child components.

## Routing

- `AppRoutes` uses `react-router-dom` `Routes` and `Route` components.
- All routes are wrapped by `DashboardLayout`.
- A fallback route redirects any unknown path to `/`.
- The route tree is static and defined entirely in `src/routes/AppRoutes.jsx`.

## Dashboard Integration

- `DashboardLayout` is responsible for the application shell.
- It renders `Sidebar` and `Header` for all routed pages.
- `Sidebar` uses `NavLink` components and `modules` configuration to render navigation links.
- `Header` renders a fixed top bar with the application title and MVP badge.

## Shared Infrastructure

- `StorageService` is defined in `src/core/services/StorageService.js`.
- It is imported in `src/App.jsx` and exposed as `window.StorageService`.
- `StorageService` is used by `AIProvider` and by other features such as `ImprovementService`.
- Global CSS from `src/index.css` is imported in `src/main.jsx`.
- `Toaster` provides global notification UI.

## Runtime Dependencies

- Knowledge initialization depends on `src/features/knowledge/index.ts` and `KnowledgeRepository.initialize()`.
- AI initialization depends on the shared `AIProvider` context and `StorageService`.
- Routing depends on `BrowserRouter` and `AppRoutes`.
- Dashboard shell depends on `DashboardLayout`, `Sidebar`, and `Header`.
- Navigation depends on `src/config/modules.js`.

## Current Runtime Behavior

- On startup, the app initializes knowledge and renders the React SPA shell.
- The app always mounts `BrowserRouter`, `AIProvider`, and `Toaster` before rendering routes.
- Route rendering is nested inside the dashboard layout.
- The sidebar navigation is generated from the `modules` configuration.
- AI settings are loaded from local storage and exposed via context.
- Knowledge frameworks are loaded and indexed before the UI appears.

## Runtime Limitations

- The startup sequence has no error handling around `KnowledgeRepository.initialize()` in `src/main.jsx`.
- `StorageService` is exposed globally, but no initialization guard is required beyond its own localStorage availability checks.
- There is no additional top-level provider besides `AIProvider` and `Toaster`.
- The route list is static and hardcoded in `src/routes/AppRoutes.jsx`.

## Implementation Evidence

Reviewed files:
- `src/main.jsx`
- `src/App.jsx`
- `src/routes/AppRoutes.jsx`
- `src/layouts/DashboardLayout.jsx`
- `src/config/modules.js`
- `src/components/layout/Sidebar.jsx`
- `src/components/layout/Header.jsx`
- `src/features/ai/context/AIProvider.jsx`
- `src/features/ai/hooks/useAI.js`
- `src/features/knowledge/index.ts`
- `src/features/knowledge/repository/KnowledgeRepository.ts`
- `src/core/services/StorageService.js`
- `src/tests/intelligence-test.ts`
- `src/index.css`

## Executive Summary

Application startup for Mr. Prompt Studio begins in `src/main.jsx`. The startup sequence initializes the knowledge repository, creates the React root, mounts `BrowserRouter`, initializes the shared `AIProvider`, registers the global `Toaster`, and renders `App`.

`App` simply renders `AppRoutes`, which wraps all feature routes inside `DashboardLayout`. The dashboard shell includes `Sidebar` navigation sourced from `src/config/modules.js` and a fixed `Header`.

The only top-level runtime providers are `AIProvider` for shared AI configuration and `Toaster` for notifications. Knowledge initialization occurs before the React render tree is mounted, and AI configuration is loaded from local storage at provider initialization.

Startup behavior is straightforward and linear: knowledge is initialized first, then the browser router and AI provider are mounted, followed by the application route tree. The runtime is limited by static route registration and the lack of additional global providers beyond AI and toast notifications.

### Output summary
- Files reviewed: 14
- Providers reviewed: 2 (`AIProvider`, `Toaster`)
- Routes reviewed: 1 (`src/routes/AppRoutes.jsx`)
- Layouts reviewed: 3 (`DashboardLayout`, `Sidebar`, `Header`)
- Startup components reviewed: 5 (`main.jsx`, `App.jsx`, `AppRoutes.jsx`, `DashboardLayout.jsx`, `AIProvider`)
- Evidence verification completed: yes