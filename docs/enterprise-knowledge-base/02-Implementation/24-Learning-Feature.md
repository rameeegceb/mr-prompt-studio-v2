# Learning Hub

## Purpose

The Learning Hub provides an enterprise learning experience for Prompt Engineering content. It delivers chapter-based curriculum, progress tracking, bookmarks, favorites, and a learning experience inside the Mr. Prompt Studio application.

## Scope

The Learning Hub implementation includes:
- `src/features/learning/pages/LearningHub.jsx`
- `src/features/learning/state/LearningProvider.jsx`
- `src/features/learning/state/LearningContext.jsx`
- `src/features/learning/state/useLearningContext.js`
- `src/features/learning/hooks/useLearning.js`
- `src/features/learning/repository/CourseRepository.js`
- `src/features/learning/models/Course.js`
- Learning UI components under `src/features/learning/components/`
- Supporting renderers under `src/features/learning/components/renderers/`
- Static course content loaded from `content/course.json`
- Dashboard navigation entries in `src/config/modules.js` and `src/features/dashboard/data/dashboardCards.js`
- Route wiring in `src/routes/AppRoutes.jsx`

## Runtime Entry

- Route: `/learning`
- Page: `src/features/learning/pages/LearningHub.jsx`
- Provider: `src/features/learning/state/LearningProvider.jsx`
- Hook: `src/features/learning/hooks/useLearning.js`
- Layout: global `src/layouts/DashboardLayout.jsx`
- Navigation entry: `src/config/modules.js` and `src/features/dashboard/data/dashboardCards.js`

### Evidence

- `src/routes/AppRoutes.jsx` imports and renders `<LearningHub />` for `/learning`.
- `src/features/learning/pages/LearningHub.jsx` wraps content in `<LearningProvider>`.
- `src/features/learning/hooks/useLearning.js` is used by `LearningHub.jsx`.
- `src/config/modules.js` defines a module with `path: "/learning"`.
- `src/features/dashboard/data/dashboardCards.js` includes cards that link to `/learning`.

## Feature Architecture

### Pages
- `LearningHub.jsx`
  - Root page for the Learning Hub feature.
  - Wraps `LearningHubContent` in `LearningProvider`.
  - Imports feature components and the `useLearning` hook.

### Components
- Used by runtime:
  - `LearningSidebar.jsx`
  - `LearningToolbar.jsx`
  - `LearningContent.jsx`
  - `LearningProgress.jsx`
  - `ContinueLearningCard.jsx`
  - `BookmarkPanel.jsx`
  - `FavoritesPanel.jsx`
  - `LessonRenderer.jsx`
  - `renderers/SectionRenderer.jsx`

- Additional components present in the feature folder but not referenced by `LearningHub.jsx` or current runtime page wiring:
  - `components/lesson/LessonViewer.jsx`
  - `components/lesson/LessonNavigation.jsx`
  - `components/sidebar/CourseSidebar.jsx`
  - `components/progress/ProgressPanel.jsx`
  - `components/ChapterCard.jsx`
  - `components/TableOfContents.jsx`
  - `components/SearchResults.jsx`

### Layouts
- The feature does not define its own layout file.
- Runtime page content is rendered inside global `DashboardLayout.jsx`.

### Hooks
- `useLearning.js` provides Learning Hub state derived from `LearningContext`.
- Additional hook files exist but are empty in current source:
  - `useCourse.js` (present, but not referenced in the active LearningHub page)
  - `useBookmarks.js`
  - `useFavorites.js`
  - `useSearch.js`
  - `useChapter.js`
  - `useProgress.js`

### Contexts
- `LearningContext.jsx` defines the React context for the feature.
- `useLearningContext.js` is a typed access helper for the context.

### Providers
- `LearningProvider.jsx` owns Learning Hub state and persistence.

### Services
- Current runtime uses no dedicated Learning-specific service implementations from an active feature service layer.
- The feature contains service files that are empty in current source:
  - `services/ProgressService.js`
  - `services/SearchService.js`
  - `services/FavoriteService.js`
  - `services/BookmarkService.js`

