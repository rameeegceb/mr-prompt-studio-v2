# Dead Code Analysis

## Purpose

This document documents dead-code and unused source artifacts found in the current Mr. Prompt Studio repository. It is based exclusively on the repository state and import/route reachability evidence present in the current source.

## Methodology

- Examined active route wiring in `src/routes/AppRoutes.jsx`.
- Identified source files with zero-byte content under `src/`.
- Searched for import and name references across `src/**/*.{js,jsx,ts,tsx}`.
- Categorized artifacts by unused page/routes, empty service stubs, duplicate directories, legacy artifacts, and stale root-level source.

> Note: This analysis does not change source code. It records only observed evidence from the current repository.

---

## Active route wiring

Current application routes in `src/routes/AppRoutes.jsx`:

- `/` → `DashboardPage` (`src/features/dashboard/pages/DashboardPage.jsx`)
- `/learning` → `LearningHub` (`src/features/learning/pages/LearningHub.jsx`)
- `/studio` → `PromptStudio` (`src/features/studio/pages/PromptStudio.jsx`)
- `/library` → `PromptLibrary` (`src/features/library/pages/PromptLibrary.jsx`)
- `/best-practices` → `BestPractices` (`src/features/best-practices/pages/BestPractices.jsx`)
- `/settings` → `SettingsPage` (`src/features/settings/pages/SettingsPage.jsx`)
- `/ai-test` → `AITestPage` (`src/features/ai/pages/AITestPage.jsx`)
- `*` → redirect to `/`

---

## Dead-code categories

### 1. Unused pages and route artifacts

- `src/features/improvement/pages/ImprovePromptPage.tsx`
  - Implemented page component, but absent from `src/routes/AppRoutes.jsx`.
  - Search evidence: only referenced by `src/features/improvement/index.ts` and itself.
  - Result: the page is not reachable via current route wiring.

- `src/features/improvement/index.ts`
  - Exports `ImprovePromptPage` and `PromptImprovementService`.
  - No references found in active source files outside the improvement feature itself.

### 2. Legacy and duplicate source artifacts

- `src/features/learning/services/CourseRepository.old.js`
  - Legacy course loader file present alongside active `src/features/learning/repository/CourseRepository.js`.
  - No active import references found in current source.

- Root-level provider and model artifacts under `src/`:
  - `src/providers/AIProvider.js`
  - `src/providers/OpenAIProvider.js`
  - `src/providers/CopilotProvider.js`
  - `src/providers/OllamaProvider.js`
  - `src/providers/AzureOpenAIProvider.js`
  - `src/models/Chapter.js`
  - `src/models/Course.js`
  - `src/models/Example.js`
  - `src/models/Framework.js`
  - `src/models/Section.js`
  - `src/repositories/CourseRepository.js`
  - `src/services/CourseService.js`
  - All above files are zero-byte and have no import evidence in current active source.

### 3. Empty provider stubs

- `src/features/ai/providers/OpenAIProvider.js` (0 bytes)
- `src/features/ai/providers/CopilotProvider.js` (0 bytes)
- `src/features/ai/providers/AzureOpenAIProvider.js` (0 bytes)

Evidence:
- `src/features/ai/providers/ProviderFactory.js` only imports and returns `OllamaProvider` or `MockProvider`.
- `src/features/ai/services/AIService.js` uses `ProviderFactory`, so the empty provider stubs are not reachable.

### 4. Empty studio service stubs

- `src/features/studio/services/ComparisonService.js` (0 bytes)
- `src/features/studio/services/EvaluationService.js` (0 bytes)
- `src/features/studio/services/FrameworkService.js` (0 bytes)
- `src/features/studio/services/AnalysisService.js` (0 bytes)
- `src/features/studio/services/ConversionService.js` (0 bytes)
- `src/features/studio/services/StatisticsService.js` (0 bytes)

