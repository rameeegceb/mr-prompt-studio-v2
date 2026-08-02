# Knowledge System

## Purpose

The Knowledge System provides a runtime knowledge repository and search engine for enterprise frameworks and prompt analysis. It is used to initialize the knowledge data set at startup and power prompt improvement workflows via a knowledge-backed context.

## Scope

The Knowledge System covers:
- knowledge repository initialization
- framework loading from course content
- in-memory caching of framework data
- keyword/tag/role/domain/lifecycle extraction and indexing
- search over frameworks
- prompt analysis using knowledge search
- recommendation context generation for prompt improvement
- runtime execution of knowledge-backed improvement requests

The system does not currently include UI components, React providers, or feature-specific contexts under `src/features/knowledge`.

## Runtime Entry

- Startup initialization: `src/main.jsx` imports `{ KnowledgeRepository }` from `src/features/knowledge` and calls `KnowledgeRepository.initialize()`.
- Runtime entry points:
  - `KnowledgeRepository.initialize()` (startup)
  - `KnowledgeEngine.execute(prompt)` via `RequestPipeline` and `RuntimeEngine`
  - `KnowledgeSearchService.search(prompt)` (search backend)
- Exports:
  - `src/features/knowledge/index.ts` exports `KnowledgeRepository` and `KnowledgeSearchService`.
- Providers/Contexts/Hooks:
  - None in `src/features/knowledge`.
  - The feature uses plain service objects and runtime classes.

## Directory Structure

`src/features/knowledge/`
- `analysis/` - prompt analysis adapters and detectors
- `context/` - `ContextBuilder` for building runtime knowledge context
- `engine/` - `KnowledgeEngine` provides analysis and recommendation execution
- `indexing/` - `KnowledgeIndexer` and `SearchIndex` build and manage the search index
- `models/` - TypeScript interfaces for knowledge domain models
- `pipeline/` - request execution pipeline for knowledge-driven operations
- `ranking/` - ranking and confidence calculators for search results
- `recommendation/` - recommendation engine and recommendation context models
- `repository/` - `KnowledgeRepository` for startup initialization and framework access
- `runtime/` - `RuntimeEngine` for executing feature requests
- `search/` - search service and search engine implementation
- `services/` - knowledge loader and cache services
- `ai/` - knowledge AI interfaces and orchestrator stub (not active in runtime)
- `types/` - empty directory present but no implementation files
- `utils/` - no files are currently present under `src/features/knowledge/utils` in runtime evidence

## Feature Architecture

### Knowledge Engine

`src/features/knowledge/engine/KnowledgeEngine.ts`
- Coordinates knowledge execution.
- Calls `KnowledgeRepository.initialize()` during its own `initialize()` method.
- Executes prompt analysis and recommendation generation.
- Builds a runtime knowledge context via `ContextBuilder`.

### Knowledge Repository

`src/features/knowledge/repository/KnowledgeRepository.ts`
- Initializes knowledge using `KnowledgeLoader.loadFrameworks()`.
- Caches frameworks in `KnowledgeCache`.
- Builds search indexes via `KnowledgeIndexer.build()`.
- Exposes `getFrameworks()`, `getFramework(id)`, `hasFramework(id)`, `count()`, and `reload()`.

### Knowledge Search

`src/features/knowledge/search/KnowledgeSearchService.ts`
- Delegates search requests to `SearchEngine.search(prompt)`.
- Also exposes `bestMatch(prompt)` to return the top result.

`src/features/knowledge/search/SearchEngine.ts`
- Converts a query into normalized terms.
- Scores frameworks according to term matches across title, description, content, keywords, tags, roles, domains, and lifecycle.
- Returns sorted results with score and confidence.

### Knowledge Analyzer

`src/features/knowledge/analysis/KnowledgeAnalyzer.ts`
- Uses `KnowledgeSearchService.search(prompt)` to obtain matching frameworks.
- Builds a `PromptAnalysis` object containing:
  - original prompt
  - detected intent
  - calculated complexity
  - extracted keywords
  - framework matches
  - recommended framework
  - related techniques and examples (currently empty)
  - confidence value

### Context Builder