### Repositories
- `CourseRepository.js` loads and exposes static Learning course data.
- `CourseRepository.old.js` exists as a legacy artifact and is not referenced by current runtime sources.

### Models
- `Course.js` is used by `CourseRepository.js`.
- Additional model files present in the feature folder:
  - `Chapter.js`
  - `Section.js`
  - `Lesson.js` (empty)
  - `Module.js` (empty)
  - `LearningProgress.js`
  - `Framework.js`
  - `Example.js`
  - `BestPractice.js`
  - `AIOutput.js`

### Utilities
- `utils/SlugUtils.js` is present in the feature folder.

### Static Assets
- The feature loads course content from `content/course.json` via `CourseRepository.js`.

## Runtime Flow

1. User navigates to `/learning`.
2. `src/routes/AppRoutes.jsx` renders `LearningHub` inside `DashboardLayout`.
3. `LearningHub.jsx` renders `LearningProvider` around `LearningHubContent`.
4. `LearningProvider.jsx` initializes feature state:
   - Loads the course via `CourseRepository.load()`.
   - Reads saved learning state from `localStorage` under `learning-state`.
   - Sets `selectedChapter`, `selectedSection`, `bookmarks`, `favorites`, and `completedLessons`.
   - Defaults `selectedChapter` to the first chapter not titled "Table of Contents" when no saved chapter exists.
5. `LearningHubContent` calls `useLearning()`.
6. `useLearning()` returns context values and computes `readingProgress` from completed lessons and `course.totalChapters`.
7. The page renders:
   - `PageHeader` (shared UI component) for the course title and description.
   - `ContinueLearningCard` with the current chapter.
   - `LearningProgress` progress summary.
   - `LearningSidebar` chapter navigation and quick resume actions.
   - `LearningToolbar` with search input and bookmark/favorite buttons.
   - `LearningContent`, which renders `LessonRenderer` for the selected chapter.
   - `BookmarkPanel` and `FavoritesPanel` showing saved chapter IDs.

## Page Structure

### `LearningHub.jsx`
- Purpose: root page for the Learning feature.
- Components rendered:
  - `LearningProvider`
  - `LearningSidebar`
  - `LearningToolbar`
  - `LearningContent`
  - `ContinueLearningCard`
  - `LearningProgress`
  - `BookmarkPanel`
  - `FavoritesPanel`
- Provider usage: wraps page content in `LearningProvider`.
- Hooks used: `useLearning()`.
- Evidence: import and render statements in `src/features/learning/pages/LearningHub.jsx`.

### `LearningContent.jsx`
- Purpose: render selected chapter content.
- Components rendered: `LessonRenderer`.
- Provider usage: consumes `LearningContext` via `useLearningContext()`.
- Evidence: `src/features/learning/components/LearningContent.jsx`.

### `LearningSidebar.jsx`
- Purpose: display chapter navigation, bookmarks, favorites, and a continue button.
- Provider usage: consumes feature state through `useLearning()`.
- Evidence: `src/features/learning/components/LearningSidebar.jsx`.

### `LearningToolbar.jsx`
- Purpose: displays search input and toolbar actions.
- Provider usage: receives `course`, `search`, and `onSearch` from `LearningHubContent`.
- Evidence: `src/features/learning/components/LearningToolbar.jsx`.

### `LearningProgress.jsx`
- Purpose: display learning completion percentage.
- Inputs: `progress`, `chaptersCompleted`, `totalChapters`.
- Evidence: `src/features/learning/components/LearningProgress.jsx`.

### `ContinueLearningCard.jsx`
- Purpose: offers a resume learning action for the current chapter.
- Evidence: `src/features/learning/components/ContinueLearningCard.jsx`.

### `BookmarkPanel.jsx` and `FavoritesPanel.jsx`
- Purpose: display bookmarked and favorite chapter summaries.
- Evidence: `src/features/learning/components/BookmarkPanel.jsx`, `src/features/learning/components/FavoritesPanel.jsx`.