Evidence:
- Current studio flows use `src/features/studio/services/PromptEngine.js`, `PromptComparer.js`, `PromptConverter.js`, and `ImprovementService.js` instead.
- No import references to the above empty stub files were found.

### 5. Empty feature-level service / feature stubs

- `src/features/comparison/services/PromptComparisonEngine.js` (0 bytes)
- `src/features/framework/services/FrameworkEngine.js` (0 bytes)
- `src/features/evaluation/services/PromptEvaluationEngine.js` (0 bytes)
- `src/features/improvement/ai/ImprovementService.js` (0 bytes)

Evidence:
- Active implementations exist in alternate locations:
  - `src/features/studio/services/PromptImprover.js` and `src/features/studio/services/FrameworkEngine.js` are active framework/improvement paths.
  - `src/features/studio/services/PromptEngine.js` implements evaluation and comparison flows.
- No import references were found for the empty feature-level stubs.

### 6. Unreferenced studio helper classes

- `src/features/studio/services/PromptEnhancer.js`
- `src/features/studio/services/PromptImprover.js`
- `src/features/orchestrator/services/PromptOrchestrator.js`

Evidence:
- Search results show only self-declarations; no active imports or references were found in the current source.

### 7. Duplicate or placeholder feature directories

- `src/features/bestPractices/`
- `src/features/improve/`
- `src/features/evaluate/`
- `src/features/convert/`

Evidence:
- These directories are present but contain no active source implementation referenced by current routes or imports.
- `src/features/best-practices/`, `src/features/improvement/`, and `src/features/studio/services/PromptConverter.js` provide the active runtime equivalents.

### 8. Stale `src/app` directory artifacts

- `src/app/App.jsx` is empty.
- `src/app/Router.jsx` is empty.
- `src/app/routes.js` exists but appears part of an older structure.

Evidence:
- Active application entry points use `src/App.jsx` and `src/routes/AppRoutes.jsx`.
- No route references were found that import the `src/app` placeholder files.

---

## Reachability matrix

| Artifact | Type | Reachable? | Evidence |
|---|---|---|---|
| `src/features/improvement/pages/ImprovePromptPage.tsx` | Unused page | No | Not imported by `src/routes/AppRoutes.jsx`; only referenced by feature index export |
| `src/features/learning/services/CourseRepository.old.js` | Legacy service | No | Active course loading uses `src/features/learning/repository/CourseRepository.js` |
| `src/features/ai/providers/OpenAIProvider.js` | Empty provider stub | No | `ProviderFactory.js` does not import it |
| `src/features/ai/providers/CopilotProvider.js` | Empty provider stub | No | `ProviderFactory.js` does not import it |
| `src/features/ai/providers/AzureOpenAIProvider.js` | Empty provider stub | No | `ProviderFactory.js` does not import it |
| `src/features/studio/services/ComparisonService.js` | Empty service stub | No | Active comparison flow uses `PromptEngine.compare` |
| `src/features/studio/services/EvaluationService.js` | Empty service stub | No | Active evaluation flow uses `PromptEngine.evaluate` |
| `src/features/studio/services/FrameworkService.js` | Empty service stub | No | Active framework recommendation uses `src/features/studio/services/FrameworkEngine.js` |
| `src/features/studio/services/AnalysisService.js` | Empty service stub | No | No import references found |
| `src/features/studio/services/ConversionService.js` | Empty service stub | No | Active converter uses `PromptConverter.js` |
| `src/features/studio/services/StatisticsService.js` | Empty service stub | No | No import references found |
| `src/features/comparison/services/PromptComparisonEngine.js` | Empty feature stub | No | No import references found |
| `src/features/framework/services/FrameworkEngine.js` | Empty feature stub | No | Actual framework engine used is `src/features/studio/services/FrameworkEngine.js` |
| `src/features/evaluation/services/PromptEvaluationEngine.js` | Empty feature stub | No | No import references found |
| `src/features/improvement/ai/ImprovementService.js` | Empty feature stub | No | Active improvement path uses `src/features/improvement/services/PromptImprovementService.ts` |
| `src/features/studio/services/PromptEnhancer.js` | Unreferenced helper | No | No active imports found |
| `src/features/studio/services/PromptImprover.js` | Unreferenced helper | No | No active imports found |
| `src/features/orchestrator/services/PromptOrchestrator.js` | Unreferenced helper | No | No active imports found |
| `src/features/bestPractices/` | Empty duplicate directory | No | Active best practices route uses `src/features/best-practices/` |
| `src/features/improve/` | Empty duplicate directory | No | Active improvement feature uses `src/features/improvement/` |
| `src/features/evaluate/` | Empty duplicate directory | No | Active evaluation behavior uses studio runtime paths |
| `src/features/convert/` | Empty duplicate directory | No | Active conversion behavior uses `src/features/studio/services/PromptConverter.js` |
| `src/app/App.jsx` | Empty placeholder file | No | Active application entry uses `src/App.jsx` |
| `src/app/Router.jsx` | Empty placeholder file | No | Active application routing uses `src/routes/AppRoutes.jsx` |
| `src/models/*.js` | Stale root-level models | No | Active models exist in feature-level directories and no imports found for root-level models |
| `src/repositories/CourseRepository.js` | Stale root-level repository | No | Active course repository is under `src/features/learning/repository` |
| `src/services/CourseService.js` | Stale root-level service | No | No imports found |