`src/features/knowledge/context/ContextBuilder.ts`
- Builds the final runtime context for knowledge execution.
- Produces:
  - `userPrompt`
  - `analysis`
  - `framework`
  - `techniques`
  - `examples`
  - `systemPrompt`
- `systemPrompt` includes the recommended framework title and content when a recommendation exists.

### Recommendation Engine

`src/features/knowledge/recommendation/RecommendationEngine.ts`
- Uses `KnowledgeAnalyzer.analyze(prompt)`.
- Returns recommendation context with framework, techniques, examples, and system instructions.
- Builds instructions by appending the recommended framework title and content.

### Models

`src/features/knowledge/models/Framework.ts`
- Defines framework shape including ids, title, description, content, chapter/section metadata, keywords, tags, roles, domains, lifecycle, difficulty, techniques, examples, bestPractices, relatedFrameworks.

`src/features/knowledge/models/PromptAnalysis.ts`
- Defines prompt analysis output fields.

`src/features/knowledge/models/SearchResult.ts`
- Generic search result interface.

Other model interfaces:
- `FrameworkMatch`, `Technique`, `Example`, `AIOutput`, `KnowledgeContext`, `KnowledgeNode`, `BestPractice`.

### Indexing

`src/features/knowledge/indexing/KnowledgeIndexer.ts`
- Clears existing index and re-adds frameworks.
- Extracts keywords from title, description, and content.
- Extracts tags from title terms.
- Extracts roles, domains, and lifecycle values by searching text content.
- Sets `relatedFrameworks` to an empty array.
- Adds frameworks to `SearchIndex`.

`src/features/knowledge/indexing/SearchIndex.ts`
- Stores frameworks in an in-memory map by id.
- Supports add/addMany/get/getAll/clear/size.

### Utilities

`src/features/knowledge/ranking/ConfidenceCalculator.ts`
- Maps raw search score to confidence percentages.

`src/features/knowledge/ranking/FrameworkRanker.ts`
- Ranks framework results by score and limits top 5.

`src/features/knowledge/pipeline/RequestClassifier.ts`
- Classifies prompt text into feature types, but is not used in the active runtime path reviewed.

`src/features/knowledge/pipeline/PipelineRequest.ts` and `PipelineResult.ts`
- Define request and result shapes for pipeline execution.

## Runtime Lifecycle

1. Application startup loads `src/main.jsx`.
2. `KnowledgeRepository.initialize()` is called before React render.
3. `KnowledgeRepository.initialize()` loads frameworks from `course.json` via `KnowledgeLoader`.
4. Frameworks are cached in `KnowledgeCache`.
5. `KnowledgeIndexer.build()` extracts metadata and populates `SearchIndex`.
6. The app renders and `AIProvider` wraps the React tree.
7. Knowledge runtime is consumed later by improvement workflows through `RuntimeEngine.execute(...)`.

## Runtime Flow

- Knowledge is loaded and indexed at startup from `course.json`.
- `KnowledgeRepository` serves in-memory framework data.
- `KnowledgeSearchService.search()` executes query scoring with `SearchEngine`.
- `KnowledgeAnalyzer.analyze()` generates prompt analysis and selects a recommended framework.
- `RecommendationEngine.recommend()` uses the analyzer output to build recommendation context.
- `KnowledgeEngine.execute(prompt)` composes the final knowledge context with `ContextBuilder`.
- `RuntimeEngine.execute(request)` dispatches feature requests using `RequestPipeline`.
- `RequestPipeline.executeImprove(request)` executes knowledge analysis and returns a mock AI improvement response template.

## Component Inventory

- `src/features/knowledge/repository/KnowledgeRepository.ts`
  - Purpose: startup initialization, framework access, and reload.
  - Runtime Status: active via `main.jsx`.

- `src/features/knowledge/services/KnowledgeLoader.ts`
  - Purpose: load frameworks from `content/course.json`.
  - Runtime Status: active in `KnowledgeRepository.initialize()`.

- `src/features/knowledge/services/KnowledgeCache.ts`
  - Purpose: in-memory framework cache.
  - Runtime Status: active in repository and indexer.

- `src/features/knowledge/indexing/KnowledgeIndexer.ts`
  - Purpose: extract metadata and index frameworks.
  - Runtime Status: active in repository initialization.