### `LessonRenderer.jsx`
- Purpose: render chapter sections and delegate section rendering.
- Evidence: `src/features/learning/components/LessonRenderer.jsx`.

### `renderers/SectionRenderer.jsx`
- Purpose: render section content, frameworks, examples, and AI output blocks.
- Evidence: `src/features/learning/components/renderers/SectionRenderer.jsx`.

## Component Inventory

| Component | Purpose | Runtime Status | Evidence |
|---|---|---|---|
| `LearningHub` | Root learning page | Compliant | `src/features/learning/pages/LearningHub.jsx` |
| `LearningProvider` | Feature state provider | Compliant | `src/features/learning/pages/LearningHub.jsx` |
| `useLearning` | Learning feature hook | Compliant | `src/features/learning/pages/LearningHub.jsx` |
| `LearningSidebar` | Chapter navigation and resume panel | Compliant | `src/features/learning/pages/LearningHub.jsx` |
| `LearningToolbar` | Search input and toolbar | Compliant | `src/features/learning/pages/LearningHub.jsx` |
| `LearningContent` | Content renderer for selected chapter | Compliant | `src/features/learning/pages/LearningHub.jsx` |
| `LearningProgress` | Progress summary card | Compliant | `src/features/learning/pages/LearningHub.jsx` |
| `ContinueLearningCard` | Resume current chapter action | Compliant | `src/features/learning/pages/LearningHub.jsx` |
| `BookmarkPanel` | Bookmarked items display | Compliant | `src/features/learning/pages/LearningHub.jsx` |
| `FavoritesPanel` | Favorite items display | Compliant | `src/features/learning/pages/LearningHub.jsx` |
| `LessonRenderer` | Chapter section renderer | Compliant | `src/features/learning/components/LearningContent.jsx` |
| `SectionRenderer` | Section-level content renderer | Compliant | `src/features/learning/components/LessonRenderer.jsx` |
| `LessonViewer` | Lesson display component | Not currently referenced | `src/features/learning/components/lesson/LessonViewer.jsx` |
| `LessonNavigation` | Lesson navigation buttons | Not currently referenced | `src/features/learning/components/lesson/LessonNavigation.jsx` |
| `CourseSidebar` | Course module navigation | Not currently referenced | `src/features/learning/components/sidebar/CourseSidebar.jsx` |
| `ProgressPanel` | Progress panel component | Not currently referenced | `src/features/learning/components/progress/ProgressPanel.jsx` |
| `ChapterCard` | Chapter card UI | Not currently referenced | `src/features/learning/components/ChapterCard.jsx` |
| `TableOfContents` | TOC navigation UI | Not currently referenced | `src/features/learning/components/TableOfContents.jsx` |
| `SearchResults` | Search results UI | Not currently referenced | `src/features/learning/components/SearchResults.jsx` |

## State Management

### LearningProvider
- Owns Learning Hub state inside `src/features/learning/state/LearningProvider.jsx`.
- State fields:
  - `course`
  - `loading`
  - `selectedChapter`
  - `selectedSection`
  - `search`
  - `bookmarks`
  - `favorites`
  - `completedLessons`
- Initialization:
  - Calls `CourseRepository.load()`.
  - Reads `learning-state` from `localStorage`.
  - Sets `selectedChapter` to saved chapter or first non-Table-of-Contents chapter.
- Persistence:
  - Writes `selectedChapter`, `bookmarks`, `favorites`, and `completedLessons` to `localStorage` whenever they change.

### LearningContext
- `LearningContext.jsx` defines the React context for the feature.
- `useLearningContext.js` enforces usage inside `LearningProvider`.

### Custom hooks
- `useLearning.js` exposes context state and derived values.
- It computes `currentChapter` and `readingProgress`.
- Additional Learning feature hooks (`useCourse.js`, `useBookmarks.js`, `useFavorites.js`, `useSearch.js`, `useChapter.js`, `useProgress.js`) are present but empty or not referenced by the active LearningHub route.

### Data flow
- `LearningProvider` loads course data and saved session state.
- `useLearning()` consumes that context and supplies page components with state and update callbacks.
- UI interactions update context state, which persists to `localStorage`.