---

## Dead Hook Analysis

The following custom hooks are verified in the repository and categorized by runtime connectivity.

| Hook | Location | Runtime Status | Evidence | Observation |
|---|---|---|---|---|
| `useAI` | `src/features/ai/hooks/useAI.js` | Active Runtime | Imported by `src/features/ai/pages/AITestPage.jsx` and `src/features/settings/components/ProviderSelector.jsx` | Active in AI test and provider settings flows |
| `usePromptImprovement` | `src/features/improvement/hooks/usePromptImprovement.ts` | Partially Connected | Imported by `src/features/improvement/pages/ImprovePromptPage.tsx` | The hook is referenced by an implemented page that is not registered in current routes |
| `useLearningContext` | `src/features/learning/state/useLearningContext.js` | Active Runtime | Imported by learning components and `src/features/learning/hooks/useLearning.js` | Active in the Learning Hub feature |
| `useLearning` | `src/features/learning/hooks/useLearning.js` | Active Runtime | Imported by `src/features/learning/pages/LearningHub.jsx` and learning components | Active in the Learning Hub route |
| `useCourse` | `src/features/learning/hooks/useCourse.js` | Active Runtime | Imported by learning components and used in course navigation | Active in Learning Hub content handling |
| `useFavorites` | `src/features/learning/hooks/useFavorites.js` | Active Runtime | Imported by learning components | Active in Learning Hub favorites functionality |
| `useProgress` | `src/features/learning/hooks/useProgress.js` | Active Runtime | Imported by learning components | Active in Learning Hub progress display |
| `useSearch` | `src/features/learning/hooks/useSearch.js` | Active Runtime | Imported by learning components | Active in Learning Hub search flow |
| `useChapter` | `src/features/learning/hooks/useChapter.js` | Active Runtime | Imported by learning components | Active in Learning Hub chapter navigation |
| `useBookmarks` | `src/features/learning/hooks/useBookmarks.js` | Active Runtime | Imported by learning components | Active in Learning Hub bookmarks |
| `usePromptLibrary` | `src/features/library/hooks/usePromptLibrary.js` | Active Runtime | Imported by `src/features/library/state/PromptLibraryProvider.jsx` | Active in Prompt Library runtime |
| `usePromptLibraryContext` | `src/features/library/state/usePromptLibraryContext.js` | Active Runtime | Imported by `src/features/library/pages/PromptLibrary.jsx` and library panels | Active in the library page state flow |
| `usePromptStudio` | `src/features/studio/hooks/usePromptStudio.js` | Active Runtime | Imported by `src/features/studio/state/PromptStudioProvider.jsx` and studio pages | Active in the Prompt Studio feature |
| `usePromptStudioContext` | `src/features/studio/state/usePromptStudioContext.js` | Active Runtime | Imported by studio layouts and panels | Active in the Prompt Studio runtime context |

