# Prompt Studio Implementation

## Entry point

- Feature route is wired in `src/routes/AppRoutes.jsx`.
- Active path: `/studio`.
- Route element: `PromptStudio` from `src/features/studio/pages/PromptStudio.jsx`.

## Page composition

`src/features/studio/pages/PromptStudio.jsx` renders:
- `PromptStudioProvider` from `src/features/studio/state/PromptStudioProvider.jsx`
- `PageHeader` with title `Prompt Studio`
- `PromptWorkbench` from `src/features/studio/layouts/PromptWorkbench.jsx`

The page is wrapped in a context provider that exposes studio state and actions.

## State and context

`PromptStudioProvider` creates a React context using:
- `PromptStudioContext` in `src/features/studio/state/PromptStudioContext.jsx`
- custom hook `usePromptStudio` in `src/features/studio/hooks/usePromptStudio.js`

The hook manages local component state for:
- `prompt`
- `improvedPrompt`
- `evaluation`
- `history`
- `versions`
- `status`
- `error`
- `metrics`

It exposes actions used by UI components:
- `setPrompt`
- `handleImprove`
- `handleEvaluate`
- `handleConvert`
- `saveCurrentVersion`
- `handleClear`
- `clearError`
- `restoreHistoryItem`
- `deleteHistoryItem`
- `clearHistory`
- `restoreVersion`
- `deleteVersion`
- `saveVersionComment`
- `compareVersions`
- `clearVersions`

### Initialization

On first render, `usePromptStudio` loads persisted values from `PromptRepository`:
- saved prompt text
- prompt history
- prompt versions

This same repository-backed initialization path is used when Prompt Library saves a template prompt and navigates the user to `/studio`.

### Live evaluation

A `useEffect` hook persists the current prompt on change and runs debounced evaluation after 350ms.
- If prompt is empty, it clears persisted prompt and resets evaluation.
- Otherwise, it saves prompt only when the content actually changes and computes evaluation using `PromptEngine.evaluate(prompt)`.

### Unified runtime pipeline

The runtime now follows a shared orchestration path inside `usePromptStudio`:

- prompt changes persist through `PromptRepository`
- live evaluation updates prompt analysis, knowledge context, and framework recommendation
- improve, evaluate, convert, save, restore, and delete actions all pass through shared runtime helpers
- runtime status and errors are normalized before being exposed to the UI
- toast notifications are emitted for successful actions and runtime failures
- history and version persistence are refreshed through repository methods, not component logic

### Runtime status and metrics

`usePromptStudio` exposes a shared runtime contract for the workbench:

- status values such as `Idle`, `Evaluating`, `Improving`, `Converting`, `Saving`, `Completed`, and `Error`
- derived loading flags: `isLoading`, `isEvaluating`, `isImproving`, `isConverting`, `isSaving`
- centralized `error` state with `clearError()`
- runtime metrics including current version, history count, version count, word count, character count, token count, reading time, prompt score, and complexity

## Persistence

`PromptRepository` in `src/features/studio/repository/PromptRepository.js` persists studio data through `StorageService` using:
- `mrpromptstudio.prompt`
- `mrpromptstudio.prompt.history`

`VersionRepository` persists version data through `StorageService` using:
- `mrpromptstudio.prompt.versions`

Supported operations:
- save / load / clear current prompt with write deduplication
- get / add / remove / clear prompt history
- get / add / update / delete / clear prompt versions

Prompt Library reuses `PromptRepository.save(template.prompt)` before navigation so Prompt Studio loads the selected template through its existing initialization logic instead of through a separate state or routing channel.

History storage maintains up to 20 recent prompts.
Versions storage maintains up to 50 saved versions with duplicate prevention for repeated identical saves.

## Workbench layout

`src/features/studio/layouts/PromptWorkbench.jsx` arranges three regions:
- left: `BuilderPanel`
- center: `EditorPanel`
- right: `HistoryPanel` and `AnalysisPanel`

### BuilderPanel

- `src/features/studio/panels/BuilderPanel.jsx`
- contains `PromptBuilder` from `src/features/studio/components/builder/PromptBuilder.jsx`
- generates a structured prompt and passes it to `studio.setPrompt`.
- the panel is exposed through the `Guided Prompt Builder` action in `PromptActions`
- the panel can be collapsed and reopened without leaving the studio runtime

### EditorPanel

- `src/features/studio/panels/EditorPanel.jsx`
- displays current prompt editor and actions
- uses:
  - `EditorStatistics`
  - `PromptEditor`
  - `PromptActions`
  - `PromptOutput`

### AnalysisPanel

- `src/features/studio/panels/AnalysisPanel.jsx`
- renders enterprise analysis only when `studio.evaluation` exists
- otherwise shows a placeholder calling for prompt input
- displayed components:
  - `EnterpriseScoreCard`
  - `PromptHealthIndicator`
  - `ConfidenceMeter`
  - `FrameworkReason`
  - `PromptMetadata`
  - `StrengthsPanel`
  - `WeaknessesPanel`
  - `Recommendations`