## Repository Integration

### CourseRepository
- Implementation in `src/features/learning/repository/CourseRepository.js`.
- Loads static course data from `content/course.json`.
- Wraps the JSON data in the `Course` model.
- Exposes asynchronous methods:
  - `loadCourse()`
  - `load()`
  - `getCourse()`
  - `getChapters()`
  - `getChapter(idOrSlug)`
  - `getSection(idOrSlug)`
  - `search(query)`
  - `clearCache()`
- Evidence: import and usage in `LearningProvider.jsx`.

### Additional repositories
- `CourseRepository.old.js` exists as a legacy implementation and is not referenced by the current Learning feature runtime.

### Persistence
- Course data is static and client-side.
- User state is persisted to browser `localStorage` under the key `learning-state`.
- `StorageService` is not used by the Learning feature; persistence is implemented directly in `LearningProvider.jsx`.

## Services

- The active LearningHub runtime does not consume dedicated Learning service implementations beyond the repository.
- Service files present in the feature folder are empty and not currently part of the runtime:
  - `src/features/learning/services/ProgressService.js`
  - `src/features/learning/services/SearchService.js`
  - `src/features/learning/services/FavoriteService.js`
  - `src/features/learning/services/BookmarkService.js`

## Models

- `Course.js` is instantiated by `CourseRepository.js` and used to represent the loaded course.
- `Chapter.js` and `Section.js` are present as model definitions.
- `Lesson.js` and `Module.js` are empty files in the current source.
- Additional model files exist under `src/features/learning/models/` but are not referenced by the active Learning feature runtime.

## User Experience

- Navigation to the Learning feature is available via dashboard modules and dashboard cards linking to `/learning`.
- The Learning page displays:
  - course title and description via shared `PageHeader`
  - a Continue Learning card for the current chapter
  - progress summary with completion percentage
  - sidebar chapter navigation with bookmarks and favorites indicators
  - a toolbar with search input and action buttons
  - chapter content rendered via `LessonRenderer`
  - bookmark and favorites panels on the right side
- The UI supports:
  - selecting chapters
  - bookmarking and favoriting chapters
  - resuming the last selected chapter
  - displaying progress as a percentage and chapter count
- The page does not define a separate Learning layout; it uses the global dashboard layout.

## Dependencies

- Shared UI: `src/components/ui/PageHeader` is used by `LearningHub.jsx`.
- Repositories: `CourseRepository.js` is the Learning feature repository.
- Knowledge runtime: no direct dependency from the current LearningHub runtime.
- AI runtime: no direct dependency from the current Learning feature runtime.
- Other features: routing and navigation are configured in `src/routes/AppRoutes.jsx`, `src/config/modules.js`, and `src/features/dashboard/data/dashboardCards.js`.

## Current Runtime Behavior

- The `/learning` route is served by `LearningHub` inside the global dashboard chrome.
- `LearningProvider` loads static course data and persisted user state.
- `LearningHubContent` reads feature state through `useLearning()`.
- The selected chapter is displayed as the current learning unit.
- Chapter selection, bookmarks, favorites, and completed lessons are maintained in the provider context.
- State changes are persisted to browser `localStorage` without server interaction.
- The learning page is rendered entirely from client-side data and local storage.

## Runtime Limitations

- No backend learning service is consumed by the Learning feature.
- Course content is loaded from a static JSON asset (`content/course.json`).
- Persistence is browser-local only; no centralized server persistence is implemented.
- No authentication or analytics are present in the Learning feature implementation.
- The search toolbar exists, but the current LearningHub page does not render a search results component.
- Several feature files exist in `src/features/learning/` that are empty or not currently referenced by the active LearningHub runtime.

## Implementation Evidence