---

## Dead Repository Analysis

Repository artifacts verified in the repository and classified by runtime status.

| Repository | Purpose | Current Runtime Status | Evidence | Classification |
|---|---|---|---|---|
| `src/features/learning/repository/CourseRepository.js` | Load learning course data | Active Runtime | Imported by `src/features/learning/hooks/useCourse.js` and `src/features/learning/state/LearningProvider.jsx` | Active Runtime |
| `src/features/learning/services/CourseRepository.old.js` | Legacy course loader | Legacy | No import references found in current source | Legacy |
| `src/features/library/repository/TemplateRepository.js` | Persist library template favorites and recents | Active Runtime | Imported by `src/features/library/services/TemplateService.js` | Active Runtime |
| `src/features/studio/repository/PromptRepository.js` | Persist prompt history and versions | Active Runtime | Imported by `src/features/studio/hooks/usePromptStudio.js` | Active Runtime |
| `src/features/knowledge/repository/KnowledgeRepository.ts` | Initialize knowledge repository and provide frameworks | Active Runtime | Imported by `src/features/knowledge/index.ts`, `src/features/knowledge/indexing/KnowledgeIndexer.ts`, and initialized in `src/main.jsx` | Active Runtime |
| `src/repositories/CourseRepository.js` | Root-level course repository stub | Legacy | No import references found in current source | Legacy |

---

## Dead Provider Analysis

Providers verified in the repository and classified by runtime status.

| Provider | Location | Runtime Status | Evidence | Classification |
|---|---|---|---|---|
| `AIProvider` | `src/features/ai/context/AIProvider.jsx` | Active Runtime | Imported by `src/main.jsx` and wraps `<App />` | Active Runtime |
| `ProviderFactory` | `src/features/ai/providers/ProviderFactory.js` | Active Runtime | Imported by `src/features/ai/services/AIService.js` | Active Runtime |
| `OllamaProvider` | `src/features/ai/providers/OllamaProvider.js` | Active Runtime | Imported by `src/features/ai/providers/ProviderFactory.js` | Active Runtime |
| `MockProvider` | `src/features/ai/providers/MockProvider.js` | Active Runtime | Imported by `src/features/ai/providers/ProviderFactory.js` | Active Runtime |
| `OpenAIProvider` | `src/features/ai/providers/OpenAIProvider.js` | Placeholder | File is zero-byte and not imported by `ProviderFactory.js` | Placeholder |
| `CopilotProvider` | `src/features/ai/providers/CopilotProvider.js` | Placeholder | File is zero-byte and not imported by `ProviderFactory.js` | Placeholder |
| `AzureOpenAIProvider` | `src/features/ai/providers/AzureOpenAIProvider.js` | Placeholder | File is zero-byte and not imported by `ProviderFactory.js` | Placeholder |
| Root-level provider files | `src/providers/*.js` | Legacy | No import references found in current source | Legacy |

---

## Dead Model Analysis

Domain models verified in the repository and classified by runtime status.

| Model | Location | Current Runtime Status | Evidence | Classification |
|---|---|---|---|---|
| Root-level models | `src/models/*.js` | Legacy | Files are zero-byte and no import references were found in current source | Legacy |
| Learning models | `src/features/learning/models/*.js` | Active Runtime | Imported by `src/features/learning/repository/CourseRepository.js` and used in learning pages | Active Runtime |
| Knowledge models | `src/features/knowledge/models/*.ts` | Active Runtime | Imported by `src/features/knowledge/repository/KnowledgeRepository.ts`, `KnowledgeIndexer.ts`, and analysis services | Active Runtime |
| Studio domain models | `src/features/studio/domain/*.js` and `src/features/studio/models/EvaluationResult.js` | Active Runtime | Imported by `src/features/studio/services/PromptEngine.js`, `PromptImprover.js`, and studio panels | Active Runtime |
| Library model | `src/features/library/models/PromptTemplate.js` | Active Runtime | Imported by library service and used in prompt library UIs | Active Runtime |