- `src/features/knowledge/indexing/SearchIndex.ts`
  - Purpose: store indexed frameworks.
  - Runtime Status: active via `KnowledgeIndexer.build()`.

- `src/features/knowledge/search/SearchEngine.ts`
  - Purpose: search and score frameworks.
  - Runtime Status: active when `KnowledgeSearchService.search()` is called.

- `src/features/knowledge/search/KnowledgeSearchService.ts`
  - Purpose: search facade.
  - Runtime Status: active in analyzer.

- `src/features/knowledge/analysis/KnowledgeAnalyzer.ts`
  - Purpose: prompt analysis using search results.
  - Runtime Status: active in engine and recommendation.

- `src/features/knowledge/recommendation/RecommendationEngine.ts`
  - Purpose: build recommendation context.
  - Runtime Status: active in engine execution.

- `src/features/knowledge/context/ContextBuilder.ts`
  - Purpose: build final runtime context and system prompt.
  - Runtime Status: active in engine execution.

- `src/features/knowledge/engine/KnowledgeEngine.ts`
  - Purpose: orchestrate knowledge initialization and execution.
  - Runtime Status: active through runtime pipeline.

- `src/features/knowledge/runtime/RuntimeEngine.ts`
  - Purpose: execute pipeline requests.
  - Runtime Status: active via improvement service.

- `src/features/knowledge/pipeline/RequestPipeline.ts`
  - Purpose: route feature requests and return knowledge-backed improvement responses.
  - Runtime Status: active in runtime request execution.

- `src/features/knowledge/ai/AIOrchestrator.ts`
  - Purpose: stubbed AI orchestrator.
  - Runtime Status: present but not invoked in the current runtime path.

- `src/features/knowledge/models/*`
  - Purpose: type interfaces for knowledge data.
  - Runtime Status: used across knowledge modules.

## State Management

- No React providers or hooks exist under `src/features/knowledge`.
- State is managed through plain service singletons and in-memory caches.
- `KnowledgeRepository` owns initialization state with a `initialized` flag.
- `KnowledgeCache` owns framework storage state.

## Repository Integration

- `KnowledgeRepository` is the central repository abstraction.
- It loads knowledge data from `KnowledgeLoader`.
- It stores frameworks in `KnowledgeCache` and indexes them via `KnowledgeIndexer`.
- It exposes framework retrieval methods and `reload()` for refresh.
- The repository is initialized once at application startup.

## Engine Analysis

- `KnowledgeEngine.initialize()` calls `KnowledgeRepository.initialize()`.
- `KnowledgeEngine.execute(prompt)` performs:
  - `KnowledgeAnalyzer.analyze(prompt)`
  - `RecommendationEngine.recommend(prompt)`
  - `ContextBuilder.build(prompt, analysis, recommendation)`

- Search implementation:
  - `SearchEngine.search(query)` normalizes query terms and scores frameworks.
  - Scoring weights: title 40, description 25, content 10, keywords 15, tags 20, roles 25, domains 15, lifecycle 10.
  - Results are sorted by raw score.

- Analyzer:
  - `KnowledgeAnalyzer` uses `KnowledgeSearchService.search`.
  - It detects intent, complexity, and keywords from the prompt.
  - It selects the best matching framework as the recommendation.

- Recommendation logic:
  - Uses the analyzer result to return a recommended framework and build system instructions.
  - Current `relatedTechniques` and `relatedExamples` arrays remain empty.

- Context building:
  - `ContextBuilder` creates a system prompt when a framework recommendation exists.
  - The system prompt includes the recommended framework title and content.

## Models

- `Framework` defines the runtime framework object shape.
- `PromptAnalysis` defines analysis output including framework matches and confidence.
- `SearchResult<T>` defines generic search result metadata.
- `KnowledgeContext` defines final context output fields for runtime execution.
- `FrameworkMatch`, `Technique`, `Example`, `AIOutput`, `BestPractice` support knowledge model composition.

## Dependencies

- `main.jsx` depends on `KnowledgeRepository` for startup initialization.
- `PromptImprovementService` depends on `RuntimeEngine` and therefore the Knowledge pipeline.
- No direct `src/features/knowledge` React UI dependencies exist.
- Shared infrastructure: uses `content/course.json` as the knowledge source.
- AI integration: knowledge runtime returns a mock improvement response template in `RequestPipeline.executeImprove`.
- Learning and Prompt Studio are not directly integrated with `src/features/knowledge` in the reviewed implementation.