- `src/routes/AppRoutes.jsx`
- `src/config/modules.js`
- `src/features/dashboard/data/dashboardCards.js`
- `src/features/learning/pages/LearningHub.jsx`
- `src/features/learning/state/LearningProvider.jsx`
- `src/features/learning/state/LearningContext.jsx`
- `src/features/learning/state/useLearningContext.js`
- `src/features/learning/hooks/useLearning.js`
- `src/features/learning/repository/CourseRepository.js`
- `src/features/learning/models/Course.js`
- `src/features/learning/components/LearningSidebar.jsx`
- `src/features/learning/components/LearningToolbar.jsx`
- `src/features/learning/components/LearningContent.jsx`
- `src/features/learning/components/LearningProgress.jsx`
- `src/features/learning/components/ContinueLearningCard.jsx`
- `src/features/learning/components/BookmarkPanel.jsx`
- `src/features/learning/components/FavoritesPanel.jsx`
- `src/features/learning/components/LessonRenderer.jsx`
- `src/features/learning/components/renderers/SectionRenderer.jsx`
- `src/features/learning/repository/CourseRepository.old.js`
- `src/features/learning/components/lesson/LessonViewer.jsx`
- `src/features/learning/components/lesson/LessonNavigation.jsx`
- `src/features/learning/components/sidebar/CourseSidebar.jsx`
- `src/features/learning/components/progress/ProgressPanel.jsx`
- `src/features/learning/components/ChapterCard.jsx`
- `src/features/learning/components/TableOfContents.jsx`
- `src/features/learning/components/SearchResults.jsx`
- `src/features/learning/hooks/useCourse.js`
- `src/features/learning/hooks/useBookmarks.js`
- `src/features/learning/hooks/useFavorites.js`
- `src/features/learning/hooks/useSearch.js`
- `src/features/learning/hooks/useChapter.js`
- `src/features/learning/hooks/useProgress.js`
- `src/features/learning/services/ProgressService.js`
- `src/features/learning/services/SearchService.js`
- `src/features/learning/services/FavoriteService.js`
- `src/features/learning/services/BookmarkService.js`
- `src/features/learning/models/Chapter.js`
- `src/features/learning/models/Section.js`
- `src/features/learning/models/Lesson.js`
- `src/features/learning/models/Module.js`
- `src/features/learning/models/LearningProgress.js`
- `src/features/learning/models/Framework.js`
- `src/features/learning/models/Example.js`
- `src/features/learning/models/BestPractice.js`
- `src/features/learning/models/AIOutput.js`
- `content/course.json`

## Executive Summary

The Learning feature implements a client-side Learning Hub within Mr. Prompt Studio. It is composed of a single page route at `/learning`, a feature provider for state ownership, a Learning hook for context access, a repository that loads static course JSON, and a set of UI components under `src/features/learning/components/`.

State is persisted to browser `localStorage` and the feature runs entirely from client-side data. The current runtime implementation focuses on chapter navigation, progress display, bookmarks, favorites, and content rendering. Several feature files and service definitions exist in the repository but are not currently connected to the active LearningHub runtime.

### Files reviewed
- All files under `src/features/learning/`
- `src/routes/AppRoutes.jsx`
- `src/config/modules.js`
- `src/features/dashboard/data/dashboardCards.js`
- `src/layouts/DashboardLayout.jsx`

### Learning components
- `LearningHub`
- `LearningSidebar`
- `LearningToolbar`
- `LearningContent`
- `LearningProgress`
- `ContinueLearningCard`
- `BookmarkPanel`
- `FavoritesPanel`
- `LessonRenderer`
- `SectionRenderer`
- Additional components present but not part of current page runtime

### Hooks reviewed
- `useLearning.js`
- `useCourse.js`
- `useBookmarks.js`
- `useFavorites.js`
- `useSearch.js`
- `useChapter.js`
- `useProgress.js`

### Repositories reviewed
- `CourseRepository.js`
- `CourseRepository.old.js`

### Services reviewed
- `ProgressService.js`
- `SearchService.js`
- `FavoriteService.js`
- `BookmarkService.js`

### Evidence verification completed
- Verified repository imports and page wiring for active Learning runtime.
- Verified static course data usage from `content/course.json`.
- Verified localStorage persistence in `LearningProvider.jsx`.
- Verified route and navigation configuration for the Learning feature.