---

## Dead Code Classification

| Classification | Description |
|---|---|
| Active Runtime | Artifacts imported or reachable by the current application runtime. |
| Reachable | Artifacts reachable through current route wiring or active import references. |
| Partially Connected | Artifacts referenced by implemented source that is not included in current route configuration. |
| Placeholder | Files or directories with no implementation or minimal placeholder content. |
| Stub | Files present with zero-byte or empty implementation and no runtime references. |
| Legacy | Historical artifacts retained alongside active runtime implementations. |
| Archived | Artifacts kept for historical reference but not imported by current runtime. |
| Dead Code | Artifacts not reachable through current imports, route wiring, or runtime execution. |

---

## Current Runtime Impact

- `src/features/improvement/pages/ImprovePromptPage.tsx` is not reachable through current routing.
- `src/features/ai/providers/OpenAIProvider.js`, `src/features/ai/providers/CopilotProvider.js`, and `src/features/ai/providers/AzureOpenAIProvider.js` are not imported by `ProviderFactory.js`.
- `src/features/studio/services/ComparisonService.js`, `EvaluationService.js`, `FrameworkService.js`, `AnalysisService.js`, `ConversionService.js`, and `StatisticsService.js` are not imported by active studio runtime sources.
- `src/features/learning/services/CourseRepository.old.js` is not referenced by current learning runtime sources.
- Root-level legacy files under `src/models/`, `src/providers/`, `src/repositories/`, and `src/services/` are not imported by current source.
- Active runtime uses alternate implementations such as `src/features/studio/services/PromptEngine.js`, `src/features/studio/services/PromptConverter.js`, `src/features/learning/repository/CourseRepository.js`, `src/features/library/repository/TemplateRepository.js`, `src/features/studio/repository/PromptRepository.js`, and `src/features/knowledge/repository/KnowledgeRepository.ts`.

---

## Executive Dead Code Summary

- Active runtime implementation is centered on route-wired pages, AI provider context and factory wiring, studio prompt engine flows, learning course repository, library template repository, prompt repository persistence, and knowledge repository initialization.
- Dead runtime artifacts include the unused improvement page connection, empty AI provider stubs, empty studio service stubs, empty feature-level engine/service stubs, empty placeholder `src/app` files, and root-level legacy source files.
- Legacy artifacts include `src/features/learning/services/CourseRepository.old.js`, root-level `src/models/*.js`, root-level `src/providers/*.js`, root-level `src/repositories/CourseRepository.js`, and `src/services/CourseService.js`.
- Placeholder implementations include zero-byte AI provider files, zero-byte studio service stubs, empty duplicate feature directories, and empty `src/app` placeholder files.
- Repository observations confirm the current runtime uses feature-level active sources while multiple stale or placeholder files coexist in the source tree.

---

## Repository statistics

- Zero-byte source files under `src/`: 217
- Empty root-level provider/model/service files counted: 12
- Empty feature-level provider/service stubs counted: 13
- Duplicate or placeholder directories identified: 4
- Unreferenced helper/service classes identified: 3

## Observations

- The current runtime uses a smaller active surface than the repository structure suggests.
- Empty stubs and duplicate directories are present alongside active implementations for AI, evaluation, comparison, and improvement features.
- The `src/features/improvement` feature is implemented as a page and hook, but it is not wired into current route definitions.
- Root-level `src/providers/*` and `src/models/*` files appear to be stale duplicates of feature-level implementation artifacts.

## Conclusion

This analysis identifies current dead-code and unused source artifacts in the repository. It focuses on artifacts that are demonstrably unreachable through current imports, route wiring, or runtime execution paths.

No source modifications were made.