## Runtime Behavior

- The application initializes the knowledge repository on startup.
- Frameworks are loaded from course JSON, cached, indexed, and made available for search.
- Knowledge search works by scoring text query terms against framework metadata.
- Prompt improvement requests are executed through `RuntimeEngine`, which delegates to `RequestPipeline`.
- Improvement results are mocked with a generated prompt and include knowledge-derived framework and confidence values.

## Runtime Limitations

- `src/features/knowledge` contains no active React providers, contexts, or hooks.
- `KnowledgeSearchService` and the knowledge engine are purely service-layer implementations.
- AI execution is stubbed in `RequestPipeline.executeImprove` and does not call a real provider.
- Several knowledge submodules exist but are not active in the current runtime path, including `AIOrchestrator`, `FrameworkSearchService`, and analysis files with no implementation.
- `relatedTechniques` and `relatedExamples` remain empty in current analysis output.

## Implementation Evidence

Reviewed files:
- `src/main.jsx`
- `src/App.jsx`
- `src/routes/AppRoutes.jsx`
- `src/features/knowledge/index.ts`
- `src/features/knowledge/repository/KnowledgeRepository.ts`
- `src/features/knowledge/services/KnowledgeLoader.ts`
- `src/features/knowledge/services/KnowledgeCache.ts`
- `src/features/knowledge/indexing/KnowledgeIndexer.ts`
- `src/features/knowledge/indexing/SearchIndex.ts`
- `src/features/knowledge/search/KnowledgeSearchService.ts`
- `src/features/knowledge/search/SearchEngine.ts`
- `src/features/knowledge/ranking/ConfidenceCalculator.ts`
- `src/features/knowledge/analysis/KnowledgeAnalyzer.ts`
- `src/features/knowledge/context/ContextBuilder.ts`
- `src/features/knowledge/recommendation/RecommendationEngine.ts`
- `src/features/knowledge/engine/KnowledgeEngine.ts`
- `src/features/knowledge/runtime/RuntimeEngine.ts`
- `src/features/knowledge/pipeline/RequestPipeline.ts`
- `src/features/knowledge/pipeline/PipelineRequest.ts`
- `src/features/knowledge/pipeline/PipelineResult.ts`
- `src/features/knowledge/pipeline/RequestClassifier.ts`
- `src/features/knowledge/models/Framework.ts`
- `src/features/knowledge/models/PromptAnalysis.ts`
- `src/features/knowledge/models/SearchResult.ts`
- `src/features/knowledge/models/FrameworkMatch.ts`
- `src/features/knowledge/models/KnowledgeContext.ts`
- `src/features/knowledge/models/KnowledgeNode.ts`
- `src/features/knowledge/models/Example.ts`
- `src/features/knowledge/models/Technique.ts`
- `src/features/knowledge/ai/AIProvider.ts`
- `src/features/knowledge/ai/AIRequest.ts`
- `src/features/knowledge/ai/AIResponse.ts`
- `src/features/knowledge/ai/AIOrchestrator.ts`
- `src/features/improvement/services/PromptImprovementService.ts`
- `src/features/improvement/hooks/usePromptImprovement.ts`
- `src/features/improvement/pages/ImprovePromptPage.tsx`

## Executive Summary

The Knowledge System is a backend knowledge service layer that initializes framework data from `content/course.json` at application startup. It does not expose its own React UI but supports prompt improvement through a runtime pipeline.

Architecture is centered on `KnowledgeRepository`, `KnowledgeCache`, `KnowledgeIndexer`, `SearchEngine`, `KnowledgeAnalyzer`, `RecommendationEngine`, and `ContextBuilder`. Search rankings and confidence are derived from term matching across framework metadata.

Runtime lifecycle begins in `main.jsx` with repository initialization and continues through knowledge-enhanced prompt improvement requests executed by `RuntimeEngine`.

The current implementation is limited by stubbed AI response behavior, empty related technique/example outputs, and absence of React providers or direct feature-level integration beyond the improvement service.

Files reviewed, components, services, repositories, models, and evidence were verified against the current repository implementation.