### HistoryPanel

- `src/features/studio/components/workbench/HistoryPanel.jsx`
- lists persisted prompt history entries
- supports restore, delete, and clear actions
- wired to `studio.history` and provider callbacks

## Prompt builder

`PromptBuilder` provides a step-by-step prompt construction workflow with fields:
- Goal
- Audience
- Role
- Context
- Task
- Output Format
- Constraints
- Review

The builder generates a complete enterprise prompt using the collected values and writes the result into the existing Prompt Studio editor through `studio.setPrompt`. The generated prompt includes:
- an enterprise prompt-engineer role preamble
- the selected goal, audience, role, context, task, constraints, and output format
- a closing instruction to return only the final prompt

This generated prompt is supplied to the editor via `onGenerate`.

## Prompt actions

`PromptActions` offers buttons for:
- `Guided Prompt Builder`
- `Improve`
- `Evaluate`
- `Convert`
- `Clear`

It also renders runtime status, loading feedback, and dismissible runtime errors.

Behavior in `usePromptStudio`:
- `handleImprove`: calls `PromptEngine.improve`, stores the improved result, updates history, saves a version, persists prompt state, and shows a success toast
- `handleEvaluate`: runs `PromptEngine.evaluate`, updates analysis, saves history and version state, and shows a success toast
- `handleConvert`: runs `PromptEngine.convert(format)`, updates output, saves history and version state, and shows a success toast
- `saveCurrentVersion`: saves the current prompt as a numbered version with an optional comment
- `handleClear`: clears prompt, improved prompt, evaluation, error, status, and persisted prompt

## Prompt output

`PromptOutput` displays `studio.improvedPrompt`, runtime status, or an error-aware placeholder when blank.

## Prompt engine and analysis stack

`src/features/studio/services/PromptEngine.js` is the central analysis engine.

### Evaluate

`PromptEngine.evaluate(prompt)` performs:
- prompt analysis via `PromptAnalyzer.analyze(prompt)`
- knowledge execution via `KnowledgeEngine.execute(prompt)`
- framework recommendation via `FrameworkEngine.recommend(analysis.intent, knowledgeContext)`
- scoring via `PromptScorer.score(analysis)`
- populates `EvaluationResult` with:
  - original prompt
  - analysis
  - framework
  - recommended framework metadata
  - knowledge confidence
  - framework reason
  - related techniques
  - recommended articles derived from repository-backed framework examples
  - score
  - strengths
  - weaknesses
  - recommendations
  - improvements

The knowledge engine executes once per evaluation and reuses the same knowledge analysis result when building recommendation context.

### Improve

`PromptEngine.improve(prompt)` performs:
- `ImprovementService.improve(prompt)` to get an improved prompt from AI
- evaluates the improved prompt
- evaluates original prompt
- compares original and improved using `PromptComparer.compare`
- returns evaluation with comparison details and score delta

### Convert

`PromptEngine.convert(prompt, format)` delegates to `PromptConverter.convert`.

### Compare

`PromptEngine.compare(original, improved)` delegates to `PromptComparer.compare`.

## AI improvement pipeline

`src/features/studio/services/ImprovementService.js` performs prompt improvement by:
- loading saved AI configuration from `StorageService.get("ai-config")`
- defaulting to `defaultConfig` from `src/features/ai/config/defaultConfig`
- using `AIService` from `src/features/ai/services/AIService`
- executing an AI request with `improvePromptTemplate`
- returning the trimmed AI response

This confirms the studio feature leverages the shared AI service layer for prompt improvement.

## Analysis and comparison subservices

The Prompt Studio feature depends on the following analysis components:
- `PromptAnalyzer` (`src/features/studio/services/PromptAnalyzer.js`)
- `KnowledgeEngine` (`src/features/knowledge/engine/KnowledgeEngine.ts`)
- `PromptScorer` (`src/features/studio/services/PromptScorer.js`)
- `PromptComparer` (`src/features/studio/services/PromptComparer.js`)
- `PromptConverter` (`src/features/studio/services/PromptConverter.js`)
- `FrameworkEngine` (`src/features/studio/services/FrameworkEngine.js`)

These services provide structured prompt quality analysis, repository-backed knowledge matching, framework recommendations, scoring, and format conversion.

## Analysis dashboard

`AnalysisPanel` continues to use existing studio UI components and now renders:
- prompt score and health
- knowledge-backed confidence
- recommended framework and reason
- prompt metadata
- prompt recommendations
- related techniques returned from the knowledge engine
- knowledge recommendations derived from matched framework examples

## Summary

Prompt Studio is implemented as a React page at `/studio` with a provider-backed workbench.
It combines:
- interactive prompt building
- text editing
- AI-powered prompt improvement
- analysis dashboard
- persisted prompt history and version tracking

The runtime is driven by `usePromptStudio`, `PromptRepository`, and `PromptEngine`, with UI panels assembled in `PromptWorkbench`.
